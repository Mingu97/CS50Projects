import React from 'react';
import Card from 'react-bootstrap/Card';

function ProductCardDetails({ item }) {
  return (
    <Card.Body>
      <Card.Title>{item['Brand']} {item['Description']} {item['Single Unit Measure']} {item['Unit of Measure']}</Card.Title>
      <Card.Text>{item['Item Code']}</Card.Text>
      <Card.Text>{item['Supplier Product Code']}</Card.Text>
    </Card.Body>
  );
}

export default ProductCardDetails;
