import { GameSystem, GameSystems } from "./structures/GameSystems";
const fs = require("fs").promises;
const path = require("path");

export const createFolder = async (folderpath: string) => {
  await fs.mkdir(folderpath, { recursive: true });
  const stat = await fs.stat(folderpath);
  return stat.isDirectory();
};

export const deleteFolder = async (folderpath: string) => {
  await fs.rm(folderpath, { recursive: true, force: true });
  try {
    await fs.access(folderpath);
    return false;
  } catch {
    return true;
  }
};

export const createTextFile = () => {};

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
