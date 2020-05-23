'use strict'
const fetch = require("node-fetch");
const Task = use('Task');
var array = ["https://api-gasosa.herokuapp.com/postos/gnv","https://api-gasosa.herokuapp.com/postos/etanol","https://api-gasosa.herokuapp.com/postos/diesel", "http://api-gasosa.herokuapp.com/postos/gasolina"];
var contador=0;
class Bot extends Task {
  static get schedule() {
    return '0 * */6 * * *'
  }
  
  async handle() {
    
    try {
      //var url ="https://api-gasosa.herokuapp.com/";
        
        // HTTP GET request to the dyno's url
        fetch(array[contador]).then(() => console.log(`Combustiveis: ${array[contador]}, ${contador}`));
        contador++;
        if(contador==4){
          contador=0;
        }
    }
    catch (err) { // catch fetch errors
      console.log(`Error fetching ${array[contador]}: ${err.message} Will try again in minutes...`);
    }
   // this.info('Task Bot handle')
  }
}

module.exports = Bot
