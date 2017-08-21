import React from 'react';
import { shallow } from 'enzyme';
import { fetchScript, fetchScriptQuestions } from '../../../../public/src/actions/script';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers.js';
import ScriptPage from '../../../../public/src/components/script/script';

const { current_script,
        scriptQuestionsFixture: questions } = fixtures.scriptViewFixtures;

const props = {
  id: 1,
  current_script,
  questions,
  fetchScript,
  fetchScriptQuestions
};

describe('<ScriptPage />', () => {
  const { id, questions, current_script } = props;
  describe('Rendering of <ScriptPage />', () => {
    const wrapper = shallow(<ScriptPage {...props} />);
    it('should render one div element', () => {
      const divElements = wrapper.find('div').length;
      expect(divElements).toBe(1);
    });
    it('should render three h4 elements', () => {
      const h4Elements = wrapper.find('h4').length;
      expect(h4Elements).toBe(3);
    });
    it('should render one h1 element', () => {
      const h1Elements = wrapper.find('h1').length;
      expect(h1Elements).toBe(1);
    });
    it('should render one ol element', () => {
      const olElements = wrapper.find('ol').length;
      expect(olElements).toBe(1);
    });
  });
  describe('Expected props', () => {
    const wrapper = shallow(<ScriptPage {...props} />).instance();
    const expectedProps = Object.keys(props);
    it('should have the expected props', () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
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
