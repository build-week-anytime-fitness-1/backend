const db = require('../data/db-config');

async function getById(user_id) {
  return db('users').where({ user_id }).first();
}

async function getBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const newUser = await db('users').insert(user, ['user_id','username', 'password', 'role']);
   return newUser
}

async function getRoles(){
return db('roles')
}

module.exports = {
  getById,
  getBy,
  add,
  getRoles
};
