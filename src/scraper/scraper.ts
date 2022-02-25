import screenscraper from "./scraping_engines/screenscraper";
import { ScrapingEngine } from "./scraping_engines/ScrapingEngines";
import { GameCompleteInformation } from "../interfacesAndStructures/GameCompleteInformation";
import { GameSystem } from "../interfacesAndStructures/GameSystems";
import { Assets } from "../interfacesAndStructures/Assets";
const path = require("path");

export const scrapeGame = async (
  romName: string,
  romCRC?: string | undefined,
  gameSystem: GameSystem | undefined = undefined,
  language: string = "en",
  customRegion: string | undefined = undefined,
  scrapingEngine: string = ScrapingEngine.screenscraper
): Promise<Assets> => {
  if (scrapingEngine == ScrapingEngine.screenscraper) {
    const result = await screenscraper(
      romName,
      romCRC,
      gameSystem,
      language,
      customRegion
    );
    return result;
  }
  return {};
};
