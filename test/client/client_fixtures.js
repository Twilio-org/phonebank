import { defaultScripts } from '../../public/src/reducers/admin_scripts';
import { defaultQuestions } from '../../public/src/reducers/admin_questions';
import { defaultCampaigns } from '../../public/src/reducers/campaign';
import { defaultContactLists } from '../../public/src/reducers/admin_contact_lists';

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
  },
  accountFixtures: {
    mapFixture: {
      first_name: 'Harry',
      last_name: 'Potter',
      email: 'goldensnitch@hogwarts.com',
      phone_number: '12224448888',
      is_admin: true
    }
  },
  tableHeaderFixtures: {
    campaigns: {
      headers: [['Name', 'name'], ['Title', 'title'], ['Description', 'description'], ['Status', 'status'], ['Script Id', 'script_id'], ['Contact List', 'contact_lists_id'], ['Date Created', 'created_at']],
      redirect_path: '/admin/campaigns/new'
    },
    scripts: {
      headers: [['Name', 'name'], ['Body', 'body'], ['Description', 'created_at'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
      redirect_path: '/admin/scripts/new'
    },
    questions: {
      headers: [['Title', 'title'], ['Description', 'description'], ['Type', 'type'], ['Response Options', 'responses'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
      redirect_path: '/admin/questions/new'
    }
  },
  buttonFixtures: [
    {
      key: 1,
      text: 'View',
      size: 'xsmall',
      style: 'primary',
      handler: jest.fn()
    },
    {
      key: 2,
      text: 'Edit',
      size: 'xsmall',
      style: 'danger',
      handler: jest.fn()
    }
  ],
  contactListFixtures: {
    defaultContactLists,
    listFixture: [
      {
        id: 1,
        name: 'ContactList1',
        created_at: '2017-08-15T21:35:30.321Z',
        updated_at: '2017-08-15T21:35:30.321Z'
      },
      {
        id: 2,
        name: 'ContactList2',
        created_at: '2017-08-15T21:35:30.321Z',
        updated_at: '2017-08-15T21:35:30.321Z'
      },
      {
        id: 3,
        name: 'ContactList3',
        created_at: '2017-08-15T21:35:30.321Z',
        updated_at: '2017-08-15T21:35:30.321Z'
      }
    ],
    mapFixture: {
      id: 8,
      name: 'ContactList8',
      created_at: '2017-08-15T21:35:30.321Z',
      updated_at: '2017-08-15T21:35:30.321Z'
    }
  },
  scriptViewFixtures: {
    scriptFixture: {
      id: 1,
      name: 'ScriptName',
      body: 'ScriptBody',
      description: 'ScriptDescription',
      created_at: '2017-08-11T21:36:45.366Z',
      updated_at: '2017-08-11T21:36:45.366Z'
    },
    current_script: {
      name: 'ScriptName',
      body: 'ScriptBody',
      description: 'ScriptDescription'
    },
    scriptQuestionsFixture: [
      {
        id: 4,
        title: 'Age',
        description: 'What is your age range?',
        type: 'singleselect',
        responses: '0-10,11-20,21-40,41-60,61+',
        created_at: '2017-08-11T21:36:45.387Z',
        updated_at: '2017-08-11T21:36:45.387Z',
        script_id: 1,
        question_id: 3,
        sequence_number: 1
      },
      {
        id: 5,
        title: 'Hobbies',
        description: 'What are your hobbies?',
        type: 'multiselect',
        responses: 'swimming,running,biking,sleeping,eating,weaving',
        created_at: '2017-08-11T21:36:45.398Z',
        updated_at: '2017-08-11T21:36:45.398Z',
        script_id: 1,
        question_id: 2,
        sequence_number: 2
      },
      {
        id: 6,
        title: 'Ice Cream',
        description: 'How do you feel about ice cream?',
        type: 'paragraph',
        responses: null,
        created_at: '2017-08-11T21:36:45.514Z',
        updated_at: '2017-08-11T21:36:45.514Z',
        script_id: 1,
        question_id: 1,
        sequence_number: 3
      }
    ]
  },
  usersFixture: {
    defaultUsers: {
      current_user: {},
      all_users: []
    },
    listFixture: [
      {
        id: 1,
        first_name: 'andi',
        last_name: 'oneto',
        phone_number: '1231231234',
        email: 'nene@aol.com',
        is_active: true,
        is_banned: false,
        is_admin: true,
        created_at: '2017-08-24T01:01:01.145Z',
        updated_at: '2017-08-25T22:01:10.202Z'
      },
      {
        id: 2,
        first_name: 'alyse',
        last_name: 'oneto',
        phone_number: '1231231234',
        email: 'nene@aol.com',
        is_active: false,
        is_banned: false,
        is_admin: false,
        created_at: '2017-08-24T01:01:01.145Z',
        updated_at: '2017-08-25T22:01:10.202Z'
      },
      {
        id: 3,
        first_name: 'william',
        last_name: 'oneto',
        phone_number: '1231231234',
        email: 'nene@aol.com',
        is_active: false,
        is_banned: true,
        is_admin: false,
        created_at: '2017-08-24T01:01:01.145Z',
        updated_at: '2017-08-25T22:01:10.202Z'
      }
    ],
    updatedListFixture: [
      {
        id: 1,
        first_name: 'andi',
        last_name: 'oneto',
        phone_number: '1231231234',
        email: 'nene@aol.com',
        is_active: false,
        is_banned: true,
        is_admin: false,
        created_at: '2017-08-24T01:01:01.145Z',
        updated_at: '2017-08-25T22:01:10.202Z'
      },
      {
        id: 2,
        first_name: 'alyse',
        last_name: 'oneto',
        phone_number: '1231231234',
        email: 'nene@aol.com',
        is_active: false,
        is_banned: false,
        is_admin: false,
        created_at: '2017-08-24T01:01:01.145Z',
        updated_at: '2017-08-25T22:01:10.202Z'
      },
      {
        id: 3,
        first_name: 'william',
        last_name: 'oneto',
        phone_number: '1231231234',
        email: 'nene@aol.com',
        is_active: false,
        is_banned: true,
        is_admin: false,
        created_at: '2017-08-24T01:01:01.145Z',
        updated_at: '2017-08-25T22:01:10.202Z'
      }
    ],
    mapFixture: {
      id: 1,
      first_name: 'andi',
      last_name: 'oneto',
      phone_number: '1231231234',
      email: 'nene@aol.com',
      is_active: true,
      is_banned: false,
      is_admin: true,
      created_at: '2017-08-24T01:01:01.145Z',
      updated_at: '2017-08-25T22:01:10.202Z'
    }
  },
  callsFixtures: {
    dbFixture: {
      id: 1,
      campaign_id: 1,
      contact_id: 1,
      user_id: 1,
      outcome: 'PENDING',
      status: 'ASSIGNED',
      call_started: null,
      call_ended: null,
      attempt_num: 1,
      notes: null,
      call_sid: null,
      created_at: '2017-08-15T21:35:30.321Z',
      updated_at: '2017-08-15T21:35:30.321Z'
    },
    initialState: {
      current_call: false,
      call_id: null,
      user_id: null,
      campaign_id: null,
      contact_id: null,
      status: undefined,
      outcome: undefined,
      call_ended: null,
      call_started: null,
      notes: null,
      current_call_contact_name: undefined,
      call_volunteer_active: false,
      no_calls_available: false
    },
    contactFixture: {
      id: 1,
      external_id: 123,
      first_name: 'craig',
      last_name: 'bella',
      email: 'horses@aol.com',
      phone_number: '+12345678901',
      is_invalid_number: false,
      do_not_call: false,
      created_at: '2017-08-24T01:01:01.145Z',
      updated_at: '2017-08-25T22:01:10.202Z'
    }
  }
};
