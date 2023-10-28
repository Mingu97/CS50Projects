// ProductCard.js
import React from 'react';
import Col from 'react-bootstrap/Col';
import ProductCards from './ProductCards';

const ProductCard = ({ product, productFields }) => {
  return (
    <Col key={product.id} md={3}>
      <ProductCards item={product} productFields={productFields} />
    </Col>
  );
}

export default ProductCard;
