//var argv = require('minimist')(process.argv.slice(2))

import { createFolder } from "./backend/frontends/genericFunctions";

//console.log(argv);
var scraper = require("./backend/scraper");
//scraper.scrapeRom({ engine: "screenscraper", filename: "mslug.zip" });
const testFolder = "./tests";
//scraper.scrapeFolder(testFolder);

createFolder(testFolder + "/created/");
