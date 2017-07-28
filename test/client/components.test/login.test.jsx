import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import LogInForm from '../../../public/src/components/login';

describe('components', () => {
  describe('<LogInForm />', () => {
    let logInForm;
    beforeEach(() => {
      logInForm = shallow(<LogInForm />);
    });
    it('LogInForm renders a form', () => {
      expect(logInForm.find('form').length).toEqual(1);
    });
  });
});
