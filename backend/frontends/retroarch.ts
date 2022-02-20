// todo: define specific interfaces
// apropiate architecture-specific and frontend-specific asset format re-encoding

import { GameCompleteInformation } from "../structures/GameCompleteInformation";
import { romRouteToPlayListName } from "./genericFunctions";

const path = require("path");

interface RetroarchPlaylist {
  path: string;
  label: string;
  core_path: string;
  core_name: string;
  crc32: string;
  db_name: string;
}

export const createPlaylistFilesAndDownloadAssets = async (
  gamelist: Array<GameCompleteInformation>,
  savingFolderPath: string = "./"
) => {
  const playlistList: { [playlistName: string]: RetroarchPlaylist[] } = {};
  for (let gameItem of gamelist) {
    //todo: see how to define better the game system
    const playlistName: string = romRouteToPlayListName(gameItem.gameRoute);
    const gameFullRoute = path.resolve(gameItem.gameRoute);
    const playlist: RetroarchPlaylist = generateRetroArchPlaylistItem(
      gameFullRoute,
      gameItem.gameAssets?.gameName,
      playlistName,
      undefined
    );
    if (playlistList[playlistName]) {
      playlistList[playlistName].push(playlist);
    } else {
      playlistList[playlistName] = [playlist];
    }
  }
  //console.log(playlistList);
};

const generateRetroArchPlaylistItem = (
  romRoute: string,
  gamename?: string | undefined,
  playlistName: string = "Games",
  crc: string | undefined = undefined
): RetroarchPlaylist => {
  return {
    path: romRoute,
    label: gamename || path.basename(romRoute),
    core_path: "DETECT",
    core_name: "DETECT",
    crc32: crc ? crc + "|crc" : "DETECT",
    db_name: playlistName + ".lpl",
  };
};
