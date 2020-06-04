'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Etanolsanti extends Task {
  static get schedule () {
    return '40 3 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/etanolsantis";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Etanol: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
}

module.exports = Etanolsanti
