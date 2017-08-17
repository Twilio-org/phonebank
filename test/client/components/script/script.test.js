import React from 'react';
import { shallow } from 'enzyme';
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

function checkObjectProps(expectedProps, obj) {
  return expectedProps.reduce((accum, curr) => {
    const propertyExists = Object.prototype.hasOwnProperty.call(obj, curr);
    return accum && propertyExists;
  }, true);
}

describe('<ScriptPage />', () => {
  const { script_id, script_info, questions } = props;
  it('renders correctly', () => {
    const tree = renderer.create(
        <ScriptPage {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('ScriptPage props and methods', () => {
    const wrapper = shallow(<ScriptPage {...props} />).instance();
    describe('renderQuestions method', () => {
      it('should have a method named renderQuestions', () => {
        const { renderQuestions } = wrapper;
        expect(typeof renderQuestions).toBe('function');
      });
      it('should return questions properly', () => {
        const renderedQuestions = wrapper.renderQuestions();
        expect(Array.isArray(renderedQuestions)).toBe(true);
      });
    });
    describe('props', () => {
      describe('script_id prop', () => {
        it('should be defined', () => {
          expect(script_id).toBeDefined();
        });
        it('should have a value of 1', () => {
          expect(script_id).toBe(1);
        });
      });
      describe('script_info prop', () => {
        it('should be defined', () => {
          expect(script_info).toBeDefined();
        });
        it('should be an object', () => {
          expect(typeof script_info).toBe('object');
        });
        it('should have 3 properties - name, body, description', () => {
          const scriptInfoKeys = Object.keys(script_info);
          const scriptPropsAreCorrect = checkObjectProps(scriptInfoKeys, script_info);
          expect(scriptInfoKeys.length).toBe(3);
          expect(scriptPropsAreCorrect).toBe(true);
        });
      });
      describe('questions prop', () => {
        const firstQuestion = questions[0];
        it('should be defined', () => {
          expect(questions).toBeDefined();
        });
        it('should be an array of 1-5 question objects', () => {
          expect(questions.length).toBeLessThanOrEqual(5);
          expect(questions.length).toBeGreaterThanOrEqual(1);
          expect(Array.isArray(questions)).toBe(true);
          expect(typeof firstQuestion).toBe('object');
        });
        it('should contain question objects that have 4 properties - title, description, type, and responses', () => {
          const firstQuestionKeys = Object.keys(firstQuestion);
          const firstQuestionPropsAreCorrect = checkObjectProps(firstQuestionKeys, firstQuestion);
          expect(firstQuestionKeys.length).toBe(10);
          expect(firstQuestionPropsAreCorrect).toBe(true);
        });
      });
      describe('fetchScript prop', () => {
        it('should be defined', () => {
          expect(fetchScript).toBeDefined();
        });
        it('should be a function', () => {
          expect(typeof fetchScript).toBe('function');
        });
      });
      describe('fetchScriptQuestions prop', () => {
        it('should be defined', () => {
          expect(fetchScriptQuestions).toBeDefined();
        });
        it('should be a function', () => {
          expect(typeof fetchScriptQuestions).toBe('function');
        });
      });
    });
  });
});
