
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table) {
      table.increments();
      table.string('email').notNullable().unique().index();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('phone_number').notNullable();
      table.string('password_hash').notNullable();
      table.boolean('is_admin').defaultTo(false);
      table.boolean('is_banned').defaultTo(false);
      table.boolean('is_active').defaultTo(true);
      table.timestamp('date_created').defaultTo(knex.fn.now());
      table.timestamp('date_updated').defaultTo(knex.fn.now());
  }).then(() => {
      console.log(('Created users table'));
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
