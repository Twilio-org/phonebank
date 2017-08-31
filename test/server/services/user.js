import { expect, Should } from 'chai';
import cleanUp from '../bootstrap';
import bcrypt from 'bcrypt';
import User from '../../../server/db/services/users';
import Campaign from '../../../server/db/services/campaigns';
import ContactList from '../../../server/db/services/contact_lists';
import Script from '../../../server/db/services/scripts';

const should = Should();

describe('User service tests', function() {
  after((done) => {
    cleanUp(done);
  });
  describe('Data insertion', function() {
    before(() => {
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
      User.saveNewUser(this.userSaveParams1)
        .then((user) => {
          this.userSaveParams1.id = user.attributes.id;
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Doe');
          done();
        }, done);
    });

    it('should hash first user\'s password', (done) => {
      User.getUserById({ id: this.userSaveParams1.id })
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('hatch', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        });
    });

    it('should be able to save second user\'s first name and last name', (done) => {
      User.saveNewUser(this.userSaveParams2)
        .then((user) => {
          this.userSaveParams2.id = user.attributes.id;
          expect(user.attributes.first_name).to.equal('Jane');
          expect(user.attributes.last_name).to.equal('Doe');
          done();
        }, done);
    });

    it('should hash second user\'s password', (done) => {
      User.getUserById({ id: this.userSaveParams2.id })
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
    before(() => {
      this.userRetrieveParam1 = {};
      this.userRetrieveParam2 = {};
    })
    it('should retrieve first user\'s first name, last name, and account status by email', (done) => {
      User.getUserByEmail({ email: 'John@gmail.com' })
        .then((user) => {
          this.userRetrieveParam1.id = user.attributes.id;
          should.exist(user);
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.equal(true);
          done();
        }, done);
    });

    it('should retrieve second user\'s first name, last name, and account status by email', (done) => {
      User.getUserByEmail({ email: 'Jane@gmail.com' })
        .then((user) => {
          this.userRetrieveParam2.id = user.attributes.id;
          should.exist(user);
          expect(user.attributes.first_name).to.equal('Jane');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.equal(true);
          done();
        }, done);
    });

    it('should retrieve first user\'s first name, last name, and account status by ID', (done) => {
      User.getUserById({ id: this.userRetrieveParam1.id })
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.be.true;
          done();
        }, done);
    });

    it('should retrieve second user\'s first name, last name, and account status by ID', (done) => {
      User.getUserById({ id: this.userRetrieveParam2.id })
        .then((user) => {
          should.exist(user);
          expect(user.attributes.first_name).to.equal('Jane');
          expect(user.attributes.last_name).to.equal('Doe');
          expect(user.attributes.is_active).to.be.true;
          done();
        }, done);
    });
    it('should retrieve all users', (done) => {
      User.getAllUsers()
        .then((users) => {
          const { models } = users;
          const [entry1, entry2] = models;
          expect(models.length).to.equal(2);
          expect(entry1.attributes.first_name).to.equal('John');
          expect(entry1.attributes.last_name).to.equal('Doe');
          expect(entry2.attributes.first_name).to.equal('Jane');
          expect(entry2.attributes.last_name).to.equal('Doe');
          done();
        }, done);
    });
  });

  describe('Campaign User association', function() {
    before((done) => {
      this.userSaveParam = {
        firstName: 'Jack',
        lastName: 'J',
        password: 'hatch1',
        phoneNumber: '+144411144442',
        email: 'Jack@gmail.com'
      };

      this.contactListParam = {
        name: 'Millbrae Phone List 3'
      };

      this.campaignParams = {
        name: 'testCampaign4',
        title: 'Test4',
        description: 'election',
        status: 'draft'
      };

      this.scriptParams = {
        name: 'Script Name 4',
        body: 'Script Body 4',
        description: 'Script Description 4'
      };

      this.campaignUserParam = {};

      User.saveNewUser(this.userSaveParam)
        .then((user) => {
          this.campaignUserParam.id = user.attributes.id;
          Script.saveNewScript(this.scriptParams)
            .then((script) => {
              this.campaignParams.script_id = script.attributes.id;
              ContactList.saveNewContactList(this.contactListParam)
                .then((contactList) => {
                  this.campaignParams.contact_lists_id = contactList.attributes.id;
                  Campaign.saveNewCampaign(this.campaignParams)
                    .then((campaign) => {
                      this.campaignUserParam.campaign_id = campaign.attributes.id;
                      done();
                    });
                });
            });
        });
    });


    it('should add Campaign User association', (done) => {
      User.addCampaignToUser(this.campaignUserParam)
        .then((campaignUser) => {
          expect(campaignUser.models[0].attributes.user_id).to.equal(this.campaignUserParam.id);
          expect(campaignUser.models[0].attributes.campaign_id).to.equal(this.campaignUserParam.campaign_id);
          done();
        }, done);
    });

    it('should return Campaigns associated with a given user id', (done) => {
      User.getUserCampaigns(this.campaignUserParam)
        .then(campaigns => {
          const firstReturnedCampaign = campaigns.models[0];
          const attributeNames = Object.keys(firstReturnedCampaign.attributes);
          expect(campaigns.models.length).to.equal(1);
          expect(attributeNames.includes('script_id')).to.equal(true);
          expect(attributeNames.includes('contact_lists_id')).to.equal(true);
          expect(attributeNames.includes('status')).to.equal(true);
          expect(attributeNames.includes('name')).to.equal(true);
          expect(attributeNames.includes('title')).to.equal(true);
          expect(attributeNames.includes('description')).to.equal(true);
          expect(firstReturnedCampaign._previousAttributes._pivot_user_id).to.equal(this.campaignUserParam.id);
          expect(firstReturnedCampaign._previousAttributes._pivot_campaign_id).to.equal(this.campaignUserParam.campaign_id);
          done();
        }, done);
    });
  });

  describe('Data update', function() {
    before(() => {
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

      this.userManageParams1 = {
        id: 1,
        isAdmin: true,
        isActive: false,
        isBanned: true
      };

      this.userManageParams2 = {
        id: 2,
        isBanned: true
      };
    });


    it('should update first user\'s email by ID', (done) => {
      User.updateUserById(this.userUpdateParams1)
        .then(user => user.attributes.last_name)
        .then((lastName) => {
          expect(lastName).to.equal('Wilson');
          done();
        }, done);
    });

    it('should update second user\'s email by ID', (done) => {
      User.updateUserById(this.userUpdateParams2)
        .then(user => user.attributes.email)
        .then((email) => {
          expect(email).to.equal('Jane@yahoo.com');
          done();
        }, done);
    });

    it('should rehash first user\'s password upon update by ID', (done) => {
      User.getUserById({ id: 1 })
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('bigowl', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        });
    });

    it('should rehash second user\'s password upon update by ID', (done) => {
      User.getUserById({ id: 2 })
        .then(user => user.attributes.password_hash)
        .then((passwordHash) => {
          bcrypt.compare('smallowl', passwordHash, (err, match) => {
            expect(match).to.be.true;
            done();
          });
        }, done);
    });

    it('should deactivate first user\'s account by ID', (done) => {
      User.deactivateUserById({ id: 1 })
        .then(user => user.attributes.is_active)
        .then((status) => {
          expect(status).to.be.false;
          done();
        }, done);
    });

    it('should deactivate second user\'s account by ID', (done) => {
      User.deactivateUserById({ id: 2 })
        .then(user => user.attributes.is_active)
        .then((status) => {
          expect(status).to.be.false;
          done();
        }, done);
    });
    it('should promote user to admin, deactivate, and ban user by ID', (done) => {
      User.updateUserById(this.userManageParams1)
        .then((user) => {
          expect(user.attributes.is_admin).to.equal(true);
          expect(user.attributes.is_active).to.equal(false);
          expect(user.attributes.is_banned).to.equal(true);
          done();
        }, done);
    });

    it('updating user statuses should not change other attributes', (done) => {
      User.getUserById({ id: 1 })
        .then((user) => {
          expect(user.attributes.first_name).to.equal('John');
          expect(user.attributes.last_name).to.equal('Wilson');
          done();
        }, done);
    });
    it('should be able to only promote or ban user by ID', (done) => {
      User.updateUserById(this.userManageParams2)
        .then((user) => {
          expect(user.attributes.is_banned).to.equal(true);
          done();
        }, done);
    });
    it('updating 1 or 2 of 3 status should leave the previous ones in tact', (done) => {
      User.getUserById({ id: 2 })
        .then((user) => {
          expect(user.attributes.is_admin).to.equal(false);
          done();
        }, done);
    });
    it('should automatically deactive user if banned', (done) => {
      User.getUserById({ id: 2 })
        .then((user) => {
          expect(user.attributes.is_active).to.equal(false);
          done();
        }, done);
    });
  });
});
