import React from 'react';
import { shallow } from 'enzyme';
import CreateQuestion from '../../../../public/src/components/question/create_question';

describe('<CreateQuestion />', () => {
  const values = {};
  const props = {
    handleSubmit: jest.fn(),
    history: {
      goBack: jest.fn()
    },
    createQuestion: jest.fn(),
    destroy: jest.fn()
  };
  const wrapper = shallow(<CreateQuestion {...props}/>);

  describe('rendering', () => {
    it('should render <QuestionForm />', () => {
      expect(wrapper.find('QuestionForm').length).toBe(1);
    });
    it('should render an <h1>', () => {
      expect(wrapper.find('h1').length).toBe(1);
    });
  });
  describe('props', () => {
    const wrapperNoProps = shallow(<CreateQuestion />);
    it('should return undefined if redux-form handleSubmit not in props', () => {
      expect(wrapperNoProps.instance().props.handleSubmit).toBe(undefined);
    });
  });
  describe('formSubmit()', () => {
    it('should call createQuestion action on formSubmit', () => {
      wrapper.instance().formSubmit(values);
      expect(props.createQuestion).toBeCalled();
      expect(props.createQuestion).toBeCalledWith(values, props.history);
    });
  });
  describe('formCancel()', () => {
    it('should call destroy action on formCancel', () => {
      wrapper.instance().formCancel();
      expect(props.destroy).toBeCalled();
      expect(props.destroy).toBeCalledWith('CreateQuestion');
    });
    it('should call goBack() on history', () => {
      wrapper.instance().formCancel();
      expect(props.history.goBack).toBeCalled();
    });
  });
});
