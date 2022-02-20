import { GameSystem, GameSystems } from "../structures/GameSystems";
const fs = require("fs").promises;
const path = require("path");

export const createFolder = async (folderpath: string) => {
  try {
    await fs.mkdir(folderpath, { recursive: true });
  } catch (error) {
    console.log(error);
  }
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

export const gameSystemFromRomFolderRoute = (
  fileRoute: string
): GameSystem | undefined => {
  for (let gameSystemSelector in GameSystems) {
    const gameSystemIterated: GameSystem =
      //@ts-ignore because I don't know how to iterate "properly" the static members of a class
      GameSystems[gameSystemSelector] as GameSystem;

    if (path.dirname(fileRoute).includes(gameSystemIterated.defaultFolder))
      return gameSystemIterated;
  }
};

export const gameSystemFromRomExtension = (
  fileRoute: string
): GameSystem | undefined => {
  for (let gameSystemSelector in GameSystems) {
    const gameSystemIterated: GameSystem =
      //@ts-ignore because I don't know how to iterate "properly" the static members of a class
      GameSystems[gameSystemSelector] as GameSystem;
    if (
      gameSystemIterated.extensions.includes(
        path.extname(fileRoute).substring(1)
      )
    )
      return gameSystemIterated;
  }
};

/**
 * returns array like [/.../file1.zip, /.../folder1/file2.sfc, /.../f3/folder2/file3.srm]
 * ignores empty folders
 * works recursively
 * todo: get it working on DOS based systems (win)
 */
export const getGamesRouteList = async (rootFolderRoute: string) => {
  const finalFileRouteList: Array<string> = [];
  try {
    //todo: fix things like rootfolder//filename.ext to rootfolder/filename.ext
    const currentFolderNameList = await fs.readdir(rootFolderRoute);
    const currentFolderRouteList = currentFolderNameList.map(
      (fileOrFolderName: string) => rootFolderRoute + "/" + fileOrFolderName
    );

    for (let fileOrFolderRelativeRoute of currentFolderRouteList) {
      const fileOrFolderFullRoute = fileOrFolderRelativeRoute;
      const isFileOrFolder = await fs.stat(fileOrFolderFullRoute);

      if (isFileOrFolder.isFile())
        finalFileRouteList.push(fileOrFolderFullRoute);

      if (isFileOrFolder.isDirectory()) {
        const subFolderFileRouteList = await getGamesRouteList(
          fileOrFolderFullRoute
        );
        subFolderFileRouteList.forEach((subFolderFileRoute) =>
          finalFileRouteList.push(subFolderFileRoute)
        );
      }
    }
  } catch (error) {
    console.error(error + "/n Is the file open?");
  }

  return finalFileRouteList;
};

export const gameSystemFromScreenScraperID = (
  id: number
): GameSystem | undefined => {
  for (let gameSystemSelector in GameSystems) {
    const gameSystemIterated: GameSystem =
      //@ts-ignore because I don't know how to iterate "properly" the static members of a class
      GameSystems[gameSystemSelector] as GameSystem;
    if (gameSystemIterated.screenscraperID == id) return gameSystemIterated;
  }
};
