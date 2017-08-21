import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CreateQuestionContainer from '../../../public/src/containers/create_question';
import { mockStore } from '../client_test_helpers';

describe('<CreateQuestionContainer />', () => {
  const store = mockStore();
  describe('rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <MemoryRouter>
            <CreateQuestionContainer />
          </MemoryRouter>
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
