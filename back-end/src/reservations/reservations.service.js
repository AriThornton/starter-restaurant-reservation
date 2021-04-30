const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .whereNot("status", "finished")
    .andWhere("reservation_date", date)
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

function update(reservation_id, updatedReservation) {
  return knex("reservations")
    .where("reservation_id", reservation_id)
    .update(updatedReservation)
    .returning([
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "reservation_date",
      "reservation_time"
    ]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where("reservation_id", reservation_id)
    .update("status", status)
    .returning("status");
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where("reservation_id", reservation_id)
    .first();
}

function listByMobileNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  create,
  update,
  updateStatus,
  read,
  listByMobileNumber
};
