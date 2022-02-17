import { Assets } from "./scraping_engines/assets";
const fs = require("fs");

const romExtensions = ["zip"];

const getRomList = (romFolder: string) => {
  fs.promises
    .readdir(process.cwd())
    .then((filenames: any) => {
      for (let filename of filenames) {
        //fs.promises.stat(filename);
      }
    })
    .catch((err: any) => {
      console.error(err);
    });
};

const scrapeRom = (parameters: { engine: any; filename: any; crc: any }) => {
  const { engine, filename, crc } = parameters;
  if (engine == "screenscraper") {
    const scrapingEngine = require("./scraping_engines/screenscraper");
    const result = scrapingEngine(filename);
    return result;
  }
};
module.exports = {
  scrapeRom,
  getRomList,
};
