import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Navigation from '../../../public/src/components/navigation';

describe('<Navigation />', () => {
  // test variables
  const testUser = {
    first_name: 'Beyonce',
    last_name: 'Cat',
    email: 'mrcat@gmail.com',
    phone_number: '15555555555'
  };
  const linksLoggedIn = [
    { title: 'Account', href: `/account/1` },
    { title: 'Logout', href: '/logout' }
  ];
  const linksLoggedOut = [
    { title: 'Register', href: '/registration' },
    { title: 'Login', href: '/login' }
  ];
  const logout = jest.fn();
  const propsLoggedIn = {
    title: testUser.first_name,
    links: linksLoggedIn,
    userInfo: testUser,
    history: {},
    logout: logout
  };
  const propsLoggedOut ={
    title: 'Menu',
    links: linksLoggedOut
  };
  describe('rendering', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Navigation {...propsLoggedOut}/>
      </MemoryRouter>
    );
    it('renders correctly', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <Navigation {...propsLoggedOut} />
        </MemoryRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render <ButtonToolbar />', () => {
      expect(wrapper.find('ButtonToolbar').length).toBe(1);
    });
    it('should render <DropdownButton />', () => {
      expect(wrapper.find('DropdownButton').length).toBe(1);
    });
    it('should render <Link />', () => {
      expect(wrapper.find('Link').length).toBeGreaterThan(1);
    });
  });

  describe('props', () => {
    const wrapper = shallow(<Navigation {...propsLoggedOut} />);

    it('should recieve "Menu" if user is logged out',() => {
      expect(wrapper.instance().props['title']).toBe('Menu');
    });
    it('should recieve "Login"/"Register" links if user is logged out',() => {
      expect(wrapper.instance().props['links']).toBe(linksLoggedOut);
    });
    it('should recieve name if user is logged in',() => {
      wrapper.setProps(propsLoggedIn);
      expect(wrapper.instance().props['title']).toBe('Beyonce');
    });
    it('should recieve "Login"/"Register" links if user is logged out',() => {
      wrapper.setProps(propsLoggedIn);
      expect(wrapper.instance().props['links']).toBe(linksLoggedIn);
    });
  });

  describe('onClick',() => {
    it('should call logoutOnClick() when "Logout" is clicked',() => {
      const wrapper = mount(
        <MemoryRouter>
          <Navigation {...propsLoggedIn}/>
        </MemoryRouter>
      );
      wrapper.find('a').last().find('a').simulate('click');
      expect(logout).toHaveBeenCalled();
    });
    it('should not render logout link if user logged out',() => {
      const wrapper = mount(
        <MemoryRouter>
          <Navigation {...propsLoggedOut}/>
        </MemoryRouter>
      );
      expect(wrapper.find('a').last().find('a').text()).not.toBe('Logout');
    });
  });

  describe('renderLinks()',() => {
    const wrapper = shallow(<Navigation {...propsLoggedOut} />);
    it('should return link items correctly',() => {
      const links = wrapper.instance().renderLinks();
      expect(Array.isArray(links)).toBe(true);
    });
  });
});
