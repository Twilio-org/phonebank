import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from '../../../public/src/components/header';

const props = {
  userId: 1,
  userInfo: {
    first_name: 'Mr.',
    last_name: 'Cat',
    email: 'mrcat@gmail.com',
    phone_number: '15555555555'
  }
};

describe('<Header />', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render <Navigation />', () => {
    expect(wrapper.find('Navigation').length).toBe(1);
  });
  it('should render <Navbar />', () => {
    expect(wrapper.find('Navbar').length).toBe(1);
  });
  it('should render <Navbar.Brand />', () => {
    expect(wrapper.find('.navbar-brand').length).toBe(1);
  });
});

describe('Header: props', () => {
  const test_user = {
    first_name: 'Mr.',
    last_name: 'Cat',
    email: 'mrcat@gmail.com',
    phone_number: '15555555555'
  };
  const wrapper = shallow(<Header {...props} />).instance();

  it('should receive a userId prop of 1',() => {
    expect(wrapper.props['userId']).toBe(1);
  });
  it('should receive a userId prop of null',() => {
    const header = shallow(<Header />).instance();
    expect(header.props['userId']).toBe(undefined);
  });
  it('should receive userInfo',() => {
    expect(wrapper.props['userInfo']).toEqual(test_user);
  });
  it('should receive a userInfo that is null',() => {
    const header = shallow(<Header />).instance();
    expect(header.props['userInfo']).toBe(undefined);
  });
});

describe('Header: getLinks()',() => {
  it('should return array of register/login links when user is logged out', () => {
    const wrapper = shallow(<Header />).instance();
    const loggedOutLinks = [{ title: 'Register', href: '/registration' },
    { title: 'Login', href: '/login' }];
    expect(wrapper.getLinks()).toEqual(expect.arrayContaining(loggedOutLinks));
  });
  it('should return array containing account link when user is logged in', () => {
    const wrapper = shallow(<Header {...props} />).instance();
    const accountLink = {"href": "/account/1", "title": "Account"};
    expect(wrapper.getLinks()).toContainEqual(accountLink);
  });
});
