import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { AccountPage } from '../../../public/src/components/account';
import { fetchUser } from '../../../public/src/actions/account_info';
import deleteUser from '../../../public/src/actions/edit_account';

jest.mock('../../../public/src/actions/edit_account', () => jest.fn());

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
      <AccountPage
        account_info={accountInfo}
        auth={auth}
        fetchUser={fetchUser}
        deleteUser={deleteUser}
      />
    </MemoryRouter>
  );
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <AccountPage
          account_info={accountInfo}
          auth={auth}
          fetchUser={fetchUser}
          deleteUser={deleteUser}
        />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render 3 div elements', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
  it('should render a Link component', () => {
    expect(wrapper.find('Link').length).toBe(1);
  });
});


// Props + methods:
describe('AccountPage props and methods:', () => {
  const props = {
    auth: {
      id: 31
    },
    account_info: {
      first_name: 'Harry',
      last_name: 'Potter',
      email: 'goldensnitch@hogwarts.com',
      phone_number: '12224448888'
    },
    deleteUser,
    fetchUser,
    history: 'history'
  };
  const wrapper = shallow(<AccountPage {...props} />).instance();
  const { onDeleteClick } = wrapper;
  describe('click handler for user Delete (onDeleteClick)', () => {
    it('should have a method named onDeleteClick', () => {
      expect(typeof onDeleteClick).toBe('function');
    });
    it('should call this.props.deleteUser only once on button click', () => {
      wrapper.onDeleteClick();
      const numberOfMockCalls = deleteUser.mock.calls.length;
      expect(deleteUser).toHaveBeenCalledTimes(1);
      expect(numberOfMockCalls).toBe(1);
    });
    it('should call this.props.deleteUser with two arguments: id (31) and history', () => {
      const mockCallsArray = deleteUser.mock.calls[0];
      expect(mockCallsArray.length).toBe(2);
      expect(mockCallsArray[0]).toBe(31);
      expect(mockCallsArray[1]).toBe('history');
    });
  });

  describe('has props from the store connection', () => {
    describe('props should contain auth', () => {
      it('should receive auth which is an object', () => {
        expect(typeof props.auth).toBe('object');
      });
      it('auth should have a property \'id\' with a value of 31', () => {
        expect(props.auth.id).toBeDefined();
        expect(props.auth.id).toBe(31);
      });
    });
    describe('props should contain account_info', () => {
      it('should recieve account_info which is an object', () => {
        expect(typeof props.account_info).toBe('object');
      });
      it('account info should have 4 properties: first_name, last_name, email, phone_number', () => {
        const accountInfoKeys = Object.keys(props.account_info);
        expect(accountInfoKeys.length).toBe(4);
        accountInfoKeys.forEach((key) => {
          expect(props.account_info.hasOwnProperty(key)).toBe(true);
        });
      });
    });
  });
});
