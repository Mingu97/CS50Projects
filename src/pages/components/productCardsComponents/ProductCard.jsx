// ProductCard.js
import React from 'react';
import Col from 'react-bootstrap/Col';
import ProductCards from './ProductCards';

const ProductCard = ({ product }) => {
  return (
    <Col key={product._id} md={3}>
      <ProductCards item={product} />
    </Col>
  );
};

export default ProductCard;
