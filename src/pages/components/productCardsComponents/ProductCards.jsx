import React from 'react';
import Card from 'react-bootstrap/Card';
import ProductCardImage from './ProductCardImageComponent';
import ProductCardDetails from './ProductCardDetailsComponent';
import AddToPurchaseButton from './AddToPoButtonComponent'

function ProductCards({ item, productFields }) {
  return (
    <Card style={{ width: 'auto', marginTop: '20px' }}>
      <ProductCardImage icon={item['icon']} />
      <ProductCardDetails item={item} productFields={productFields} />
      <AddToPurchaseButton item={item} />
    </Card>
  );
}

export default ProductCards;
