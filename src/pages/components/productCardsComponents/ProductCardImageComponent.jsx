import React from 'react';
import Card from 'react-bootstrap/Card';

function ProductCardImage({ icon }) {
  return (
    
    <Card.Img
      variant="top"
      src={`data:image/png;base64,${icon}`} alt="Item Icon"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `${process.env.PUBLIC_URL}/product-images/errorImage.jpg`;
      }}
    />
  );
}

export default ProductCardImage;
