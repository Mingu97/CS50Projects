import React from 'react';
import Card from 'react-bootstrap/Card';

function ProductCardDetails({ item, productFields }) {
  return (
    <Card.Body>
      {productFields.map((field) => (
        <Card.Text key={field}>{item[field]}</Card.Text>
      ))}
    </Card.Body>
  );
}

export default ProductCardDetails;
