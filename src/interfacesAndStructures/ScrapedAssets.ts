import { GameSystem } from "./GameSystems";

/**
 * A list of URL containing assets like images or videos,
 * used in a game frontend .
 * TODO: VIDEOS AND OTHERS
 * also descriptions and gamenames as text
 */
export interface ScrapedAssets {
  gameName?: string;
  gameDescription?: string;
  snapURL?: string;
  snapCRC?: string;
  titleURL?: string;
  titleCRC?: string;
  boxartURL?: string;
  boxartCRC?: string;
  bezelURL?: string;
  bezelCRC?: string;
  deducedGameSystem?: GameSystem;
}
