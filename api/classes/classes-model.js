const db = require('../data/db-config')

function getClasses(){
    return db('classes')
}

function getClassById(class_id){
    return db('classes').where({ class_id }).first()
}

function getClassBy(filter){
    return db('classes').where(filter)
}

function addClass(newClass){
    return db('classes').insert(newClass, ['class_name'] )
}

function updateClass(class_id, changes){
    return db('classes').where({ class_id }).update(changes)
}

async function signupClass(class_id, user_id){
 await db('registration')
  .insert({ class_id, user_id })
  .returning('registration_id')

  const registeredUsers = await db('registration')
    .where({ class_id })
    .count()
    .first()
  await db('classes').where({ class_id }).update({
     registered_clients: registeredUsers.count
  })
  return db('classes')
    .where({ class_id })
    .select('class_name', 'registered_clients')
    .first()
}

function deleteClass(class_id){
    return db('classes').where({ class_id }).del()
}

module.exports = {
    getClasses,
    getClassById,
    getClassBy,
    addClass,
    updateClass,
    signupClass,
    deleteClass
}