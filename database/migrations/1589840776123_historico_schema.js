'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricoSchema extends Schema {
  up () {
    this.create('historicos', (table) => {
      table.increments()
      table.integer('posto_id').unsigned().references('id').inTable('postos').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('tipo').notNullable()
      table.string('valor').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('historicos')
  }
}

module.exports = HistoricoSchema
