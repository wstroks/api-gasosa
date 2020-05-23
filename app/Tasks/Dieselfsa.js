'use strict'

const Task = use('Task')
const fetch = require("node-fetch");
class Dieselfsa extends Task {
  static get schedule () {
    return '*/30 * * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`URL: ${url}.`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }

  }
}

module.exports = Dieselfsa
