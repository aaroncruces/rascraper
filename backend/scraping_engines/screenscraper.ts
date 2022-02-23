import { Assets } from "../structures/Assets";
import { GameSystem, GameSystems } from "../structures/GameSystems";
import { ScrapeFunction } from "./ScrapeFunction";

const axios = require("axios");

const {
  devid,
  devpassword,
} = require("./../../configs/screenscraper_dev_credentials");
const softname = "rascraper";

//TODO: GET AVAILABLE REGIONS TO SCRAPE
/**
 * if customRegion is undefined, it will get the region asset of the rom itself or the first one if not
 * @param romName name to be searched online
 * @param language, language of the descriptions
 * @param customRegion For assets of other regions (like jp for an us game)
 * @returns
 */
const scrape: ScrapeFunction = async (
  romName: string,
  romCRC?: string | undefined,
  gamesystem: GameSystem | undefined = undefined,
  language: string = "en",
  customRegion: string | undefined = undefined
) => {
  let gameSystemIDParam = "";
  if (gamesystem) {
    gameSystemIDParam = "&systemeid=" + gamesystem.screenscraperID.toString();
  }

  const sourceURL = `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=rascraper&output=json&romtype=rom${gameSystemIDParam}&romnom=${romName}`;
  //console.log(sourceURL);
  let response;
  try {
    response = await axios.get(sourceURL);
  } catch (error) {
    return;
  }

  const responseObject = response.data;

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
export default scrape;

export const gameSystemFromScreenScraperID = (
  id: number
): GameSystem | undefined => {
  for (let gameSystemSelector in GameSystems) {
    const gameSystemIterated: GameSystem =
      //@ts-ignore because I don't know how to iterate "properly" the static members of a class
      GameSystems[gameSystemSelector] as GameSystem;
    if (gameSystemIterated.screenscraperID == id) return gameSystemIterated;
  }
};
