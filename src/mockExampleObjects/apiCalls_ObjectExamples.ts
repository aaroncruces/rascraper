import {
  devid,
  devpassword,
  softname,
} from "../../configs/secret/screenscraper_dev_credentials";
import { aeromega_ss } from "./screenscraper/returnedFromApi/aeromega";
import { aerosnes_ss } from "./screenscraper/returnedFromApi/aerosnes";
import { mslug_ss } from "./screenscraper/returnedFromApi/mslug";
import { smb2_ss } from "./screenscraper/returnedFromApi/smb2";

interface objectExample {
  url: string;
  objectReturned: object;
}
export const apiCallsExamples: Array<objectExample> = [
  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&romnom=mslug.zip`,
    objectReturned: mslug_ss,
  },
  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&systemeid=4&romnom=Aero%20the%20Acro-Bat%20(USA).sfc`,
    objectReturned: aerosnes_ss,
  },
  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&systemeid=1&romnom=Aero%20the%20Acro-Bat%20(USA).sfc`,
    objectReturned: aeromega_ss,
  },

  {
    url: `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=${softname}&output=json&romtype=rom&romnom=Super%20Mario%20Bros.%202%20(USA).zip`,
    objectReturned: smb2_ss,
  },
];