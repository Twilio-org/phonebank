import React from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
// Fixed look
// import '../../../../stylesheets/sidebar-list.less';

const SidebarList = (props) => {
  const { list, id } = props;
  let { active } = props;
  const setActive = (e) => {
    active = e.target.id;
    console.log(active);
  };
  return (
    <ListGroup id={id} className={'sidebar-list'}>
      {
        list.map(item => (
          <ListGroupItem
            key={item.title}
            id={`${item.id}`}
            className={item.id === active.id ? active : ''}
            onClick={setActive}
          >
            <p className={'lead'}>{item.title}</p>
            <p><Label bsStyle={item.status === 'active' ? 'success' : 'default'}>{item.status}</Label></p>
          </ListGroupItem>)
        )
      }
    </ListGroup>
  );
};
export default SidebarList;
