import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AccountPage } from '../../../public/src/components/account';
import { fetchUser } from '../../../public/src/actions/account_info';

const mockStore = {
  auth: {
    id: 31
  },
  accountInfo: {
    first_name: 'Harry',
    last_name: 'Potter',
    email: 'goldensnitch@hogwarts.com',
    phone_number: '12224448888'
  }
};

describe('<AccountPage />', () => {
  const { accountInfo, auth } = mockStore;
  const wrapper = mount(
    <MemoryRouter>
      <AccountPage account_info={accountInfo} auth={auth} fetchUser={fetchUser} />
    </MemoryRouter>
  );
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <AccountPage account_info={accountInfo} auth={auth} fetchUser={fetchUser} />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('AccountPage props', () => {
  const props = {
    auth: {
      id: 31
    },
    account_info: {
      first_name: 'Harry',
      last_name: 'Potter',
      email: 'goldensnitch@hogwarts.com',
      phone_number: '12224448888'
    }
  };
  const wrapper = shallow(<AccountPage {...props} />).instance();
  it('should have a method named onDeleteClick', () => {
    console.log(wrapper.onDeleteClick);
    expect(typeof wrapper.onDeleteClick).toBe('function');
  });
});
