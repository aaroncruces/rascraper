//var argv = require('minimist')(process.argv.slice(2))
//console.log(argv);
var scraper = require('./backend/scraper');
scraper({ engine: "screenscraper", filename: "mslug.zip" });
