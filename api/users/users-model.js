const db = require('../data/db-config');

async function getById(user_id) {
  return db('users').where({ user_id }).first();
}

async function getBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [user_id] = await db('users').insert(user);
  const newUser = await db('users').where({ user_id }).first();
  return newUser;
}

module.exports = {
  getById,
  getBy,
  add,
};
