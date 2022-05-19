import { GameInformation } from "../../../interfacesAndStructures/GameInformation";
import { GameSystems } from "../../../interfacesAndStructures/GameSystems";
import {
  devid,
  devpassword,
  softname,
} from "../../../../configs/secret/screenscraper_dev_credentials";

export const mslug_SS_ExpectedAssets: GameInformation = {
  gameName: "Metal Slug - Super Vehicle-001",
  gameDescription:
    "Metal Slug, originally released on the Neo Geo, is a side-scrolling shoot'em'up.\n" +
    "\n" +
    "The player(s) takes the role of a soldier (or two) and fights a gigantic army. Every level consists of running forward blasting anything that moves, while collecting power-ups along the way (there's also a wide selection of weaponry in the game). In the end of each level the player goes up against one gigantic boss. \n" +
    "\n" +
    "The PlayStation port introduces some extra features: there is a combat school where the player may fight with other players for the best time on each level and an art gallery.\r",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=142&jeuid=37604&media=ss(wor)`,
  snapCRC: "4075a594",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=142&jeuid=37604&media=sstitle(wor)`,
  titleCRC: "79d19638",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=142&jeuid=37604&media=box-2D(wor)`,
  boxartCRC: "7d0b53c1",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=142&jeuid=37604&media=bezel-16-9(wor)`,
  bezelCRC: "47759e47",
  deducedGameSystem: GameSystems.NEOGEO,
};
