import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ScriptPage from '../../../../public/src/components/script/script';
import { fetchScript, fetchScriptQuestions } from '../../../../public/src/actions/script';

const props = {
  script_id: 1,
  script_info: {
    name: 'ScriptName',
    body: 'ScriptBody',
    description: 'ScriptDescription'
  },
  questions: [
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
  ],
  fetchScript,
  fetchScriptQuestions
};

describe('<ScriptPage />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <ScriptPage {...props} />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('ScriptPage props and methods', () => {
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
