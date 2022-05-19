import { ScrapedAssets } from "./ScrapedAssets";
import { GameSystem } from "./GameSystems";

export interface GameCompleteInformation {
  gameCurrentRoute?: string;
  gameAssets?: ScrapedAssets;
  gameGameSystem?: GameSystem;
  gameSubCategory?: string;
}
