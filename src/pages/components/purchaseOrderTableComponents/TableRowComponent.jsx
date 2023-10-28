import React from 'react';
import ItemQuantityInput from './ItemQuantityInput';

const TableRow = ({ item, onQuantityChange  }) => {
  return (
    <tr>
      <td>{item['Supplier Product Code']}</td>
      <td>{item['Brand']}</td>
      <td>
        {item['Description']} {item['Single Unit Measure']} {item['Unit of Measure']}
      </td>
      <td>{item['Item Code']}</td>
      <td><ItemQuantityInput item={item} onQuantityChange={onQuantityChange} /></td>

    </tr>
  );
};

export default TableRow;
