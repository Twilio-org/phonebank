import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers.js';

const { scriptQuestionsFixture: questions } = fixtures.scriptViewFixtures;

const props = {
  questions
};

describe('QuestionList component', () => {
  const { questions } = props;
  const firstQuestion = questions[0];
  describe('questions props', () => {
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
});
