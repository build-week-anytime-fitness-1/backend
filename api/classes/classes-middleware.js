const Classes = require('./classes-model')

function validateClass(req, res, next) {
    const { class_name, type, instructor_id, time, date, duration, intensity, location, max_class_size } = req.body
    if(!class_name || !type || !instructor_id || !time || !date || !duration || !intensity || !location || !max_class_size){
        next({ status: 400, message: 'Missing required fields'})
    }else{
        next()
    }    
}




module.exports = {
    validateClass,

}



// .createTable('classes', (classes) => {
//     classes.increments('class_id');
//     classes.string('class_name', 200).notNullable();
//     classes.string('type', 200).notNullable();
//     classes
//       .integer('instructor_id')
//       .notNullable()
//       .unsigned()
//       .references('user_id')
//       .inTable('users')
//       .onDelete('RESTRICT')
//       .onUpdate('RESTRICT');
//     classes.time('time').notNullable();
//     classes.date('date');
//     classes.integer('duration').notNullable().unsigned();
//     classes.integer('intensity').notNullable().unsigned();
//     classes.string('location').notNullable();
//     classes.integer('max_class_size').notNullable().unsigned();
//     classes
//       .integer('registered_clients')
//       .notNullable()
//       .unsigned()
//       .defaultTo(0);
//   })