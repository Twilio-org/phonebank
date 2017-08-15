import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ScriptPage from '../../../../public/src/components/script/script';
import { fetchScript, fetchScriptQuestions } from '../../../../public/src/actions/script';

const mockStore = {
  script_id: 1,
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
    }
  ]
};

describe('<ScriptPage />', () => {
  const { script_id, script_info, questions } = mockStore;
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <ScriptPage
          script_id={script_id}
          script_info={script_info}
          questions={questions}
          fetchScript={fetchScript}
          fetchScriptQuestions={fetchScriptQuestions}
        />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('ScriptPage props and methods', () => {
  const props = {
    script_id: 1,
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
      }
    ],
    fetchScript,
    fetchScriptQuestions
  };
  const wrapper = shallow(<ScriptPage {...props} />).instance();
  describe('renderQuestions method', () => {
    it('should have a method named renderQuestions', () => {
      const { renderQuestions } = wrapper;
      expect(typeof renderQuestions).toBe('function');
    });
    it('should return questions properly', () => {
      const questions = wrapper.renderQuestions();
      expect(Array.isArray(questions)).toBe(true);
    });
  });
  describe('props', () => {
    describe('script_id prop', () => {
      it('should be defined', () => {
        expect(props.script_id).toBeDefined();
      });
      it('should have a value of 1', () => {
        expect(props.script_id).toBe(1);
      });
    });
    describe('script_info prop', () => {
      it('should be defined', () => {
        expect(props.script_info).toBeDefined();
      });
      it('should be an object', () => {
        expect(typeof props.script_info).toBe('object');
      });
      it('should have 3 properties - name, body, description', () => {
        const scriptInfoKeys = Object.keys(props.script_info);
        expect(scriptInfoKeys.length).toBe(3);
        expect(scriptInfoKeys).toContain('name');
        expect(scriptInfoKeys).toContain('body');
        expect(scriptInfoKeys).toContain('description');
      });
    });
    describe('questions prop', () => {
      const firstQuestion = props.questions[0];
      it('should be defined', () => {
        expect(props.questions).toBeDefined();
      });
      it('should be an array of 1-5 question objects', () => {
        expect(props.questions.length).toBeLessThanOrEqual(5);
        expect(props.questions.length).toBeGreaterThanOrEqual(1);
        expect(Array.isArray(props.questions)).toBe(true);
        expect(typeof firstQuestion).toBe('object');
      });
      it('should contain question objects that have 4 properties - title, description, type, and responses', () => {
        const firstQuestionKeys = Object.keys(firstQuestion);
        expect(firstQuestionKeys).toContain('title');
        expect(firstQuestionKeys).toContain('description');
        expect(firstQuestionKeys).toContain('type');
        expect(firstQuestionKeys).toContain('responses');
      });
    });
    describe('fetchScript prop', () => {
      it('should be defined', () => {
        expect(props.fetchScript).toBeDefined();
      });
      it('should be a function', () => {
        expect(typeof props.fetchScript).toBe('function');
      });
    });
    describe('fetchScriptQuestions prop', () => {
      it('should be defined', () => {
        expect(props.fetchScriptQuestions).toBeDefined();
      });
      it('should be a function', () => {
        expect(typeof props.fetchScriptQuestions).toBe('function');
      });
    });
  });
});
