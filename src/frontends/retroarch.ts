// todo: define specific interfaces
// apropiate architecture-specific and frontend-specific asset format re-encoding

import {
  gameSystemFromRomExtension,
  gameSystemFromRomFolderRoute,
} from "../io/gameFileSystemAndRoutes";
import { GameCompleteInformation } from "../interfacesAndStructures/GameCompleteInformation";
import { GameSystem } from "../interfacesAndStructures/GameSystems";

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

/**
 * takes a folder name like "snes/beat'em up/2 players/rom.zip"
 * to "Snes - Beat'em Up 2 players"
 */
export const romRouteToPlayListName = (
  romRoute: string,
  definedGameSystem: GameSystem | undefined = undefined
): string => {
  let playlistName = "";

  const fullFolderSequence: Array<string> = path.dirname(romRoute).split("/");
  let namedFolderSequence: Array<string> = [];
  const shortenFolderSequienceTo2Items = () => {
    if (fullFolderSequence.length > 0) {
      if (fullFolderSequence[0] == "." || "..")
        namedFolderSequence = fullFolderSequence.slice(1);

      if (namedFolderSequence.length > 2)
        namedFolderSequence = namedFolderSequence.slice(
          namedFolderSequence.length - 2
        );
    }
  };

  //priority1: customGameSystem given
  if (definedGameSystem) {
    playlistName = definedGameSystem.systemShortName + " -";
    shortenFolderSequienceTo2Items();
  } else {
    //priority2: game system from folder
    const gameSystemFromFolder = gameSystemFromRomFolderRoute(romRoute);
    if (gameSystemFromFolder) {
      let gameSystemFolderReached = false;
      for (let iteratedFolderName of fullFolderSequence) {
        if (!gameSystemFolderReached) {
          if (
            gameSystemFromFolder.defaultFolder ==
            (iteratedFolderName as string).toLowerCase()
          ) {
            gameSystemFolderReached = true;
            playlistName += gameSystemFromFolder.systemShortName + " -";
          }
          continue;
        }
        namedFolderSequence.push(iteratedFolderName);
      }
    } else {
      {
        //priority3: game system from rom extension
        const gameSystemFromExtension = gameSystemFromRomExtension(romRoute);
        if (gameSystemFromExtension) {
          playlistName = gameSystemFromExtension.systemShortName + " -";
          shortenFolderSequienceTo2Items();
        }

        // finally, give up
        else return "noPlaylistName";
      }
    }
  }

  //add the folder names as categories to the playlist name
  //todo: modify to senctence case
  for (let foldername of namedFolderSequence) {
    playlistName += " " + foldername;
  }

  return playlistName;
};
