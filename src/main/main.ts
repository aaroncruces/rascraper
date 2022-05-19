import { Frontends } from "../frontends/frontendEngines/Frontends";
import { FileCRCStruct } from "../interfacesAndStructures/FileCRCStruct";
import { GameCompleteInformation } from "../interfacesAndStructures/GameCompleteInformation";
import { getCRCFromFile } from "../io/fileSystem";
import {
  gameSystemFromRomExtension,
  gameSystemFromRomFolderRoute,
  getGamesRouteList,
} from "../io/gameFileSystemAndRoutes";
import { ScrapingEngine } from "../scraper/scraping_engines/ScrapingEngines";
import scrape_screenscraper from "../scraper/scraping_engines/screenscraper";
const path = require("path");

/**
 * @param folderRoute
 * @returns something with a structure like ../mockExampleObjects/filesystemHelpers/knownCRCExamples.knowCRCExampleList
 */
export const getGameNamesAndCRCList = async (
  folderRoute: string
): Promise<Array<FileCRCStruct>> => {
  //1: obtain all routes with files from folder
  const fileRouteListFromFolder = await getGamesRouteList(folderRoute);
  //2: get the crc and filename from route and package the list
  const fileCRCStructList = await Promise.all(
    fileRouteListFromFolder.map(async (fileRoute) => {
      const crcFromFile = await getCRCFromFile(fileRoute);
      const fileCRCStruct: FileCRCStruct = {
        filename: path.basename(fileRoute),
        crc: crcFromFile,
        fileRoute,
      };
      return fileCRCStruct;
    })
  );

  return fileCRCStructList || [];
};

export const getGameInfoListFromScraper = async (
  folderRoute: string,
  scraper = ScrapingEngine.screenscraper
): Promise<Array<GameCompleteInformation>> => {
  //todo: map the scraping engine

  //1: obtain all the games with their crc
  const fileCRCStructList = await getGameNamesAndCRCList(folderRoute);

  const gameCompleteInfoList = await Promise.all(
    fileCRCStructList.map(async (fileCRCStructItem) => {
      //2: get the gamesystem from folder/ext. can be undefined
      const gameSystemFromFile =
        gameSystemFromRomFolderRoute(
          fileCRCStructItem.fileRoute || fileCRCStructItem.filename
        ) || gameSystemFromRomExtension(fileCRCStructItem.filename);

      const itemInformation: GameCompleteInformation = {
        gameCurrentRoute: fileCRCStructItem.fileRoute,
        gameGameSystem: gameSystemFromFile,
        //3: scrape each game and add its contents (assets and gamesystem if step2 fails) to a gamecompleteinfo
        gameAssets: await scrape_screenscraper(
          fileCRCStructItem.filename,
          fileCRCStructItem.crc,
          gameSystemFromFile
        ),
      };
      return itemInformation;
    })
  );
  //4 return gamecompleteinfo[]
  return gameCompleteInfoList || [];
};

export const getPlaylistAndPlacementFromFrontend = async (
  folderRoute: string,
  scraper = ScrapingEngine.screenscraper,
  frontend = Frontends.retroarch
): Promise<Array<Object>> => {
  //1: obtain the game info form a folder+scrapingengine
  const infolist = await getGameInfoListFromScraper(folderRoute, scraper);

  //2: get info from frontendengine (playlist+structure to place assets). TODO define that structure
  //3: place playlist and download the assets
  return [];
};
