import React from 'react';
import ListBtnGroup from '../common/list_btngrp';

const TableRow = (props) => {
  const { buttons, history, item, is_admin } = props;
  let { headers } = props;
  const button = buttons(props);

  if (!is_admin) {
    headers = headers.filter(header => header[1] === 'title');
  }

  return (
    <tr>
      {headers ? headers.map((header) => {
        const [display, mapKey] = header;
        return (
          <td key={mapKey.concat(display[0], item.id)}>
            {item[mapKey]}
          </td>
        );
      }) : ''}
      <td>
        <ListBtnGroup history={history} buttons={button} />
      </td>
    </tr>
  );
};

TableRow.displayName = 'TableRow';

export default TableRow;
