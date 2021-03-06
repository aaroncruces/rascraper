import { GameInformation } from "../../../interfacesAndStructures/GameInformation";
import { GameSystems } from "../../../interfacesAndStructures/GameSystems";
import {
  devid,
  devpassword,
  softname,
} from "../../../../configs/secret/screenscraper_dev_credentials";

export const smb2_SS_ExpectedAssets: GameInformation = {
  gameName: "Super Mario Bros. 2",
  gameDescription:
    "One night Mario has a strange dream, where he opens a door to another world filled with even stranger creatures and lands then those in his last adventure against Bowser. Amazingly, the next day, Mario, Luigi, Toad, and the Princess stumble upon a cave, which leads to the world that was in Mario's dream.\n" +
    "\n" +
    "Subcon, the land of dreams, is under an evil spell thanks to Wart, so Mario and the gang must save the day. New creatures to defeat and plenty of nasty surprises await.\n" +
    "\n" +
    "Choose from the four characters, each differing in speed and jumping ability, and head on through 7 levels each filled with puzzles, bosses, bonus money, the always helpful mushroom, and invincible star, plus bombs and magic potions. \n" +
    "After each level, depending on the coins you collect, you can use them in the bonus game to collect extra lives.",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=ss(wor)`,
  snapCRC: "1cacd396",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=sstitle(wor)`,
  titleCRC: "9f3bace5",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=box-2D(us)`,
  boxartCRC: "2dfa9b08",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=bezel-16-9(us)`,
  bezelCRC: "949b3649",
  deducedGameSystem: GameSystems.NES,
};

//GameSystems.NES
export const smb2_fr_default_SS_ExpectedAssets: GameInformation = {
  gameName: "Super Mario Bros. 2",
  gameDescription:
    "Mario est de retour! Plus grand et plus fort que jamais!\r\n" +
    "Il s'agit cette fois d'un combat sans merci pour lib??rer le royaume de Subcon du sortil??ge que lui a jet?? le m??chant Wart. Aid?? de Mario, de Luigi, de Toad et de la Princesse, vous devez retrouver Wart dans des mondes bizarres aux niveaux multiples et le battre! Vous poss??dez cette fois un pouvoir tr??s sp??cial - le pouvoir d'arracher- et, d??sormais, tout ce que vous trouvez vous sert d'arme. Mais prenez garde! Vous n'avez jamais encore eu affaire ?? de tels adversaires! Des Shyguy et des Tweeter! Des Ninji et des Beezo! Vous n'avez jamais v??cu pareille aventure! Seule votre ruse et votre agilit?? peuvent vous sauver...",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=ss(wor)`,
  snapCRC: "1cacd396",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=sstitle(wor)`,
  titleCRC: "9f3bace5",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=box-2D(us)`,
  boxartCRC: "2dfa9b08",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=bezel-16-9(us)`,
  bezelCRC: "949b3649",
  deducedGameSystem: GameSystems.NES,
};

export const smb2_default_jp_SS_ExpectedAssets: GameInformation = {
  gameName: "Super Mario USA",
  gameDescription:
    "One night Mario has a strange dream, where he opens a door to another world filled with even stranger creatures and lands then those in his last adventure against Bowser. Amazingly, the next day, Mario, Luigi, Toad, and the Princess stumble upon a cave, which leads to the world that was in Mario's dream.\n" +
    "\n" +
    "Subcon, the land of dreams, is under an evil spell thanks to Wart, so Mario and the gang must save the day. New creatures to defeat and plenty of nasty surprises await.\n" +
    "\n" +
    "Choose from the four characters, each differing in speed and jumping ability, and head on through 7 levels each filled with puzzles, bosses, bonus money, the always helpful mushroom, and invincible star, plus bombs and magic potions. \n" +
    "After each level, depending on the coins you collect, you can use them in the bonus game to collect extra lives.",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=ss(wor)`,
  snapCRC: "1cacd396",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=sstitle(jp)`,
  titleCRC: "f5aae56b",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=box-2D(jp)`,
  boxartCRC: "fd7e86f0",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=bezel-16-9(us)`,
  bezelCRC: "949b3649",
  deducedGameSystem: GameSystems.NES,
};
export const smb2_fr_jp_SS_ExpectedAssets: GameInformation = {
  gameName: "Super Mario USA",
  gameDescription:
    "Mario est de retour! Plus grand et plus fort que jamais!\r\n" +
    "Il s'agit cette fois d'un combat sans merci pour lib??rer le royaume de Subcon du sortil??ge que lui a jet?? le m??chant Wart. Aid?? de Mario, de Luigi, de Toad et de la Princesse, vous devez retrouver Wart dans des mondes bizarres aux niveaux multiples et le battre! Vous poss??dez cette fois un pouvoir tr??s sp??cial - le pouvoir d'arracher- et, d??sormais, tout ce que vous trouvez vous sert d'arme. Mais prenez garde! Vous n'avez jamais encore eu affaire ?? de tels adversaires! Des Shyguy et des Tweeter! Des Ninji et des Beezo! Vous n'avez jamais v??cu pareille aventure! Seule votre ruse et votre agilit?? peuvent vous sauver...",
  snapURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=ss(wor)`,
  snapCRC: "1cacd396",
  titleURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=sstitle(jp)`,
  titleCRC: "f5aae56b",
  boxartURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=box-2D(jp)`,
  boxartCRC: "fd7e86f0",
  bezelURL: `https://clone.screenscraper.fr/api2/mediaJeu.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&ssid=&sspassword=&systemeid=3&jeuid=1248&media=bezel-16-9(us)`,
  bezelCRC: "949b3649",
  deducedGameSystem: GameSystems.NES,
};
