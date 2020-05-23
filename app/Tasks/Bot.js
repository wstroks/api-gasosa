'use strict'
const fetch = require("node-fetch");
const Task = use('Task');
var array = ["https://api-gasosa.herokuapp.com/postos/gnv","https://api-gasosa.herokuapp.com/postos/etanol","https://api-gasosa.herokuapp.com/postos/diesel", "http://api-gasosa.herokuapp.com/postos/gasolina"];
var contador=0;
class Bot extends Task {
  static get schedule() {
    return '* */4 * * *'
  }
  
  async handle() {
    
    try {
      //var url ="https://api-gasosa.herokuapp.com/";
        if(contador==4){
          contador=0;
        }
        // HTTP GET request to the dyno's url
        fetch(array[contador]).then(() => console.log(`Combustiveis: ${array[contador]}.`));
        contador++;
    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${array[contador]}: ${err.message} Will try again in minutes...`);
    }
   // this.info('Task Bot handle')
  }
}

module.exports = Bot
