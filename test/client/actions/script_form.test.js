import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { SET_SCRIPT_FORM_QUESTION_OPTIONS } from '../../../public/src/reducers/script_form';
import { setQuestionOptions, fetchAllQuestions, postScript } from '../../../public/src/actions/script_form';

const questions = [
  {
      id: 1,
      title: 'Test Question 1',
      description: 'This is the first test question. It\'s a paragraph type.',
      type: 'paragraph',
      responses: '',
      created_at: '2017-08-14T22:28:35.864Z',
      updated_at: '2017-08-14T22:28:35.864Z'
  },
  {
      id: 2,
      title: 'Test Question 2',
      description: 'This is the second test question. It\'s a singleselect type.',
      type: 'singleselect',
      responses: 'opt1,opt2,opt3',
      created_at: '2017-08-14T22:28:35.864Z',
      updated_at: '2017-08-14T22:28:35.864Z'
  },
  {
      id: 3,
      title: 'Test Question 3',
      description: 'This is the third test question. It\'s a multiselect type.',
      type: 'multiselect',
      responses: 'optA,optB,optC',
      created_at: '2017-08-14T22:28:35.864Z',
      updated_at: '2017-08-14T22:28:35.864Z'
  },
]

describe('Question Setting', () => {
  describe('setQuestionOptions', () => {
    it('the object returned should have a type of "SET_SCRIPT_FORM_QUESTION_OPTIONS"', () => {
      expect(setQuestionOptions().type).toEqual('SET_SCRIPT_FORM_QUESTION_OPTIONS');
    });

    questions.forEach((question, index) => {
      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].id).toEqual(questions[index].id);
      });

      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].title).toEqual(questions[index].title);
      });

      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].description).toEqual(questions[index].description);
      });

      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].type).toEqual(questions[index].type);
      });

      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].responses).toEqual(questions[index].responses);
      });

      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].created_at).toEqual(questions[index].created_at);
      });

      it('should have a payload with property id that matches what was passed', () => {
        expect(setQuestionOptions(questions).payload[index].updated_at).toEqual(questions[index].updated_at);
      });
    });
  });

  describe('fetchAllQuestions', () => {
    beforeEach(() => {
      console.log('***************BEFORE EACH');
      const mock = new MockAdapter(axios);
      mock.onAny('/questions').reply((config) => {
        console.log(config);
        return [200, 'got a thing'];
      });
    });

    it('dispatches the action', () => {
      console.log('fetching question*******************');
      fetchAllQuestions();
    });
  });
});

// describe('Script Posting', () => {
//   describe('postScript')
// })
