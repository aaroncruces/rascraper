import {
  devid,
  devpassword,
  softname,
} from "../../../../configs/secret/screenscraper_dev_credentials";
import { aeromega_ss } from "./screenscraperObjectsReturned/aeromega";
import { aerosnes_ss } from "./screenscraperObjectsReturned/aerosnes";
import { mslug_ss } from "./screenscraperObjectsReturned/mslug";

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
];
