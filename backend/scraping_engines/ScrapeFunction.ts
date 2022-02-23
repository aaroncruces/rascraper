import { Assets } from "../structures/Assets";
import { GameSystem } from "../structures/GameSystems";

export interface ScrapeFunction {
  (
    romName: string,
    romCRC?: string | undefined,
    gamesystem?: GameSystem | undefined,
    language?: string | undefined,
    customRegion?: string | undefined
  ): Promise<Assets | undefined>;
}
