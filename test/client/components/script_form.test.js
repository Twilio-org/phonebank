import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ScriptForm from '../../../public/src/components/script_form';
import store from '../../../public/src/store';

describe('<ScriptForm />', () => {
  describe('rendering', () => {
    const routerWrappedForm = (
      <Provider store = {store}>
        <MemoryRouter>
          <ScriptForm />
        </MemoryRouter>
      </Provider>
    );

    const wrapper = mount(
      routerWrappedForm
    );
    it('renders correctly', () => {
      const tree = renderer.create(
        routerWrappedForm
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
