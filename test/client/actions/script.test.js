import { setScriptInfo, setScriptQuestions } from '../../../public/src/actions/script';

describe('script actions', () => {
  describe('setScriptInfo', () => {
    describe('type', () => {
      it('should have the type "SET_SCRIPT_INFO"', () => {
        expect(setScriptInfo().type).toEqual('SET_SCRIPT_INFO');
      });
    });
    describe('payload', () => {
      const scriptInfo = {
        name: 'ScriptName',
        body: 'ScriptBody',
        description: 'ScriptDescription'
      };
      it('should pass on the payload we pass in', () => {
        expect(setScriptInfo(scriptInfo).payload.name).toEqual(scriptInfo.name);
        expect(setScriptInfo(scriptInfo).payload.body).toEqual(scriptInfo.body);
        expect(setScriptInfo(scriptInfo).payload.description).toEqual(scriptInfo.description);
      });
    });
  });
  describe('setScriptQuestions', () => {
    describe('type', () => {
      it('should have the type "SET_SCRIPT_QUESTIONS"', () => {
        expect(setScriptQuestions().type).toEqual('SET_SCRIPT_QUESTIONS');
      });
    });
    describe('payload', () => {
      const questions = [
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
      ];
      it('should pass on the payload we pass in', () => {
        expect(setScriptQuestions(questions).payload).toEqual(questions);
      });
    });
  });
});
