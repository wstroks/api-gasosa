'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Gasolinaita extends Task {
  static get schedule () {
    return '55 5 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/gasolinaita";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Gasolina: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
}

module.exports = Gasolinaita
