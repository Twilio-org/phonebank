import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ScriptPage from '../../../public/src/components/script';

// jest.mock('../../../public/src/actions', () => jest.fn());

const mockStore = {
  script_info: {
    name: 'ScriptName',
    body: 'ScriptBody',
    description: 'ScriptDescription'
  },
  questions: [
    {
      title: 'Age',
      description: 'What is your age?',
      type: 'singleselect',
      responses: '0-10,11-20,21-30,31-40,41-50,51-60,61+'
    },
    {
      title: 'Hobbies',
      description: 'What are your hobbies?',
      type: 'multiselect',
      responses: 'swimming,running,biking,sleeping,eating,weaving'
    },
    {
      title: 'Ice Cream',
      description: 'How do you feel about ice cream?',
      type: 'paragraph'
    }]
};

describe('<ScriptPage />', () => {
  const { script_info, questions } = mockStore;
  const wrapper = mount(
    <MemoryRouter>
      <ScriptPage
        script_info={script_info}
        questions={questions}
      />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
