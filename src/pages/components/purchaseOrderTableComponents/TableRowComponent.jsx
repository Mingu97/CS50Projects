import React from 'react';

const TableRow = ({ item, fields }) => {
  fields = ['id','name','cost', 'Item Quantity']
  return (
    <tr>
      {fields.map((field) => (
        <td key={field}>
          {item[field]}
        </td>
      ))}
    </tr>
  );
};


export default TableRow;
