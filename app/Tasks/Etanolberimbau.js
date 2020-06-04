'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Etanolberimbau extends Task {
  static get schedule () {
    return '12 3 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/etanolberimbau";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Etanol: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
}

module.exports = Etanolberimbau
