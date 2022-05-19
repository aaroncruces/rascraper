import {
  devid,
  devpassword,
  softname,
} from "../../../../configs/secret/screenscraper_dev_credentials";
import { GameInformation } from "../../../interfacesAndStructures/GameInformation";
import { GameSystems } from "../../../interfacesAndStructures/GameSystems";

export const aeromega_usa_SS_ExpectedAssets: GameInformation = {
  gameName: "Aero the Acro-Bat",
  gameDescription:
    "You play as bat Aero, who have to stop the mad scientist Edgar Ektor, who is trying to rid the world of amusement and fun. So you jump through the circus-style levels, using different kinds of machines such as catapults, cannons, bubble machines, platforms, etc., collecting various power-ups such as cheese, soda, keys, clocks, etc. and avoiding lethal obstacles.",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=ss(wor)`,
  snapCRC: "38a16aaf",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=sstitle(us)`,
  titleCRC: "9653ce35",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=box-2D(us)`,
  boxartCRC: "01ceb84f",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=bezel-16-9(us)`,
  bezelCRC: "a0eda7a9",
  deducedGameSystem: GameSystems.MEGADRIVE,
};
export const aeromega_eur_SS_ExpectedAssets: GameInformation = {
  gameName: "Aero the Acro-Bat",
  gameDescription:
    "You play as bat Aero, who have to stop the mad scientist Edgar Ektor, who is trying to rid the world of amusement and fun. So you jump through the circus-style levels, using different kinds of machines such as catapults, cannons, bubble machines, platforms, etc., collecting various power-ups such as cheese, soda, keys, clocks, etc. and avoiding lethal obstacles.",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=ss(wor)`,
  snapCRC: "38a16aaf",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=sstitle(us)`,
  titleCRC: "9653ce35",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=box-2D(eu)`,
  boxartCRC: "ddb842b1",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=bezel-16-9(us)`,
  bezelCRC: "a0eda7a9",
  deducedGameSystem: GameSystems.MEGADRIVE,
};
export const aeromega_default_SS_ExpectedAssets = {
  gameName: "Aero the Acro-Bat",
  gameDescription:
    "You play as bat Aero, who have to stop the mad scientist Edgar Ektor, who is trying to rid the world of amusement and fun. So you jump through the circus-style levels, using different kinds of machines such as catapults, cannons, bubble machines, platforms, etc., collecting various power-ups such as cheese, soda, keys, clocks, etc. and avoiding lethal obstacles.",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=ss(wor)`,
  snapCRC: "38a16aaf",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=sstitle(us)`,
  titleCRC: "9653ce35",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=box-2D(us)`,
  boxartCRC: "01ceb84f",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=1&jeuid=129&media=bezel-16-9(us)`,
  bezelCRC: "a0eda7a9",
  deducedGameSystem: GameSystems.MEGADRIVE,
};
