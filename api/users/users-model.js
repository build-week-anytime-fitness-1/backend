const db = require('../data/db-config')

async function getById(user_id){
    return db('users').where({user_id}).first()
}

async function getBy(filter){
    return db('users').where(filter);
}

module.exports = {
    getById,
    getBy
}