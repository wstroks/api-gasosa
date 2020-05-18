'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Historico extends Model {
    postos_historico(){
        return this.belongsTo('App/Models/Posto');
    }
}

module.exports = Historico
