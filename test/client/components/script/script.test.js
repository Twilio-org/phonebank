import { fetchScript, fetchScriptQuestions } from '../../../../public/src/actions/script';

const props = {
  id: 1,
  admin_scripts: {
    current_script: {
      name: 'ScriptName',
      body: 'ScriptBody',
      description: 'ScriptDescription'
    }
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
  const { id, questions, admin_scripts } = props;
  const { current_script } = admin_scripts;
  describe('ScriptPage props and methods', () => {
    describe('props', () => {
      describe('script id prop', () => {
        it('should be defined', () => {
          expect(id).toBeDefined();
        });
        it('should have a value of 1', () => {
          expect(id).toBe(1);
        });
      });
      describe('current_script prop', () => {
        it('should be defined', () => {
          expect(current_script).toBeDefined();
        });
        it('should be an object', () => {
          expect(typeof current_script).toBe('object');
        });
        it('should have 3 properties - name, body, description', () => {
          const scriptInfoKeys = Object.keys(current_script);
          const scriptPropsAreCorrect = checkObjectProps(scriptInfoKeys, current_script);
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
