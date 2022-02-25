//var argv = require('minimist')(process.argv.slice(2))

import { createFolder } from "./backend/fileSystem";

//console.log(argv);
var scraper = require("./backend/scraper");
//scraper.scrapeRom({ engine: "screenscraper", filename: "mslug.zip" });
const testFolder = "./romsandbox";
scraper.scrapeFolder(testFolder);
