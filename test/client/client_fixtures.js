import { defaultScripts } from '../../public/src/reducers/admin_scripts';
import { defaultQuestions } from '../../public/src/reducers/admin_questions';
import { defaultCampaigns } from '../../public/src/reducers/campaign';

export default {
  scriptFixtures: {
    defaultScripts,
    listFixture: [
      {
        id: 1,
        name: 'Script 1',
        description: 'test script 1',
        body: 'meow',
        created_at: '2017-08-15T21:35:30.321Z',
        updated_at: '2017-08-15T21:35:30.321Z'
      },
      {
        id: 2,
        name: 'Script 2',
        description: 'test script 2',
        body: 'meow',
        created_at: '2017-08-15T21:35:30.321Z',
        updated_at: '2017-08-15T21:35:30.321Z'
      },
      {
        id: 3,
        name: 'Script 3',
        description: 'test script 3',
        body: 'meow',
        created_at: '2017-08-15T21:35:30.321Z',
        updated_at: '2017-08-15T21:35:30.321Z'
      }
    ],
    mapFixture: {
      id: 7,
      name: 'Script 1',
      description: 'test script 1',
      body: 'meow',
      created_at: '2017-08-15T21:35:30.321Z',
      updated_at: '2017-08-15T21:35:30.321Z'
    }
  },
  questionFixtures: {
    defaultQuestions,
    listFixture: [
      {
        id: 4,
        title: 'Question',
        description: 'test question 1',
        type: 'singleselect',
        responses: 'no,yes,who cares,',
        created_at: '',
        updated_at: ''
      },
      {
        id: 3,
        title: 'Question 2',
        description: 'test question 2',
        type: 'paragraph',
        responses: '',
        created_at: '',
        updated_at: ''
      },
      {
        id: 2,
        title: 'Question 3',
        description: 'test question 3',
        type: 'multiselect',
        responses: 'meow,meow2',
        created_at: '',
        updated_at: ''
      },
      {
        id: 1,
        title: 'Question 4',
        description: 'test question 4',
        type: 'multiselect',
        responses: 'meow,meow',
        created_at: '',
        updated_at: ''
      }
    ],
    mapFixture: {
      id: 1,
      title: 'meow questions',
      description: 'meow',
      type: 'multiselect',
      responses: 'meow,meow',
      created_at: '',
      updated_at: ''
    }
  },
  campaignFixtures: {
    defaultCampaigns,
    listFixture: [
      {
        id: 1,
        name: 'Campaign 3',
        title: 'Campaign 3 Title',
        description: 'ice cream',
        status: 'active',
        contact_lists_id: 1,
        script_id: 1,
        updated_at: '4321',
        created_at: '1234'
      },
      {
        id: 2,
        name: 'Campaign 3',
        title: 'Campaign 3 Title',
        description: 'ice cream',
        status: 'active',
        contact_lists_id: 2,
        script_id: 2,
        updated_at: '4321',
        created_at: '1234'
      },
      {
        id: 3,
        name: 'Campaign 3',
        title: 'Campaign 3 Title',
        description: 'ice cream',
        status: 'active',
        contact_lists_id: 3,
        script_id: 3,
        updated_at: '4321',
        created_at: '1234'
      }
    ],
    mapFixture: {
      id: 3,
      name: 'Campaign 3',
      title: 'Campaign 3 Title',
      description: 'ice cream',
      status: 'active',
      contact_lists_id: 3,
      script_id: 3,
      updated_at: '4321',
      created_at: '1234'
    }
  }
};

