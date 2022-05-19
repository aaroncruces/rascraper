import { GameSystem } from "./GameSystems";
import { ScrapedAssets } from "./ScrapedAssets";

export interface GameCompleteInformation {
  gameCurrentRoute?: string;
  gameAssets?: ScrapedAssets;
  gameGameSystem?: GameSystem;
  gameSubCategory?: string;
}
