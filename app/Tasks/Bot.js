'use strict'
const fetch = require("node-fetch");
const Task = use('Task')

class Bot extends Task {
  static get schedule() {
    return '*/31 * * * *'
  }
  
  async handle() {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/json";

        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`URl Principal: ${url}.`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...`);
    }
   // this.info('Task Bot handle')
  }
}

module.exports = Bot
