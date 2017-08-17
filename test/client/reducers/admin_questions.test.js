
import { SET_QUESTIONS, SET_QUESTION_CURRENT, adminQuestionsReducer } from '../../../public/src/reducers/admin_questions';

import fixtures from '../client_fixtures';
import { checkObjectProps, isObjectEmpty } from '../client_test_helpers';

const { defaultQuestions: initialState,
        listFixture: questionListFixtures,
        mapFixture: questionFixture } = fixtures.questionFixtures;

const mockQuestionActions = [
  {
    type: SET_QUESTIONS,
    payload: questionListFixtures
  },
  {
    type: SET_QUESTION_CURRENT,
    payload: questionFixture
  },
  {
    type: 'SET_QUESTION_DATE',
    payload: 'you have been fooled'
  }
];
const [all, one, fake] = mockQuestionActions;
const numOfScripts = questionListFixtures.length;
const expectedQuestionProps = Object.keys(questionFixture);

describe('script list view reducer tests: ', () => {
  let testResult;
  describe('default behavior', () => {
    const defaultState = adminQuestionsReducer(undefined, {});
    const { all_questions, current_question } = defaultState;
    it('should return the default state if the action type does not match any cases: ', () => {
      expect(defaultState).toEqual(initialState);
    });
    it('should have a property named all_questions which is an empty array: ', () => {
      expect(!!all_questions).toBe(true);
      expect(Array.isArray(all_questions)).toBe(true);
      expect(!!all_questions.length).toBe(false);
    });
    it('should have a property named current_question which is an empty object: ', () => {
      expect(!!all_questions).toBe(true);
      expect(typeof current_question).toBe('object');
      expect(!Array.isArray(current_question)).toBe(true);
      expect(isObjectEmpty(current_question)).toBe(true);
    });
  });
  describe('it should add an array of all scripts when "SET_QUESTIONS" is called', () => {
    testResult = adminQuestionsReducer(initialState, all);
    const { current_question, all_questions } = testResult;
    it('should update all_questions to be an array of script objects', () => {
      expect(Array.isArray(all_questions)).toBe(true);
      expect(all_questions.length).toBe(numOfScripts);
    });
    it('should not update current_question', () => {
      expect(isObjectEmpty(current_question)).toBe(true);
    });
  });
  describe('it should add a script object to current_question when "SET_QUESTION_CURRENT" is dispatched: ', () => {
    testResult = adminQuestionsReducer(initialState, one);
    const { current_question, all_questions } = testResult;
    it('should update current_question when "SET_QUESTION_CURRENT" is dispatched ', () => {
      expect(current_question).toEqual(questionFixture);
      expect(!!Object.keys(current_question).length).toBe(true);
    });
    it(`Should have the following props: ${expectedQuestionProps.join(', ')}`, () => {
      expect(checkObjectProps(expectedQuestionProps, current_question)).toBe(true);
    });
    it('should not update all_questions ', () => {
      expect(isObjectEmpty(all_questions)).toBe(true);
    });
  });
  describe('handling non-matching action types: ', () => {
    testResult = adminQuestionsReducer(initialState, fake);
    const { current_question, all_questions } = testResult;
    it('should neither update current_question, nor all_questions: ', () => {
      const shouldBeTrue = [current_question, all_questions]
        .reduce((accum, curr) => accum && isObjectEmpty(curr), true);
      expect(shouldBeTrue).toBe(true);
    });
  });
});
