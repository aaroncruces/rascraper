//var argv = require('minimist')(process.argv.slice(2))

import { createFolder } from "./backend/fileSystem";

//console.log(argv);
var scraper = require("./backend/scraper");
//scraper.scrapeRom({ engine: "screenscraper", filename: "mslug.zip" });
const testFolder = "./romsandbox";
//scraper.scrapeFolder(testFolder);

//createFolder(testFolder + "/created/");
const jest = require("jest");

const run = async () => {
  try {
    const jestOptions = {
      projects: [__dirname],
      silent: true,
    };
    const jestResult = await jest.runCLI(jestOptions, jestOptions.projects);
    console.log(jestResult);

    //if jest results ok. run rest of things
    if (true) {
    }
  } catch (error) {
    console.error("failure");
  }
};
run();
