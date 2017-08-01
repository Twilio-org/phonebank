import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Navigation from '../../../public/src/components/navigation';

describe('<Navigation />', () => {
  describe('rendering', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    it('renders correctly', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    // it('should render <Navigation />', () => {
    //   expect(wrapper.find('Navigation').length).toBe(1);
    // });
    // it('should render <Navbar />', () => {
    //   expect(wrapper.find('Navbar').length).toBe(1);
    // });
    // it('should render <Navbar.Brand />', () => {
    //   expect(wrapper.find('.navbar-brand').length).toBe(1);
    // });
  });
  // test variables
  const testUser = {
    first_name: 'Mr.',
    last_name: 'Cat',
    email: 'mrcat@gmail.com',
    phone_number: '15555555555'
  };
  const props = {
    userId: 1,
    userInfo: testUser
  };
  describe('props', () => {
    const wrapper = shallow(<Navigation />);
    // it('should receive a userInfo that is null',() => {
    //   expect(wrapper.instance().props['userInfo']).toBe(undefined);
    // });
    // it('should receive a userId prop of null',() => {
    //   expect(wrapper.instance().props['userId']).toBe(undefined);
    // });
    // it('should receive a userId prop of 1',() => {
    //   wrapper.setProps(props);
    //   expect(wrapper.instance().props['userId']).toBe(1);
    // });
    // it('should receive userInfo',() => {
    //   wrapper.setProps(props);
    //   expect(wrapper.instance().props['userInfo']).toEqual(testUser);
    // });
  });

  describe('getLinks()',() => {
    const wrapper = shallow(<Navigation />);
    // const loggedOutLinks = [{ title: 'Register', href: '/registration' },
    // { title: 'Login', href: '/login' }];
    // const accountLink = {"href": "/account/1", "title": "Account"};
    //
    // it('should return array of register/login links when user is logged out', () => {
    //   expect(wrapper.instance().getLinks()).toEqual(expect.arrayContaining(loggedOutLinks));
    // });
    // it('should return array containing account link when user is logged in', () => {
    //   wrapper.setProps(props);
    //   expect(wrapper.instance().getLinks()).toContainEqual(accountLink);
    // });
  });
});
