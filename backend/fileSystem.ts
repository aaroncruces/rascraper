import { GameSystem, GameSystems } from "./structures/GameSystems";
const fs = require("fs").promises;
const path = require("path");

export const text = (string: string) => {
  console.log(string);
  return true;
};

export const createFolder = async (folderpath: string): Promise<boolean> => {
  await fs.mkdir(folderpath, { recursive: true });
  const stat = await fs.stat(folderpath);
  return stat.isDirectory();
};

export const deleteFileOrFolder = async (
  itemRoute: string
): Promise<boolean> => {
  await fs.rm(itemRoute, { recursive: true, force: true });
  try {
    await fs.access(itemRoute);
    return false;
  } catch {
    return true;
  }
};

export const createTextFileFromObject = async (
  fileRoute: string,
  objectToBeWritten: object
): Promise<boolean> => {
  await fs.writeFile(fileRoute, JSON.stringify(objectToBeWritten, null, 2));
  try {
    await fs.access(fileRoute);
    return true;
  } catch {
    return false;
  }
};

export const readTextFileAsObject = async (
  fileRoute: string
): Promise<object> => {
  const textResult = await fs.readFile(fileRoute);
  return JSON.parse(textResult);
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
