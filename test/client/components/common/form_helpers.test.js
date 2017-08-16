import React from 'react';
import { shallow } from 'enzyme';
import { renderTextArea, renderDropdown } from '../../../../public/src/components/common/form_helpers';

const field1 = {
  label: 'label',
  meta: {},
};

const field2 = {
  label: 'question',
  meta: {},
  id: '',
  keyToUse: 'title',
  options: [
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
}

describe('renderTextArea', () => {
  const wrapper = shallow(renderTextArea(field1));

  it('should have one label element', () => {
    const numberOfLabelElements = wrapper.find('label').length;
    expect(numberOfLabelElements).toEqual(1);
  });

  it('should have one textarea element', () => {
    const numberOfTextareaElements = wrapper.find('textarea').length;
    expect(numberOfTextareaElements).toEqual(1);
  });

  it('should have two div elements', () => {
    const numberOfDivElements = wrapper.find('div').length;
    expect(numberOfDivElements).toEqual(2);
  });
});

describe('renderDropdown', () => {
  const wrapper = shallow(renderDropdown(field2));

  it('should have one div element', () => {
    const numberOfDivElements = wrapper.find('div').length;
    expect(numberOfDivElements).toEqual(1);
  });

  it('should have one label element', () => {
    const numberOfLabelElements = wrapper.find('label').length;
    expect(numberOfLabelElements).toEqual(1);
  });

  it('should have one select element', () => {
    const numberOfLabelElements = wrapper.find('select').length;
    expect(numberOfLabelElements).toEqual(1);
  });

  it('should have four option elements', () => {
    const numberOfOptionElements = wrapper.find('option').length;
    expect(numberOfOptionElements).toEqual(4);
  });
});
