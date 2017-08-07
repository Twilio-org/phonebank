import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import bcrypt from 'bcrypt';
import { expect, Should } from 'chai';
import { test as testconfig } from '../../../knexfile';
import User from '../../../server/db/services/users';
import Model from '../../../server/db/models/users';

const knex = knexModule(testconfig);
const knexdb = bookshelfModule(knex).plugin(bookshelfBcrypt);
const usersModel = Model(knexdb);
const should = Should();

describe('User service tests', () => {
  before(() => {
    knexdb.knex.schema.hasTable('users').then((exist) => {
      if (!exist) {
        knexdb.knex.schema.createTable('users', (table) => {
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
    });
  });

  after(() => {
    return knexdb.knex.schema.dropTable('users');
  });

  describe('Data insertion', function() {
    beforeEach(() => {
      this.userSaveParams1 = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'hatch',
        phoneNumber: '+14441114444',
        email: 'John@gmail.com'
      };

      this.userSaveParams2 = {
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'hatch1',
        phoneNumber: '+14441114444',
        email: 'Jane@gmail.com'
      };
    });

    it('should be able to save first user\'s first name and last name', (done) => {
      User.saveNewUser(this.userSaveParams1, usersModel)
        .then((user) => {
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Doe');
          done();
        }, done);
    });

    it('should hash first user\'s password', (done) => {
      User.getUserByEmail({ email: 'John@gmail.com' }, usersModel)
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('hatch', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        });
    });

    it('should be able to save second user\'s first name and last name', (done) => {
      User.saveNewUser(this.userSaveParams2, usersModel)
        .then((user) => {
          expect(user.attributes.first_name).to.equal('Jane');
          expect(user.attributes.last_name).to.equal('Doe');
          done();
        }, done);
    });

    it('should hash second user\'s password', (done) => {
      User.getUserByEmail({ email: 'Jane@gmail.com' }, usersModel)
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('hatch1', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        });
    });
  });

  describe('Data retrieval', function() {
    it('should retrieve first user\'s first name, last name, and account status by email', (done) => {
      User.getUserByEmail({ email: 'John@gmail.com'}, usersModel)
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.equal(true);
          done();
        }, done);
    });

    it('should retrieve second user\'s first name, last name, and account status by email', (done) => {
      User.getUserByEmail({ email: 'Jane@gmail.com'}, usersModel)
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('Jane');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.equal(true);
          done();
        }, done);
    });

    it('should retrieve first user\'s first name, last name, and account status by ID', (done) => {
      User.getUserById({ id: 1 }, usersModel)
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.be.true;
          done();
        }, done);
    });

    it('should retrieve second user\'s first name, last name, and account status by ID', (done) => {
      User.getUserById({ id: 2 }, usersModel)
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('Jane');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.be.true;
          done();
        }, done);
    });
  });

  describe('Data update', function() {
    beforeEach(() => {
      this.userUpdateParams2 = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'smallowl',
        phoneNumber: '+14441114444',
        email: 'Jane@yahoo.com'
      };

      this.userUpdateParams1 = {
        id: 1,
        firstName: 'John',
        lastName: 'Wilson',
        password: 'bigowl',
        phoneNumber: '+14441114444',
        email: 'John@yahoo.com'
      };
    });


    it('should update first user\'s email by ID', (done) => {
      User.updateUserById(this.userUpdateParams1, usersModel)
        .then(user => user.attributes.last_name)
        .then((lastName) => {
          expect(lastName).to.equal('Wilson');
          done();
        }, done);
    });

    it('should update second user\'s email by ID', (done) => {
      User.updateUserById(this.userUpdateParams2, usersModel)
        .then(user => user.attributes.email)
        .then((email) => {
          expect(email).to.equal('Jane@yahoo.com');
          done();
        }, done);
    });

    it('should rehash first user\'s password upon update by ID', (done) => {
      User.getUserById({ id: 1 }, usersModel)
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('bigowl', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        });
    });

    it('should rehash second user\'s password upon update by ID', (done) => {
      User.getUserById({ id: 2 }, usersModel)
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('smallowl', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        }, done);
    });

    it('should deactivate first user\'s account by ID', (done) => {
      User.deactivateUserById({ id: 1 }, usersModel)
        .then(user => user.attributes.is_active)
        .then((status) => {
          expect(status).to.be.false;
          done();
        }, done);
    });

    it('should deactivate second user\'s account by ID', (done) => {
      User.deactivateUserById({ id: 2 }, usersModel)
        .then(user => user.attributes.is_active)
        .then((status) => {
          expect(status).to.be.false;
          done();
        }, done);
    });
  });
});
