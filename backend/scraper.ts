module.exports = (parameters: { engine: any; filename: any; crc: any; }) => {
    const {
        engine,
        filename,
        crc
    } = parameters
    console.log(engine);
    if (engine == "screenscraper") {
        const screenscraper = require('./scraping_engines/screenscraper')
        const result = screenscraper('mslug.zip')
        console.log(result.then((data: any) => console.log(data)));
    }
}

