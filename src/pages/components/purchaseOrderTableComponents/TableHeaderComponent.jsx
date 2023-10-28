import React from 'react';

const TableHeader = ({ headers }) => {
  const productFields = ['Item Code', 'Supplier Product Code', 'Brand', 'Description', 'Single Unit Measure', 'Unit of Measure']

  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
