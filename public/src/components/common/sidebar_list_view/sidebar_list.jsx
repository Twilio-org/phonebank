import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SidebarList = (props) => {
  const { list } = props;
  let { active } = props;
  const setActive = (e) => {
    active = e.target.id;
    console.log(active);
  };
  return (
    <ListGroup>
      {
        list.map(item => (
          <ListGroupItem
            key={item.title}
            id={`${item.id}`}
            className={item.id === active.id ? active : ''}
            onClick={setActive}
          >
            {item.title}
          </ListGroupItem>)
        )
      }
    </ListGroup>
  );
};
export default SidebarList;
