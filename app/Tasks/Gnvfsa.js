'use strict'

const Task = use('Task')
const fetch = require("node-fetch");

class Gnvfsa extends Task {
  static get schedule () {
    return '1 */12 * * *'
  }
  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/gnv";

        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`Gnv: ${url}.`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...`);
    }
  }
}

module.exports = Gnvfsa
