'use strict'

const Task = use('Task')
const fetch = require("node-fetch");
class Dieselberimbau extends Task {
  static get schedule () {
    return '4 3 * * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/dieselberimbau";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Diesel: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
}

module.exports = Dieselberimbau
