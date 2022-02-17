import { Assets } from "./assets";

const axios = require("axios");

const {
  devid,
  devpassword,
} = require("./../../configs/screenscraper_dev_credentials");
const softname = "rascraper";

//TODO: GET AVAILABLE REGIONS TO SCRAPE
const scrape = (
  filename: any,
  locale: string = "en",
  customRegion: string
): Promise<Assets> => {
  const sourceurl = `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=rascraper&output=json&romtype=rom&romnom=${filename}`;

  return axios.get(sourceurl).then((response: any) => {
    const responseObject = response.data;
    let gameAssets: Assets = {};

    gameAssets.gameName = getNameFromResponse(responseObject);

    gameAssets.gameDescription = getDescriptionFromResponse(
      responseObject,
      locale
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

    console.log(gameAssets);

    return gameAssets;
  });
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

  console.log(romRegion + "----" + mediaType);

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

module.exports = scrape;
