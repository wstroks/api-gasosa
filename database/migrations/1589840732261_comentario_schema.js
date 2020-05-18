'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComentarioSchema extends Schema {
  up () {
    this.create('comentarios', (table) => {
      table.increments()
      table.string("descricao").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('comentarios')
  }
}

module.exports = ComentarioSchema
