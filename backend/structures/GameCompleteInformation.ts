import { Assets } from "./Assets";
import { GameSystem } from "./GameSystems";

export interface GameCompleteInformation {
  gameRoute: string;
  gameAssets?: Assets | undefined;
  gameGameSystem?: GameSystem | undefined;
}
