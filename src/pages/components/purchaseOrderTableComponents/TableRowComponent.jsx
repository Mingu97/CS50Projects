import React from 'react';

const TableRow = ({ item }) => {
  return (
    <tr>
      <td>{item['Supplier Product Code']}</td>
      <td>{item['Brand']}</td>
      <td>
        {item['Description']} {item['Single Unit Measure']} {item['Unit of Measure']}
      </td>
      <td>{item['Item Code']}</td>
    </tr>
  );
};

export default TableRow;
