import React from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
// Fixed look
// import '../../../../stylesheets/sidebar-list.less';

const SidebarList = (props) => {
  const { list, id } = props;
  let { active } = props;

  const setActive = (e) => {
    const selectedId = e.currentTarget.id;
    const { setCurrentCampaign } = props;
    active = list.filter(campaign => campaign.id === parseInt(selectedId, 10));
    setCurrentCampaign(active[0]);
  };

  const setStatusColor = (item) => {
    if (item.status === 'active') {
      return 'success';
    } else if (item.status === 'pause') {
      return 'warning';
    }
    return 'default';
  };
  const setStatusText = (item) => {
    if (item.status == 'pause'){
      return 'paused';
    }
    return item.status;
  };
  return (
    <ListGroup id={id} className={'sidebar-list'}>
      {
        list.map(item => (
          <ListGroupItem
            key={item.title}
            id={`${item.id}`}
            className={active && item.id === active.id ? 'active' : ''}
            onClick={setActive}
          >
            <p className={'lead'}>{item.title}</p>
            <p>
              <Label
                bsStyle={setStatusColor(item)}
                className="text-capitalize"
              >
                {setStatusText(item)}
              </Label>
            </p>
          </ListGroupItem>)
        )
      }
    </ListGroup>
  );
};
export default SidebarList;
