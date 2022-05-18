export interface GameSystem {
  systemFullName: string;
  systemShortName: string;
  folderNames: Array<string>;
  screenscraperID: number;
  extensions: Array<string>;
}

/**
 * the weirdness on the use of this module
 * comes by the necesity of the use of
 * something like an enum of custom type-defined objects
 * wich is not allowed in TS
 */
export class GameSystems {
  static SNES: GameSystem = {
    systemFullName: "Super Nintendo Entertainment System",
    systemShortName: "Snes",
    folderNames: ["snes", "SNES"],
    screenscraperID: 4,
    extensions: ["smc", "sfc"],
  };

  static MEGADRIVE: GameSystem = {
    systemFullName: "Sega Mega Drive/Genesis",
    systemShortName: "Megadrive",
    folderNames: ["megadrive", "genesis"],
    screenscraperID: 1,
    extensions: ["gen", "smd", "md"],
  };

  static NEOGEO: GameSystem = {
    systemFullName: "Neo Geo",
    systemShortName: "Neogeo",
    folderNames: ["neogeo"],
    screenscraperID: 142,
    extensions: ["zip"],
  };

  static NES: GameSystem = {
    systemFullName: "Nintendo Entertainment System",
    systemShortName: "Nes",
    folderNames: ["nes"],
    screenscraperID: 3,
    extensions: ["nes"],
  };
}
