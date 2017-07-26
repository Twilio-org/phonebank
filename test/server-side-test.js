import {test as testdb} from '../knexfile';
import request from 'request';
import bookshelf_bcrypt from 'bookshelf-bcrypt';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import Users from '../server/db/controllers/users';
const knex = require('knex')(testdb);



describe('Server-side tests', function() {
  const bookshelf = require('bookshelf')(knex);
  bookshelf.plugin(bookshelf_bcrypt);
  const Users = bookshelf.Model.extend({
      tableName: 'users',
      bcrypt: {field: 'password_hash'},
      hasTimestamps: false
    })

  before(function() {
    bookshelf.knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id');
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

    return (
      new Users({
        first_name: 'Duy',
        last_name: 'Nguyen',
        password_hash: 'hatch',
        email: 'nguyenaiden@gmail.com',
        phone_number: '+14086428264'
      }).save() &&
      
      new Users({
        first_name: 'Andi',
        last_name: 'Oneto',
        password_hash: 'hatch1',
        email: 'andi@gmail.com',
        phone_number: '+14158287474'
      }).save()
    )
  });

  afterEach(function() {

  });

  after(function() {
    return bookshelf.knex.schema.dropTable('users');
  })

  describe('Data insertion', function() {

    it('should return correct first name given an email', function() {
      return new Users({email: 'nguyenaiden@gmail.com'}).fetch().then(function(model) {
        return expect(model.attributes.first_name).to.equal('Duy');
      });
    });

    it('should return correct last name given an email', function() {
      return new Users({email: 'andi@gmail.com'}).fetch().then(function(model) {
        return expect(model.attributes.last_name).to.equal('Oneto');
      });
    })

  })

})

