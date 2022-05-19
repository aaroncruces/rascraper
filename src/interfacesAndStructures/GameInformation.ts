import { GameSystem } from "./GameSystems";

/**
 * A list of URL containing assets like images or videos,
 * used in a game frontend .
 * TODO: VIDEOS AND OTHERS
 * also descriptions and gamenames as text
 */
export interface GameInformation {
  gameName?: string;
  gameDescription?: string;
  snapURL?: string;
  snapCRC?: string;
  snapCachedDownloadRoute?: string;
  snapDestination?: string;
  titleURL?: string;
  titleCRC?: string;
  titleCachedDownloadRoute?: string;
  titleDestination?: string;
  boxartURL?: string;
  boxartCRC?: string;
  boxartCachedDownloadRoute?: string;
  boxartDestination?: string;
  bezelURL?: string;
  bezelCRC?: string;
  bezelCachedDownloadRoute?: string;
  bezelDestination?: string;
  //todo: videos an others when implementing other frontends
  deducedGameSystem?: GameSystem;
  gameCurrentRoute?: string;
  gameDestination?: string;
  gameScrapedAssets?: GameInformation;
  gameGameSystem?: GameSystem;
  gameSubCategory?: string;

  /*
  gameCurrentRoute?: string;
  gameDestination?: string;
  gameScrapedAssets?: ScrapedAssets;
  gameGameSystem?: GameSystem;
  gameSubCategory?: string;
   */
}
