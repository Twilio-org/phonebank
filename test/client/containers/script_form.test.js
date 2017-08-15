import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ScriptNewFormContainer from '../../../public/src/containers/create_script';
import store from '../../../public/src/store';

describe('<ScriptNewFormContainer />', () => {
  describe('rendering', () => {
    const routerWrappedForm = (
      <Provider store={store}>
        <MemoryRouter>
          <ScriptNewFormContainer />
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
