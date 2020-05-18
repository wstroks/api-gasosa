'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Posto extends Model {
    combustiveis(){
        return this.hasMany('App/Models/Combustivel');
    }
    historicos(){
        return this.hasMany('App/Models/Historico');
    }
}

module.exports = Posto
