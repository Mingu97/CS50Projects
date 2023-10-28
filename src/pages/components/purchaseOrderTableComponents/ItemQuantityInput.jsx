import React, { useState } from 'react';

function ItemQuantityInput({ item, onQuantityChange }) {
    const [quantity, setQuantity] = useState(item['Item Quantity']);
  
    const handleQuantityChange = (event) => {
      const newQuantity = event.target.value;
      setQuantity(newQuantity);
      onQuantityChange(item, newQuantity);
    };
  
    return (
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
      />
    );
  }

  export default ItemQuantityInput;