import React from 'react';
import Card from 'react-bootstrap/Card';

function ProductCardImage({ item }) {
  console.log(process.env.PUBLIC_URL)
  return (
    <Card.Img
      variant="top"
      src={`${process.env.PUBLIC_URL}/product-images/${item['Supplier Product Code']}.jpg`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `${process.env.PUBLIC_URL}/product-images/errorImage.jpg`;
      }}
    />
  );
}

export default ProductCardImage;
