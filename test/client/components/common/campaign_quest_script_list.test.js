import React from 'react';
import { mount, shallow } from 'enzyme';

import CampaignList from '../../../../public/src/components/campaign/campaign_list';
import QuestionList from '../../../../public/src/components/question/question_list';
import ScriptsList from '../../../../public/src/components/script/script_list';
import ContactLists from '../../../../public/src/components/contactlist/contactlist_list';
import UsersList from '../../../../public/src/components/users/users_list';

import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers';

const { listFixture: campaignListFixtures } = fixtures.campaignFixtures;
const { listFixture: questionListFixtures } = fixtures.questionFixtures;
const { listFixture: scriptListFixtures } = fixtures.scriptFixtures;
const { listFixture: contactListFixtures } = fixtures.contactListFixtures;
const { listFixture: userListFixtures } = fixtures.usersFixture;
const { mapFixture: account_info } = fixtures.accountFixtures;

describe('Component testing for CampaignList, QuestionList, Script List, Contact Lists, and Users List: ', () => {
  describe('<CampaignList /> component testing: ', () => {
    const props = {
      all_campaigns: campaignListFixtures,
      account_info,
      history: {
        goBack: jest.fn(),
        push: jest.fn()
      },
      fetchCampaigns: jest.fn(),
      setCurrentCampaign: jest.fn()
    };
    const expectedProps = Object.keys(props);

    describe('Component rendering: ', () => {
      const wrapper = shallow(<CampaignList {...props} />);

      it('should have one div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have one <TableListView /> element: ', () => {
        const numberOfTableListViewElements = wrapper.find('TableListView').length;
        expect(numberOfTableListViewElements).toBe(1);
      });
    });

    describe('Campaign expected props: ', () => {
      const wrapper = shallow(<CampaignList {...props} />).instance();

      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });

    describe('Methods were called: ', () => {
      const wrapper = mount(<CampaignList {...props} />).instance();
      const { fetchCampaigns } = wrapper.props;
      const fetchCampaignsCall = fetchCampaigns.mock.calls;
      expect(fetchCampaignsCall.length).toBe(1);
      expect(fetchCampaignsCall[0].length).toBe(1);
    });
  });

  describe('<QuestionList /> component testing: ', () => {
    const props = {
      all_questions: questionListFixtures,
      account_info,
      history: {
        goBack: jest.fn(),
        push: jest.fn()
      },
      fetchAllQuestions: jest.fn(),
      setCurrentQuestion: jest.fn()
    };
    const expectedProps = Object.keys(props);
    describe('Component rendering: ', () => {
      const wrapper = shallow(<QuestionList {...props} />);
      it('should have one div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have one <TableListView /> element: ', () => {
        const numberOfTableListViewElements = wrapper.find('TableListView').length;
        expect(numberOfTableListViewElements).toBe(1);
      });
    });
    describe('Question expected props: ', () => {
      const wrapper = shallow(<QuestionList {...props} />).instance();
      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });

    describe('Methods were called: ', () => {
      const wrapper = mount(<QuestionList {...props} />).instance();
      const { fetchAllQuestions } = wrapper.props;
      const fetchQuestionsCall = fetchAllQuestions.mock.calls;
      expect(fetchQuestionsCall.length).toBe(1);
      expect(!fetchQuestionsCall[0].length).toBe(true);
    });
  });

  describe('<ScriptList /> component testing: ', () => {
    const props = {
      all_scripts: scriptListFixtures,
      account_info,
      history: {
        goBack: jest.fn(),
        push: jest.fn()
      },
      fetchAllScripts: jest.fn(),
      setCurrentScript: jest.fn()
    };
    const expectedProps = Object.keys(props);
    describe('Component rendering: ', () => {
      const wrapper = shallow(<ScriptsList {...props} />);
      it('should have one div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have one <TableListView /> element: ', () => {
        const numberOfTableListViewElements = wrapper.find('TableListView').length;
        expect(numberOfTableListViewElements).toBe(1);
      });
    });
    describe('Question expected props: ', () => {
      const wrapper = shallow(<ScriptsList {...props} />).instance();
      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });

    describe('Methods were called: ', () => {
      const wrapper = mount(<ScriptsList {...props} />).instance();
      const { fetchAllScripts } = wrapper.props;
      const fetchScriptsCall = fetchAllScripts.mock.calls;
      expect(fetchScriptsCall.length).toBe(1);
      expect(!fetchScriptsCall[0].length).toBe(true);
    });
  });

  describe('<ContactLists />', () => {
    const props = {
      fetchAllContactLists: jest.fn(),
      all_contact_lists: contactListFixtures,
      account_info,
      history: {},
      setCurrentContactList: jest.fn()
    };
    const expectedProps = Object.keys(props);
    describe('Component rendering: ', () => {
      const wrapper = shallow(<ContactLists {...props} />);
      it('should have one div element: ', () => {
        expect(wrapper.find('div').length).toBe(1);
      });
      it('should have one <TableListView /> element: ', () => {
        const numberOfTableListViewElements = wrapper.find('TableListView').length;
        expect(numberOfTableListViewElements).toBe(1);
      });
    });
    describe('Contact List expected props: ', () => {
      const wrapper = shallow(<ContactLists {...props} />).instance();
      it('should have all of the expected props: ', () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });

    describe('Methods were called: ', () => {
      const wrapper = mount(<ContactLists {...props} />).instance();
      const { fetchAllContactLists } = wrapper.props;
      const fetchContactListCall = fetchAllContactLists.mock.calls;
      expect(fetchContactListCall.length).toBe(1);
      expect(!fetchContactListCall[0].length).toBe(true);
    });
  });

  describe('<UsersList /> component testing: ', () => {
    const props = {
      all_users: userListFixtures,
      account_info,
      history: {
        goBack: jest.fn(),
        push: jest.fn()
      },
      fetchAllUsers: jest.fn(),
      setCurrentUser: jest.fn(),
      adminUpdateUserInfo: jest.fn(),
      auth: {
        id: 1
      }


    };
    const expectedProps = Object.keys(props);
    describe('Component rendering: ', () => {
      const wrapper = shallow(<UsersList {...props} />);
      it('should have one div element: ', () => {
        const numberOfDivElements = wrapper.find('div').length;
        expect(numberOfDivElements).toBe(1);
      });
      it('should have one <TableListView /> element: ', () => {
        const numberOfTableListViewElements = wrapper.find('TableListView').length;
        expect(numberOfTableListViewElements).toBe(1);
      });
    });
    describe('Users expected props: ', () => {
      const wrapper = shallow(<UsersList {...props} />).instance();
      it(`should have all of the expected props: ${expectedProps.join(', ')}`, () => {
        const actualProps = wrapper.props;
        expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
      });
    });

    describe('Methods were called: ', () => {
      const wrapper = mount(<UsersList {...props} />).instance();
      const { fetchAllUsers } = wrapper.props;
      const fetchUsersCall = fetchAllUsers.mock.calls;
      expect(fetchUsersCall.length).toBe(1);
      expect(!!fetchUsersCall[0].length).toBe(true);
    });
  });
});
