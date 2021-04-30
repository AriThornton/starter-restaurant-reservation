const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

function update(table_id, reservation_id) {
  return knex("tables")
    .where("table_id", table_id)
    .update({ reservation_id: reservation_id, occupied: true })
    .returning("*");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

function destroy(table_id) {
  return knex("tables")
    .where("table_id", table_id)
    .update({ reservation_id: null, occupied: false })
    .returning("*");
}

module.exports = {
  list,
  create,
  update,
  read,
  destroy
};
