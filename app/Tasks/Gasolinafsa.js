'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Gasolinafsa extends Task {
  static get schedule () {
    return '*/24 * * * *'
  }

  async handle () {
    try {
      var url ="http://api-gasosa.herokuapp.com/postos/gasolina";

        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`Gasolina: ${url}.`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...`);
    }
  }
}

module.exports = Gasolinafsa
