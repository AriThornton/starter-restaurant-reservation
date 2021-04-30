const knex = require('../db/connection')

const create = (newTable) => knex('tables').insert(newTable).returning('*')

const read = (tableId) =>
  knex('tables').select('*').where({ table_id: tableId }).first()

const list = () => knex('tables').select('*').orderBy('table_name')

module.exports = {
  create,
  read,
  list,
}
