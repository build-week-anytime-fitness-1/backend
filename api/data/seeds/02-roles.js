const roles = [{ role_name: "Instructor" }, { role_name: "Client" }];

exports.roles = roles;

exports.seed = function (knex) {
  return knex("roles").insert(roles);
};