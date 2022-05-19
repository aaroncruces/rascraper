import { GameInformation } from "../../../interfacesAndStructures/GameInformation";
import { GameSystems } from "../../../interfacesAndStructures/GameSystems";
import {
  devid,
  devpassword,
  softname,
} from "../../../../configs/secret/screenscraper_dev_credentials";

export const aerosnes_SS_ExpectedAssets: GameInformation = {
  gameName: "Aero the Acro-Bat",
  gameDescription:
    "You play as bat Aero, who have to stop the mad scientist Edgar Ektor, who is trying to rid the world of amusement and fun. So you jump through the circus-style levels, using different kinds of machines such as catapults, cannons, bubble machines, platforms, etc., collecting various power-ups such as cheese, soda, keys, clocks, etc. and avoiding lethal obstacles.",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=4&jeuid=2437&media=ss(wor)`,
  snapCRC: "c0f481ef",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=4&jeuid=2437&media=sstitle(wor)`,
  titleCRC: "6c45a0cb",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=4&jeuid=2437&media=box-2D(us)`,
  boxartCRC: "f9cdeb00",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=4&jeuid=2437&media=bezel-16-9(us)`,
  bezelCRC: "3dc8b68b",
  deducedGameSystem: GameSystems.SNES,
};
