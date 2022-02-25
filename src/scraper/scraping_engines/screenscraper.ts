import {
  devid,
  devpassword,
  softname,
} from "../../../configs/secret/screenscraper_dev_credentials";
import { Assets } from "../../interfacesAndStructures/Assets";
import {
  GameSystem,
  GameSystems,
} from "../../interfacesAndStructures/GameSystems";
import { getObjectFromApi } from "../../io/apiRequest";
import { ScrapeFunction } from "./ScrapeFunction";

/**
 * scrapes a single rom from screenscraper.fr
 * @param romName name to be searched online
 * @param romCRC Screenscraper wont use crc, but some other api could use it
 * @param gamesystem To distinguish the system of the rom, necesary in screenscraper, since it wont get the system only by the extension
 * @param language, language of the descriptions
 * @param customRegion For assets of other regions (like jp for an us game). if  undefined, it will get the region from the api and store in the field "gameAssets.deducedGameSystem"
 * @returns the asset of the game or {}
 */
const scrape: ScrapeFunction = async (
  romName: string,
  romCRC?: string | undefined,
  gamesystem?: GameSystem | undefined,
  language: string = "en",
  customRegion?: string | undefined
) => {
  let gameSystemIDParam = "";
  if (gamesystem) {
    gameSystemIDParam = "&systemeid=" + gamesystem.screenscraperID.toString();
  }

  const sourceURL = `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom${gameSystemIDParam}&romnom=${romName}`;
  const responseObject = await getObjectFromApi(encodeURI(sourceURL));
  //@ts-ignore
  if (!responseObject.response) return {};

  let gameAssets: Assets = {};

  gameAssets.gameName = getNameFromResponse(responseObject);

  gameAssets.gameDescription = getDescriptionFromResponse(
    responseObject,
    language
  );

  const snapObject = getMediaObjectFromResponse(
    responseObject,
    "ss",
    customRegion
  );
  gameAssets.snapURL = snapObject?.url;
  gameAssets.snapCRC = snapObject?.crc;

  const titleObject = getMediaObjectFromResponse(
    responseObject,
    "sstitle",
    customRegion
  );
  gameAssets.titleURL = titleObject?.url;
  gameAssets.titleCRC = titleObject?.crc;

  const boxartObject = getMediaObjectFromResponse(
    responseObject,
    "box-2D",
    customRegion
  );
  gameAssets.boxartURL = boxartObject?.url;
  gameAssets.boxartCRC = boxartObject?.crc;

  const bezelObject = getMediaObjectFromResponse(
    responseObject,
    "bezel-16-9",
    customRegion
  );
  gameAssets.bezelURL = bezelObject?.url;
  gameAssets.bezelCRC = bezelObject?.crc;

  const systemID = getIDFromResponse(responseObject);
  gameAssets.deducedGameSystem = gameSystemFromScreenScraperID(systemID);
  return gameAssets;
};

const getNameFromResponse = (responseObject: any): string => {
  const romRegion: string = getRegionFromResponse(responseObject) || "ss";
  const romNameArray: Array<{ region: string; text: string }> =
    responseObject.response.jeu.noms;
  const romname =
    romNameArray?.find((romName) => romName.region == romRegion)?.text ||
    "no name found";
  return romname;
};
const getDescriptionFromResponse = (
  responseObject: any,
  locale: string = "en"
): string => {
  const romDescriptionArray: Array<{ langue: string; text: string }> =
    responseObject.response.jeu.synopsis;
  const romDescription =
    romDescriptionArray?.find((romName) => romName.langue == locale)?.text ||
    "no description";
  return romDescription;
};

interface mediaObject {
  type: string;
  url: string;
  region?: string;
  crc: string;
}

const getMediaObjectFromResponse = (
  responseObject: any,
  mediaType: string,
  customregion: string | undefined
): mediaObject | undefined => {
  const romRegion: string =
    customregion || getRegionFromResponse(responseObject);

  const romMediaArray: Array<mediaObject> = responseObject.response.jeu.medias;

  let romMedia = romMediaArray.find(
    (romMediaItem) =>
      romMediaItem.region == romRegion && romMediaItem.type == mediaType
  );
  //if the region is non existant or not found, get the first one in the list
  if (!romMedia)
    romMedia = romMediaArray.find(
      (romMediaItem) => romMediaItem.type == mediaType
    );

  return romMedia;
};

const getRegionFromResponse = (responseObject: any) =>
  responseObject.response.jeu.regions.shortname;

const getIDFromResponse = (responseObject: any): number =>
  responseObject.response.jeu.systeme.id;

const gameSystemFromScreenScraperID = (id: number): GameSystem | undefined => {
  for (let gameSystemSelector in GameSystems) {
    const gameSystemIterated: GameSystem =
      //@ts-ignore because I don't know how to iterate "properly" the static members of a class
      GameSystems[gameSystemSelector] as GameSystem;
    if (gameSystemIterated.screenscraperID == id) return gameSystemIterated;
  }
};

export default scrape;
