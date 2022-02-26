import { FileCRCStruct } from "../interfacesAndStructures/FileCRCStruct";
import { GameCompleteInformation } from "../interfacesAndStructures/GameCompleteInformation";

export const getGameNamesAndCRCList = async (): Promise<
  Array<FileCRCStruct>
> => {
  //A
  //1: get file routes from folder
  //2: get crc from the routes
  //3: get basenames from the routes
  //4: package the info on a filecrcstruct[] and return
  return [];
};

export const getGameInfoListFromScraper = async (): Promise<
  Array<GameCompleteInformation>
> => {
  //B
  //1: obtain all the games with their crc
  //2: get the gamesystem from folder/ext it can fail
  //3: scrape each game and add its contents (assets and gamesystem if step2 fails) to a gamecompleteinfo
  //4 return gamecompleteinfo[]
  return [];
};

export const GetPlaylistAndPlacementFromFrontend = async (): Promise<
  Array<GameCompleteInformation>
> => {
  //c
  //1: obtain the game info form a folder+scrapingengine
  //2: get info from frontendengine (playlist+structure to place assets). TODO
  //3: place playlist and download the assets
  return [];
};
