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

function deleteClass(class_id){
    return db('classes').where({ class_id }).del()
}

module.exports = {
    getClasses,
    getClassById,
    getClassBy,
    addClass,
    updateClass,
    deleteClass
}