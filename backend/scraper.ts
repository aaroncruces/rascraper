import { Assets } from "./structures/Assets";
import screenscraper from "./scraping_engines/screenscraper";
import { GameSystems, GameSystem } from "./structures/GameSystems";
import { ScrapingEngine } from "./scraping_engines/ScrapingEngines";
import { Frontends } from "./frontends/Frontends";
import { createPlaylistFilesAndDownloadAssets } from "./frontends/retroarch";
import {
  gameSystemFromRomExtension,
  gameSystemFromRomFolderRoute,
  getGamesRouteList,
} from "./fileSystem";
import { GameCompleteInformation } from "./structures/GameCompleteInformation";
const path = require("path");
//TODO: unzip, unrar, etc. autosort roms
//todo: custom systems to define

const dummyAsset = {
  gameName: "Aero the Acro-Bat 2",
  gameDescription:
    "In the sequel to Aero the Acro-Bat you have to defeat evil industrialist Edgar Ektor once again. He is back and again with bad ideas, so you -  in the role of Aero - have to find and destroy him before he carries out his diabolical &quot;Plan B&quot;. Like in the last installment, you have to jump, escape lethal obstacles and progress in time. This game features more moves for Aero, more mechanisms to use and more items to collect.",
  snapURL:
    "https://clone.screenscraper.fr/api2/mediaJeu.php?devid=aaroncio&devpassword=j5OdeaTg5JF&softname=rascraper&ssid=&sspassword=&systemeid=4&jeuid=2627&media=ss(wor)",
  snapCRC: "044a0c7a",
  titleURL:
    "https://clone.screenscraper.fr/api2/mediaJeu.php?devid=aaroncio&devpassword=j5OdeaTg5JF&softname=rascraper&ssid=&sspassword=&systemeid=4&jeuid=2627&media=sstitle(wor)",
  titleCRC: "7868bc7f",
  boxartURL:
    "https://clone.screenscraper.fr/api2/mediaJeu.php?devid=aaroncio&devpassword=j5OdeaTg5JF&softname=rascraper&ssid=&sspassword=&systemeid=4&jeuid=2627&media=box-2D(us)",
  boxartCRC: "3d97b577",
  bezelURL:
    "https://clone.screenscraper.fr/api2/mediaJeu.php?devid=aaroncio&devpassword=j5OdeaTg5JF&softname=rascraper&ssid=&sspassword=&systemeid=4&jeuid=2627&media=bezel-16-9(us)",
  bezelCRC: "6b41b06e",
  deducedGameSystem: GameSystems.SNES,
};
const scrapeFolder = async (
  folderPath: string,
  scrapingEngine: string = ScrapingEngine.screenscraper,
  frontend: Frontends = Frontends.retroarch
) => {
  const gameCompleteList: Array<GameCompleteInformation> = [];
  const fileRouteList = await getGamesRouteList(folderPath);
  for (let fileRoute of fileRouteList) {
    let gameItemInformation: GameCompleteInformation = { gameRoute: fileRoute };

    /*
    const assets = await scrapeRom(
      path.basename(fileRoute),
      undefined,
      gameSystemFromRomFolderRoute(fileRoute) ||
        gameSystemFromRomExtension(fileRoute) ||
        undefined,
      undefined,
      undefined,
      scrapingEngine
    );
*/
    const assets = dummyAsset;
    gameItemInformation.gameAssets = assets;
    gameItemInformation.gameGameSystem =
      gameSystemFromRomFolderRoute(fileRoute) ||
      gameSystemFromRomExtension(fileRoute) ||
      assets?.deducedGameSystem;

    gameCompleteList.push(gameItemInformation);
  }
  createPlaylistFilesAndDownloadAssets(gameCompleteList);
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
