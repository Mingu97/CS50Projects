import React from 'react';
import Card from 'react-bootstrap/Card';
import ProductCardImage from './ProductCardImageComponent';
import ProductCardDetails from './ProductCardDetailsComponent';
import AddToPurchaseButton from './AddToPoButtonComponent'

function ProductCards({ item }) {
  return (
    <Card style={{ width: 'auto', marginTop: '20px' }}>
      <ProductCardImage item={item} />
      <ProductCardDetails item={item} />
      <AddToPurchaseButton item={item} />
    </Card>
  );
}

export default ProductCards;

// Rest of the code remains the same
