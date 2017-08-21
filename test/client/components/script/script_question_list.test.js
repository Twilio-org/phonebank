import React from 'react';
import { shallow } from 'enzyme';
import fixtures from '../../client_fixtures';
import { checkObjectProps } from '../../client_test_helpers.js';
import QuestionList from '../../../../public/src/components/script/script_question_list';

const { scriptQuestionsFixture } = fixtures.scriptViewFixtures;

const props = {
  question: scriptQuestionsFixture[0]
};

describe('QuestionList component', () => {
  const wrapper = shallow(<QuestionList {...props} />);
  describe('QuestionList rendering', () => {
    it('should render one question', () => {
      const ulElements = wrapper.find('ul').length;
      expect(ulElements).toBe(1);
    });
    it('should render a list of the question description, title and responses within the question list', () => {
      const liElements = wrapper.find('li').length;
      expect(liElements).toBe(4);
    });
  });
  describe('Expected props for <QuestionList />', () => {
    const wrapper = shallow(<QuestionList {...props} />).instance();
    const expectedProps = Object.keys(props);
    it('should have the expected props', () => {
      const actualProps = wrapper.props;
      expect(checkObjectProps(expectedProps, actualProps)).toBe(true);
    });
  });
});
