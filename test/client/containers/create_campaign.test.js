import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CreateCampaignContainer from '../../../public/src/containers/create_campaign';
import store from '../../../public/src/store';

describe('<CreateCampaignContainer />', () => {
  describe('rendering', () => {
    const routerWrappedForm = (
      <Provider store={store}>
        <MemoryRouter>
          <CreateCampaignContainer />
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
