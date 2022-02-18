export interface GameSystem {
  systemFullName: string;
  systemShortName: string;
  defaultFolder: string;
  screenscraperID: number;
  extensions: Array<string>;
}

export class GameSystems {
  static SNES: GameSystem = {
    systemFullName: "Super Nintendo Entertainment System",
    systemShortName: "Snes",
    defaultFolder: "snes",
    screenscraperID: 4,
    extensions: ["smc", "sfc"],
  };

  static MEGADRIVE: GameSystem = {
    systemFullName: "Sega Mega Drive/Genesis",
    systemShortName: "Megadrive",
    defaultFolder: "megadrive",
    screenscraperID: 1,
    extensions: ["gen", "smd", "md"],
  };
}

/**
 * since enums cannot have custom datatypes,
 * use (GameSystems.SNES as unknown as GameSystemDetails) to work with the IDEs hints
 */
/*
export enum GameSystem {
  SNES = Object(SNESDetails),
  MEGADRIVE = Object(MEGADRIVEDetails),
}
*/
