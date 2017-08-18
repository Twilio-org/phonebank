import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CreateQuestionContainer from '../../../public/src/containers/create_question';
import { mockStore } from '../client_test_helpers';

describe('<CreateQuestionContainer />', () => {
  const store = store = mockStore();
  describe('rendering', () => {
    const routerWrappedForm = (
      <Provider store={store}>
        <MemoryRouter>
          <CreateQuestionContainer />
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
