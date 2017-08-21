import React from 'react';
import { shallow, mount } from 'enzyme';
import QuestionResponses from '../../../../public/src/components/question/question_responses';

describe('<QuestionForm />', () => {
  const props = {
    name: 'responses'
  };
  const wrapper = shallow(<QuestionResponses {...props}/>);
  describe('rendering', () => {
    it('should render 5 field options',() => {
      expect(wrapper.find('Field').length).toBe(5);
    });
  });
});
