'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Combustivel extends Model {
    postos(){
        return this.belongsTo('App/Models/Posto');
    }
}

module.exports = Combustivel
