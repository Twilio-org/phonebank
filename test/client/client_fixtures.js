import { defaultScripts } from '../../public/src/reducers/admin_scripts';

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
  questionFixtures: {},
  campaignFixtures: {}
};

