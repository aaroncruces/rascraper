//var argv = require('minimist')(process.argv.slice(2))

import { createFolder } from "./backend/fileSystem";

//console.log(argv);
var scraper = require("./backend/scraper");
//scraper.scrapeRom({ engine: "screenscraper", filename: "mslug.zip" });
const testFolder = "./romsandbox";
//scraper.scrapeFolder(testFolder);

//createFolder(testFolder + "/created/");
const jest = require("jest");

const options = {
  projects: [__dirname],
  silent: true,
};

jest
  .runCLI(options, options.projects)
  .then((success: any) => {
    console.log(success);
  })
  .catch((failure: any) => {
    console.error("failure");
  });
