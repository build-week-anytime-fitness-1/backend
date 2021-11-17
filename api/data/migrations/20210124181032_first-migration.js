exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id');
      roles.string('role_name').notNullable().unique();
    })
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('first_name').notNullable();
      users.string('last_name').notNullable();
      users.string('email').notNullable().unique()
      users.string('username', 200).notNullable().unique();
      users.string('password', 200).notNullable();
      users
        .integer('role')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .defaultTo(2)
    })
      .createTable('classes', (classes) => {
      classes.increments('class_id');
      classes.string('class_name', 200).notNullable();
      classes.string('type', 200).notNullable();
      classes
        .integer('instructor_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      classes.time('time').notNullable();
      classes.date('date');
      classes.integer('duration').notNullable().unsigned();
      classes.integer('intensity').notNullable().unsigned();
      classes.string('location').notNullable();
      classes.integer('max_class_size').notNullable().unsigned();
      classes
        .integer('registered_clients')
        .notNullable()
        .unsigned()
    })
    .createTable('registration', (registration) => {
      registration.increments('registration_id');
      registration
        .integer('user_id') 
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      registration
        .integer('class_id')
        .notNullable()
        .unsigned()
        .references('class_id')
        .inTable('classes')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('registration');
  await knex.schema.dropTableIfExists('classes');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('roles')
};
