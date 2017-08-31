import React from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

const SidebarList = (props) => {
  const { list, id, setCurrentCampaign } = props;
  let { active } = props;

  const setActive = (e) => {
    const selectedId = e.currentTarget.id;
    active = list.filter(campaign => campaign.id === parseInt(selectedId, 10))[0];
    setCurrentCampaign(active);
  };
  const setStatusColor = (item) => {
    if (item.status === 'active') {
      return 'success';
    } else if (item.status === 'completed') {
      return 'info';
    }
    return 'default';
  };
  const setStatusText = (item) => {
    if (item.status === 'pause') {
      return 'inactive';
    }
    return item.status;
  };
  return (
    <ListGroup id={id} className={'sidebar-list'}>
      {
        list && list.map(item => (
          <ListGroupItem
            key={item.title}
            id={`${item.id}`}
            className={active && item.id === active.id ? 'active' : ''}
            onClick={setActive}
          >
            <h4>{item.title}</h4>
            <p>
              <Label
                bsStyle={setStatusColor(item)}
                className={'text-capitalize'}
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
