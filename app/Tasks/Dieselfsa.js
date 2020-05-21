'use strict'

const Task = use('Task')
const fetch = require("node-fetch");
class Dieselfsa extends Task {
  static get schedule () {
    return '*/19 * * * *'
  }

  async handle () {
    try {
      var url ="http://api-gasosa.herokuapp.com/postos/diesel";

        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`Diesel: ${url}.`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...`);
    }

  }
}

module.exports = Dieselfsa
