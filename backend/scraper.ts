import { Assets } from "./structures/Assets";
import screenscraper from "./scraping_engines/screenscraper";
import { GameSystems, GameSystem } from "./structures/GameSystems";
import { ScrapingEngine } from "./scraping_engines/ScrapingEngines";
const path = require("path");
//TODO: unzip, unrar, etc. autosort roms
//todo: custom systems to define

const scrapeFolder = async (
  folderPath: string,
  scrapingEngine: string = ScrapingEngine.screenscraper
): Promise<Array<Assets>> => {
  return [];
};

export const scrapeSingleGame = async (
  romName: string,
  romCRC: string | undefined,
  gamesystem: GameSystem | undefined = undefined,
  language: string = "en",
  customRegion: string | undefined = undefined,
  engine: string = ScrapingEngine.screenscraper
): Promise<Assets | undefined> => {
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
};
