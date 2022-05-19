import { ScrapedAssets } from "../../interfacesAndStructures/ScrapedAssets";
import { GameSystem } from "../../interfacesAndStructures/GameSystems";

/**
 * interface on wich all scraping engines have to comply
 */
export interface ScrapeFunction {
  (
    romName: string,
    romCRC?: string | undefined,
    gamesystem?: GameSystem | undefined,
    language?: string | undefined,
    customRegion?: string | undefined
  ): Promise<ScrapedAssets>;
}
