'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PdfSchema extends Schema {
  up () {
    this.create('pdfs', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('pdfs')
  }
}

module.exports = PdfSchema
