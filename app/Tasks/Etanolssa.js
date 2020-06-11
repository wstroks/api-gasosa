'use strict'

const Task = use('Task')
const fetch = require("node-fetch");
class Etanolssa extends Task {
  static get schedule () {
    return '45 10 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/etanolssa";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Etanol: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
  
}

module.exports = Etanolssa
