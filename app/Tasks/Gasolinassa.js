'use strict'

const Task = use('Task')

class Gasolinassa extends Task {
  static get schedule () {
    return '8 19 * / 2 * *'
  }

  async handle () {
    try {
      var url ="https://api-gasosa.herokuapp.com/postos/gasolinassa";

        // HTTP GET request to the dyno's url
       fetch(url).then(() => console.log(`Gasolina: ${url}`));

    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${url}: ${err.message} Will try again in minutes...`);
    }
  }
}

module.exports = Gasolinassa
