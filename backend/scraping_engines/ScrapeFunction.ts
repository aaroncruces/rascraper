import { Assets } from "./Assets";
import { GameSystem } from "./GameSystems";

export interface ScrapeFunction {
  (
    romName: string,
    romCRC?: string | undefined,
    gamesystem?: GameSystem | undefined,
    language?: string | undefined,
    customRegion?: string | undefined
  ): Promise<Assets | undefined>;
}
