import { Assets } from "./scraping_engines/Assets";
import screenscraper from "./scraping_engines/screenscraper";
import { GameSystems, GameSystem } from "./scraping_engines/GameSystems";

const fs = require("fs").promises;
const path = require("path");

enum ScrapingEngine {
  screenscraper = "screenscraper",
}

enum Frontend {
  retroarch = "retroarch",
}

//TODO: unzip, unrar, etc. autosort roms
const scrapeFolder = async (
  folderPath: string,
  scrapingEngine: string = ScrapingEngine.screenscraper,
  frontend: Frontend = Frontend.retroarch
) => {
  const fileRouteList = await getFileRouteList(folderPath);

  foldersToPlayList();
  return;
  for (let fileRoute of fileRouteList) {
    const gameSystem =
      gameSystemFromExtension(fileRoute) || gameSystemFromRoute(fileRoute);
    //todo: crc

    const assets = await scrapeRom(
      path.basename(fileRoute),
      undefined,
      gameSystem,
      undefined,
      undefined,
      scrapingEngine
    );

    if (!assets) continue;

    console.log(
      retroArchPlaylistItem(
        fileRoute,
        assets,
        (gameSystem as unknown as GameSystem).systemShortName
      )
    );
  }
};

/**
 * takes a folder name like "snes/beat'em up/2 players/rom.zip"
 * to "Snes - Beat'em Up 2 players"
 */
const foldersToPlayList = (
  filefullRoute: string = "snes/beat'em up/2 players/rom.zip"
): string => {
  const playlistName = "";
  let systemFolderFound = false;

  console.log(GameSystems);

  for (let folderName of path.dirname(filefullRoute).split("/")) {
    if (!systemFolderFound) {
      continue;
    }
    console.log(folderName);
  }

  return playlistName;
};

const folderNameToGameSystem = (folderName: string): GameSystem | undefined => {
  return;
};

const retroArchPlaylistItem = (
  romRoute: string,
  assets: Assets | undefined,
  playlistName: string,
  crc: string | undefined = undefined
): object => {
  return {
    path: romRoute,
    label: assets?.gameName,
    core_path: "DETECT",
    core_name: "DETECT",
    crc32: crc ? crc + "|crc" : "DETECT",
    db_name: playlistName + ".lpl",
  };
};

//todo: generalize
const gameSystemFromRoute = (fileRoute: string): GameSystem | undefined => {
  if (path.dirname(fileRoute).includes(GameSystems.SNES.defaultFolder))
    return GameSystems.SNES;
  if (path.dirname(fileRoute).includes(GameSystems.MEGADRIVE.defaultFolder))
    return GameSystems.MEGADRIVE;
};

const gameSystemFromExtension = (fileRoute: string): GameSystem | undefined => {
  if (
    GameSystems.SNES.extensions.includes(path.extname(fileRoute).substring(1))
  )
    return GameSystems.SNES;
  if (
    GameSystems.MEGADRIVE.extensions.includes(
      path.extname(fileRoute).substring(1)
    )
  )
    return GameSystems.MEGADRIVE;
};

/**
 * returns array like [./file1.zip, ./folder1/file2.sfc, ./f3/folder2/file3.srm]
 * ignores empty folders
 * works recursively
 * todo: get it working on DOS based systems (win)
 */
const getFileRouteList = async (rootFolderRoute: string) => {
  const finalFileRouteList: Array<string> = [];
  try {
    //todo: fix things like rootfolder//filename.ext to rootfolder/filename.ext
    const currentFolderNameList = await fs.readdir(rootFolderRoute);
    const currentFolderRouteList = currentFolderNameList.map(
      (fileOrFolderName: string) => rootFolderRoute + "/" + fileOrFolderName
    );

    for (let fileOrFolderRoute of currentFolderRouteList) {
      const isFileOrFolder = await fs.stat(fileOrFolderRoute);

      if (isFileOrFolder.isFile()) finalFileRouteList.push(fileOrFolderRoute);

      if (isFileOrFolder.isDirectory()) {
        const subFolderFileRouteList = await getFileRouteList(
          fileOrFolderRoute
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

const scrapeRom = async (
  romName: string,
  romCRC: string | undefined,
  gamesystem: GameSystem | undefined = undefined,
  language: string = "en",
  customRegion: string | undefined = undefined,
  engine: string = ScrapingEngine.screenscraper
): Promise<Assets | undefined> => {
  if (engine == ScrapingEngine.screenscraper) {
    const result = await screenscraper(
      romName,
      romCRC,
      gamesystem,
      language,
      customRegion
    );
    return result;
  }
};
module.exports = {
  scrapeRom,
  scrapeFolder,
};
