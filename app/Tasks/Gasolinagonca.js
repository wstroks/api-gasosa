'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Gasolinagonca extends Task {
  static get schedule () {
    return '3 5 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/gasolinagonca";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Gasolina: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
}

module.exports = Gasolinagonca
