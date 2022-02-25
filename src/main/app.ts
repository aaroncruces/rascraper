//console.log(argv);
var scraper = require("./backend/scraper");
//scraper.scrapeRom({ engine: "screenscraper", filename: "mslug.zip" });
const testFolder = "./romsandbox";
scraper.scrapeFolder(testFolder);
