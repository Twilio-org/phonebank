import React from 'react';
import { shallow, mount } from 'enzyme';
import SidebarList from '../../../../../public/src/components/campaign/sidebar_list_view/sidebar_list';

const props = {
  list: [
    { id: 1, title: 'Campaign 1', status: 'active'},
    { id: 2, title: 'Campaign 2', status: 'pause'},
    { id: 3, title: 'Campaign 3', status: 'completed'}
  ],
  active: { id: 1, title: 'Campaign 1', status: 'active'},
  setCurrentCampaign: jest.fn(),
  id: 'test'
};
const event = {
  currentTarget: jest.fn()
}
const wrapper = shallow(<SidebarList {...props} />);
describe('<SidebarList />', () => {
  describe('rendering', () => {
    it('should render 1 <ListGroup>', () => {
      expect(wrapper.find('ListGroup').length).toBe(1);
    });
    it('should render 3 <ListGroupItem>', () => {
      expect(wrapper.find('ListGroupItem').length).toBe(3);
    });
    it('should render 3 labels', () => {
      expect(wrapper.find('Label').length).toBe(3);
    });
  });
});
describe('onClick', () => {
  it('Should call setActive action when ListGroupItem is clicked', () => {
    const link = wrapper.find('ListGroupItem').last();
    link.simulate('click', event);
    expect(props.setCurrentCampaign).toHaveBeenCalled();
  });
});
