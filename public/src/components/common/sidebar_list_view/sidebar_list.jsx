import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SidebarList = (props) => {
  const { list, active, onClick } = props;
  return (
    <ListGroup>
      {
        list.map(item => (
          <ListGroupItem
            key={item.title}
            className={item.id === active.id ? active : ''}
            onClick={onClick}
          >
            {item.title}
          </ListGroupItem>)
        )
      }
    </ListGroup>
  );
};
export default SidebarList;
