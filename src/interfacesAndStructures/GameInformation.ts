import { GameSystem } from "./GameSystems";

/**
 * A list of URL containing assets like images or videos,
 * used in a game frontend .
 * TODO: VIDEOS AND OTHERS
 * also descriptions and gamenames as text
 */
export interface GameInformation {
  //game info:
  gameName?: string;
  gameDescription?: string;
  gameCurrentRoute?: string;
  gameDestinationRoute?: string;
  explicitGameSystem?: GameSystem;
  gameSubCategory?: string;
  deducedGameSystem?: GameSystem;
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
}
