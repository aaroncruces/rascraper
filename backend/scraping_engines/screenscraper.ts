const axios = require('axios')
/*
module.exports=axios.get('https://api.github.com/users/mapbox')
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
*/
//https://www.screenscraper.fr/api2/jeuInfos.php?devid=aaroncio&devpassword=j5OdeaTg5JF&softname=rascraper&output=json&romtype=rom&romnom=mslug.zip

const {
    devid,
    devpassword
} = require('./../../configs/screenscraper_dev_credentials')
const softname = "rascraper"

const scrape = (filename: any) => {

    const sourceurl = `https://www.screenscraper.fr/api2/jeuInfos.php?devid=${devid}&devpassword=${devpassword}&softname=rascraper&output=json&romtype=rom&romnom=${filename}`

    return axios.get(sourceurl)
        .then((response: { data: { response: any } }) => {
            return response.data.response
            
        })
}


module.exports = scrape;