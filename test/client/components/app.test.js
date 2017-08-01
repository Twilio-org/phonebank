
import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import App from '../../../public/src/components/app';
import store from '../../../public/src/store';

describe('<App />', () => {
  describe('rendering', () => {
    // const wrapper = mount(<App />);
    it('should render correctly', () => {
      const tree = renderer.create(
        <Provider store = {store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
