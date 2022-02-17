//var argv = require('minimist')(process.argv.slice(2))
//console.log(argv);
var scraper = require("./backend/scraper");
//scraper.scrapeRom({ engine: "screenscraper", filename: "mslug.zip" });
const testFolder = "./tests/";
scraper.getRomList(testFolder);
