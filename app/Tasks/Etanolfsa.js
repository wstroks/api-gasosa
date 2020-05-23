'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Etanolfsa extends Task {
  static get schedule () {
    return '20 */12 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/etanol";

        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`Etanol: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...`);
    }
  }
}

module.exports = Etanolfsa
