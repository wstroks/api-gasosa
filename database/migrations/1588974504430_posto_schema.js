'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostoSchema extends Schema {
  up () {
    this.create('postos', (table) => {
      table.increments()
      table.string('nome').notNullable();
      table.string('endereco').notNullable();
      table.string('contato');
      table.string('status').notNullable();
      table.string('cidade').notNullable();
      table.string('latitude');
      table.string('longitude');
      table.string('url');
      table.string('bandeira');
      table.timestamps()
    })
  }

  down () {
    this.drop('postos')
  }
}

module.exports = PostoSchema
