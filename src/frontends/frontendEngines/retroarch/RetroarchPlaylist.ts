import { GameInformation } from "../../../interfacesAndStructures/GameInformation";
import { GameSystem } from "../../../interfacesAndStructures/GameSystems";

export class RetroarchPlaylist {
  playlistName?: string;
  playlistGameSystem?: GameSystem;
  playlistSubCategory?: string;
  playlistCachedRoute?: string;
  playlistDestinationRoute?: string;
  playlistJSONContent?: RetroarchPlaylistJSONObject;
  gameList?: Array<GameInformation>;
  constructor(playlistGameSystem: GameSystem, playlistSubCategory?: string) {
    this.playlistGameSystem = playlistGameSystem;
    this.playlistSubCategory = playlistSubCategory;
    this.playlistName =
      RetroarchPlaylist.getPlaylistNameFromSystemAndSubCategory(
        playlistGameSystem,
        playlistSubCategory
      );
    this.playlistJSONContent = new RetroarchPlaylistJSONObject();
  }

  private static getPlaylistNameFromSystemAndSubCategory = (
    playlistGameSystem: GameSystem,
    playlistSubCategory?: string
  ): string =>
    playlistSubCategory
      ? playlistGameSystem.systemShortName + " - " + playlistSubCategory
      : playlistGameSystem.systemFullName;
  /**
   * adds a game to the gamelist and the json object
   * @param gameItem
   */
  addGame = (gameItem: GameInformation) => {
    //todo: redundancy check guard
    this.gameList?.push(gameItem);

    this.playlistJSONContent?.items;
  };
}

class RetroarchPlaylistJSONObject {
  items?: Array<RetroarchPlaylistGameItemJSONObject>;
}
class RetroarchPlaylistGameItemJSONObject {
  /*
  //example
    path: "ur0:/roms/snes/Super Nintendo Plataformas y Accion/ActRaiser (USA).sfc",
    label: "ActRaiser (USA)",
    core_path: "DETECT",
    core_name: "DETECT",
    crc32: "00000000|crc",
    db_name: "Super Nintendo Plataformas y Accion.lpl",
  */
  path?: string;
  label?: string;
  core_path = "DETECT";
  core_name = "DETECT";
  crc32? = "00000000|crc";
  db_name: string;
  constructor(gameItem: GameInformation, playlistName: string) {
    this.path = gameItem.gameDestinationRoute;
    this.label = gameItem.gameName;
    this.crc32 = gameItem.gameCRC;
    this.db_name = playlistName;
  }
}
