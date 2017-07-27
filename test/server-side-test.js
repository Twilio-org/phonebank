import { test as testconfig } from '../knexfile';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import User from '../server/db/controllers/users';
import bookshelf from '../server/db/init';
import Model from '../server/db/models/users';
const knex = knexModule(testconfig);
const knexdb = bookshelfModule(knex).plugin(bookshelfBcrypt);
const usersModel = Model(knexdb);
const should = Should();



describe('Server-side tests', function() {

  before(function() {
    knexdb.knex.schema.hasTable('users').then((exist) => {
      if (!exist) {
        knexdb.knex.schema.createTable('users', function(table) {
          table.increments('id');
          table.string('email').notNullable().unique('email').index();
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
        }).catch((err) => {
          console.log(err);
        });
      }
    })
    
    return (
      User.saveNewUser({
        first_name: 'John',
        last_name: 'Doe',
        password: 'hatch',
        phone_number: '+14441114444',
        email: 'John@Doe.com' 
      }, usersModel) &&

      User.saveNewUser({
        first_name: 'Jane',
        last_name: 'Doe',
        password: 'hatch1',
        phone_number: '+14441114444',
        email: 'Jane@Jane.com' 
      }, usersModel)
    )
  });

  afterEach(function() {

  });

  after(function() {
     return knexdb.knex.schema.dropTable('users');
  });

  describe('Data retrieval', function() {

    it('should getUserByEmail if given an email - first_name', function(done) {
      User.getUserByEmail({ email: 'John@Doe.com'}, usersModel)
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('John');
          done();
        }, done);
    });
  })

  describe('Data update', function() {
    beforeEach(() => {
      this.userUpdateParams2 = {
        id: 2,
        first_name: 'Jane',
        last_name: 'Doe',
        password: 'hatch1',
        phone_number: '+14441114444',
        email: 'Jane@Doe.com'
      };

      this.userUpdateParams1 = {
        id: 1,
        first_name: 'John',
        last_name: 'Wilson',
        password: 'hatch1',
        phone_number: '+14441114444',
        email: 'John@Doe.com'
      };
    });

    it('should update user email by ID', (done) => {
      User.updateUserById(this.userUpdateParams2, usersModel)
        .then((user) => user.attributes.email)
          .then(email => { 
            expect(email).to.equal('Jane@Doe.com');
            done();
          });
    });

    it ('should update user last_name by ID', (done) => {
      User.updateUserById(this.userUpdateParams1, usersModel)
        .then((user) => user.attributes.last_name)
          .then((lastName) => {
            expect(lastName).to.equal('Wilson');
            done();
          });
    });
  })
})

