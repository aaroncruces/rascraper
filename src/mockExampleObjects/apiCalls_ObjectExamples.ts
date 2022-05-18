import {
  devid,
  devpassword,
  softname,
} from "../../configs/secret/screenscraper_dev_credentials";
import { GameSystems } from "../interfacesAndStructures/GameSystems";
import {
  aeromega_usa_ss,
  aeromega_eur_ss,
  aeromega_default_ss,
} from "./screenscraper/returnedFromApi/aeromega";
import { aerosnes_usa_ss } from "./screenscraper/returnedFromApi/aerosnes";
import { mslug_ss } from "./screenscraper/returnedFromApi/mslug";
import { smb2_usa_ss } from "./screenscraper/returnedFromApi/smb2";

interface objectExample {
  url: string;
  objectReturned: object;
}
export const apiCallsExamples: Array<objectExample> = [
  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&systemeid=${GameSystems.MEGADRIVE.screenscraperID}&romnom=Aero%20the%20Acro-Bat%20(USA).md`,
    objectReturned: aeromega_usa_ss,
  },
  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&systemeid=${GameSystems.MEGADRIVE.screenscraperID}&romnom=Aero%20the%20Acro-Bat%20(Europe).md`,
    objectReturned: aeromega_eur_ss,
  },

  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&romnom=Aero%20the%20Acro-Bat.zip`,
    objectReturned: aeromega_default_ss,
  },

  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&romnom=mslug.zip`,
    objectReturned: mslug_ss,
  },
  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&systemeid=4&romnom=Aero%20the%20Acro-Bat%20(USA).sfc`,
    objectReturned: aerosnes_usa_ss,
  },

  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&romnom=Super%20Mario%20Bros.%202%20(USA).zip`,
    objectReturned: smb2_usa_ss,
  },
];
