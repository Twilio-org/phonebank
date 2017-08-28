import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import App from '../../../public/src/components/app';
import store from '../../../public/src/store';

import { exposeLocalStorageMock } from '../client_test_helpers';

exposeLocalStorageMock();
beforeEach(() => {
  localStorage.setItem('auth_token', 'meow');
  localStorage.setItem('user_id', '1');
  localStorage.setItem('permissions', 'true');
});

afterEach(() => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('permissions');
});

describe('<App />', () => {
  describe('rendering', () => {
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
    it('should render header', () => {
      const wrapper = mount(
        <Provider store = {store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find('Header').length).toBe(1);
    });
    it('should render children', () => {
      const wrapper = mount(
        <Provider store = {store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.children().length).toBeGreaterThan(1);
    });
  });
});
