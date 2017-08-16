import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateQuestionContainer from '../../../public/src/containers/create_question';

describe('<CreateQuestionContainer />', () => {
  // Mock Store setup:
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  describe('rendering', () => {
    const store = mockStore();
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
