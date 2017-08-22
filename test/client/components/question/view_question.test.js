import React from 'react';
import { shallow, mount } from 'enzyme';
import ViewQuestion from '../../../../public/src/components/question/view_question';

const props = {
  history: { goBack: jest.fn() },
  match: { params: { id: 1 } },
  fetchQuestion: jest.fn(),
  current_question: {
    title: 'Cat',
    description: 'Do you own cats?',
    type: 'multiselect',
    responses: ['yes','2','no']
  }
};
describe('<ViewQuestion />', () => {
  const wrapper = shallow(<ViewQuestion {...props} />);
  describe('rendering', () => {
    it('should render one <PageHeader>', () => {
      expect(wrapper.find('PageHeader').length).toBe(1);
    });
    it('should render one <ListGroup>', () => {
      expect(wrapper.find('ListGroup').length).toBe(1);
    });
    it('should render 3 <ListGroupItem>', () => {
      expect(wrapper.find('ListGroupItem').length).toBe(3);
    });
    it('should render correct number of responses', () => {
      expect(wrapper.find('ul').find('li').length).toBe(props.current_question.responses.length);
    });
    it('should render correct number of icons', () => {
      expect(wrapper.find('i').length).toBe(props.current_question.responses.length + 1);
    });
  });
  describe('Go Back button', () => {
    it('Go back button should call history.goBack()', () => {
      const button = wrapper.find('Button');
      button.simulate('click');
      expect(props.history.goBack).toHaveBeenCalled();
    });
  });
  describe('Mounting', () => {
    it('Should call the fetchQuestion action on mount', () => {
      mount(<ViewQuestion {...props} />);
      expect(props.fetchQuestion).toHaveBeenCalled();
    });
  });
});
