var db = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  debug: true
});

db.schema.createTableIfNotExists('users', function(table) {
    table.increments();
    table.string('email').notNullable().unique().index();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone_number').notNullable();
    table.string('password_hash').notNullable();
    table.boolean('is_admin').defaultTo(false);
    table.boolean('is_banned').defaultTo(false);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('date_created').defaultTo(db.fn.now());
    table.timestamp('date_updated').defaultTo(db.fn.now());
}).then(() => {
    console.log(('Created users table'));
});