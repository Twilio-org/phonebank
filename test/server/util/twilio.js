import { expect, Should } from 'chai';
import chai from 'chai';
import rewire from 'rewire';
import Twilio from 'twilio';
import sinon from 'sinon';
import dotenv from 'dotenv';
import mockery from 'mockery';
import chaiAsPromised from 'chai-as-promised';
import cleanUp from '../bootstrap';
import twilioMock from './mock_twilio';
import callVolunteer from '../../../server/util/twilio';
// import callsService from '../../../server/db/services/calls';
import campaignsService from '../../../server/db/services/campaigns';
import contactListsService from '../../../server/db/services/contact_lists';
// import contactsService from '../../../server/db/services/contacts';
import scriptsService from '../../../server/db/services/scripts';
import usersService from '../../../server/db/services/users';
import { sayCallCompleted, sayHelloUser } from '../../../server/util/twilio';

describe('XML Generation', () => {
  const userFirstName = 'User';
  const campaignName = 'Pacific Northwest LGBTQ+ Survey'

  it('should return TwiML that uses the user\'s first name and the campaign\'s name in the start call template', () => {
    expect(sayHelloUser(userFirstName, campaignName)).to.equal(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.</Say><Play loop="0">http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3</Play></Response>`
    );
  });

  it('should return TwiML that matches the call bridge template.', () => {
    expect(sayCallCompleted()).to.equal(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Call completed. Please submit the form to continue.</Say><Play loop="0">http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3</Play></Response>'
    );
  });
});


dotenv.load();
chai.use(chaiAsPromised);

const should = Should();
// const twilioClient = new Twilio();
// const twilioClientMock = sinon.mock(twilioClient.calls);
// const expectation = twilioClientMock.expects('create');
// console.log('twilioClient at top of test is now: ', twilioClient);
// const callVolunteerRewire = rewire('../../../server/util/twilio');
// callVolunteerRewire.__set__('twilioClient', twilioClientMock);
// console.log('callVolunteerRewire.default is: ', callVolunteerRewire.default);
// console.log('type of callVolunteerRewire.default is: ', typeof callVolunteerRewire.default);

describe('Twilio Module Tests', function() {
  // before((done) => {
  //   // mockery.enable();
  //   // mockery.registerSubstitute('twilio', './mock_twilio');
  //   done();
  // });
  after((done) => {
    // mockery.disable();
    cleanUp(done);
  });
  describe('callVolunteer test', function() {
    before((done) => {
      // this.twilioClientMock = sinon.mock(twilioClient.calls);
      // const expectation = this.twilioClientMock.expects('create');
      // console.log('this.twilioClientMock is: ', twilioClientMock);
      // console.log('the expectation at the top of before is: ', expectation);

      this.contactListParam = {
        name: 'Millbrae Phone List 10'
      };

      this.campaignParams = {
        name: 'testCampaign7',
        title: 'Test7',
        description: 'election',
        status: 'active'
      };

      this.scriptParams = {
        name: 'Script Name 7',
        body: 'Script Body 7',
        description: 'Script Description 7'
      };

      this.contactSaveParams = {
        first_name: 'Katie',
        last_name: 'Smith',
        phone_number: '+11820020000',
        email: 'katie@gmail.com',
        external_id: 'test12345'
      };

      this.userSaveParams = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'hatch',
        phoneNumber: '+16032750521',
        email: 'John@gmail.com'
      };

      this.connectCampaignToUserParams = {};

      scriptsService.saveNewScript(this.scriptParams)
        .then((script) => {
          this.campaignParams.script_id = script.attributes.id;
          contactListsService.saveNewContactList(this.contactListParam)
            .then((contactList) => {
              this.campaignParams.contact_lists_id = contactList.attributes.id;
              campaignsService.saveNewCampaign(this.campaignParams)
                .then((campaign) => {
                  this.connectCampaignToUserParams.campaign_id = campaign.attributes.id;
                  usersService.saveNewUser(this.userSaveParams)
                  .then((user) => {
                    this.connectCampaignToUserParams.id = user.attributes.id;
                    usersService.addCampaignToUser(this.connectCampaignToUserParams)
                      .then(() => {
                        done();
                      });
                  });
                });
            });
        });
    });
    // afterEach((done) => {
    //   // this.twilioClientMock.restore();
    // });
    it('should call the function once', (done) => {
      // const expectation = sinon.expectation.create(callVolunteer);
      // const { user_id, campaign_id, phone_number } = this.volunteerInfo;
      const { id, campaign_id } = this.connectCampaignToUserParams;
      usersService.getUserById({ id })
        .then((volunteer) => {
          console.log('volunteer in callVolunteer test is: ', volunteer);
          const { phone_number } = volunteer.attributes;
          // const { id, campaign_id } = this.connectCampaignToUserParams;
          // const twilioSpy = sinon.spy(this.twilioClient.calls, 'create');
          callVolunteer(id, campaign_id, phone_number)
            .then((res) => {
              console.log('callVolunteer now res is: ', res);
              // expect(this.twilioClientMock.verify()).to.be.true;
              // expect(twilioSpy).to.be.fulfilled;
              done();
            })
            .catch((err) => {
              console.log('error in callVolunteer test is: ', err);
            });
        });
    });
  });
});

    // before(() => {

      // callVolunteer = sinon.spy();
      // userController.__set__('twilioClient', this.twilioClient);
    //   this.volunteerInfo = {
    //     user_id: 1,
    //     campaign_id: 1,
    //     phone_number: '+15555555555'
    //   };
    // });
    // afterEach(() => {
    //   this.revert();
    // });

 // callVolunteer(
      //   this.connectCampaignToUserParams.id,
      //   this.connectCampaignToUserParams.campaign_id,
      //   this.userSaveParams.phone_number)
      //   .then((res) => {
      //     console.log('callVolunteer res is: ', res);
      //     expect(twilioSpy).to.be.calledOnce;
          // expectation.withArgs(this.volunteerInfo.user_id,
          //   this.volunteerInfo.campaign_id,
          //   this.volunteerInfo.phone_number);
          // console.log('the expectation is: ', expectation);
          // expectation.once();
          // done();
        // });
        // .catch((err) => {
        //   console.log(err);
        // });

        // it('should something', sinon.test(function(){
    //   const twilioSpy = this.spy(this.twilioClient.calls, 'create');
    // }));
