import screenscraper from "./scraping_engines/screenscraper";
import { ScrapingEngine } from "./scraping_engines/ScrapingEngines";
import { GameCompleteInformation } from "../interfacesAndStructures/GameCompleteInformation";
import { GameSystem } from "../interfacesAndStructures/GameSystems";
import { Assets } from "../interfacesAndStructures/Assets";
const path = require("path");
//TODO: unzip, unrar, etc. autosort roms
//todo: custom systems to define

const scrapeFolder = async (
  folderPath: string,
  scrapingEngine: string = ScrapingEngine.screenscraper
): Promise<Array<GameCompleteInformation>> => {
  return [];
};

export const scrapeSingleGame = async (
  romName: string,
  romCRC?: string | undefined,
  gamesystem: GameSystem | undefined = undefined,
  language: string = "en",
  customRegion: string | undefined = undefined,
  engine: string = ScrapingEngine.screenscraper
): Promise<Assets> => {
  if (engine == ScrapingEngine.screenscraper) {
    const result = await screenscraper(
      romName,
      romCRC,
      gamesystem,
      language,
      customRegion
    );
    return result;
  }
  return {};
};
