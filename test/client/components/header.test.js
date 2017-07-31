import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../public/src/components/header';

const props = {
  userId: 1,
  userInfo: {},
  history: {},
  logout: ()=>{}
};

describe('<Header />', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
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
  let wrapper = shallow(<Header {...props} />).instance();
  it('should receive a userId prop of 1',() => {
    expect(wrapper.props['userId']).toBe(1);
  });
  it('should receive a userId prop of null',() => {
    wrapper = shallow(<Header />).instance();
    expect(wrapper.props['userId']).toBe(undefined);
  });
});
describe('Header: getLinks()',() => {
  it('should return array of register/login links when user is logged out', () => {
    const header = shallow(<Header />).instance();
    const loggedOutLinks = [{ title: 'Register', href: '/registration' },
    { title: 'Login', href: '/login' }];
    expect(header.getLinks()).toEqual(expect.arrayContaining(loggedOutLinks));
  });
  it('should return array containing account link when user is logged in', () => {
    const header = shallow(<Header {...props} />).instance();
    const accountLink = {"href": "/account/1", "title": "Account"};
    expect(header.getLinks()).toContainEqual(accountLink);
  });
});
