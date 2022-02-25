import screenscraper from "./scraping_engines/screenscraper";
import { ScrapingEngine } from "./scraping_engines/ScrapingEngines";
import { GameSystem } from "../interfacesAndStructures/GameSystems";
import { Assets } from "../interfacesAndStructures/Assets";

export const scrapeGame = async (
  romName: string,
  romCRC?: string | undefined,
  gameSystem?: GameSystem,
  language?: string,
  customRegion?: string,
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
