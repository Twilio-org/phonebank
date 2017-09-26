import React from 'react';
import { mount, shallow } from 'enzyme';
import CreateScriptForm from '../../../../public/src/components/script/create_script_form';

const questionOptions = [
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
const handleSubmit = jest.fn();
const props = {
  handleSubmit,
  questionOptions
}

describe('<CreateScriptForm />', () => {
  describe('Rendering', () => {
    const wrapper = shallow(<CreateScriptForm {...props}/>);

    it('should have one form element', () => {
      const numberOfFormElements = wrapper.find('form').length;
      expect(numberOfFormElements).toEqual(1);
    });

    it('should have 1 <PageHeader /> components', () => {
      const numberOfPageHeaderComponents = wrapper.find('PageHeader').length;
      expect(numberOfPageHeaderComponents).toEqual(1);
    });

    it('should have 3 <Row /> components', () => {
      const numberOfRowComponents = wrapper.find('Row').length;
      expect(numberOfRowComponents).toEqual(3);
    });

    it('should have 4 <Col /> components', () => {
      const numberOfColComponents = wrapper.find('Col').length;
      expect(numberOfColComponents).toEqual(4);
    });

    it('should have eight <Field /> components', () => {
      const numberOfFieldComponents = wrapper.find('Field').length;
      expect(numberOfFieldComponents).toEqual(8);
    });

    it('should have three button components', () => {
      const numberOfButtonComponents = wrapper.find('Button').length;
      expect(numberOfButtonComponents).toEqual(3);
    });

    it('should have one <ButtonToolbar /> component', () => {
      const numberOfButtonToolbarComponents = wrapper.find('ButtonToolbar').length;
      expect(numberOfButtonToolbarComponents).toEqual(1);
    });
  });

  describe('Function Calls', () => {
    const wrapper = shallow(<CreateScriptForm {...props}/>);

    it('should call handleSubmit when the submit button is clicked', () => {
      wrapper.find('form').simulate('submit');
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
