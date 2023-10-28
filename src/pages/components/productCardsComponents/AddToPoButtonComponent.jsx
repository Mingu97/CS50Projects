import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useSelectedItems} from '../SelectedItemsComponent'

function AddToPurchaseButton({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [buttonLabel, setButtonLabel] = useState('Add to PO');
  const [buttonClass, setButtonClass] = useState('button');

  const { dispatch } = useSelectedItems();

  const addToPurchaseOrder = () => {
    console.log(item['Item Code']);
    const itemsWithQuantity = { ...item, "Item Quantity": quantity };
    console.log('Adding item to the purchase order:', itemsWithQuantity);

    // Retrieve the current selected items from local storage
    const storedItems = localStorage.getItem('selectedItems');
    const updatedSelectedItems = storedItems ? JSON.parse(storedItems) : [];

    // Check if the item with the same 'Item Code' already exists in the selected items
    const itemExists = updatedSelectedItems.some(
      (selectedItem) => selectedItem['Item Code'] === item['Item Code']
    );

    if (itemExists) {
      console.log('Item already exists in the purchase order. Handle it here.');
      setButtonLabel('Already in PO');
      setButtonClass('already-in-po');
    } else {
      // If the item is not in the purchase order, add it.
      dispatch({ type: 'ADD_ITEM', payload: itemsWithQuantity });
      updatedSelectedItems.push(itemsWithQuantity);
      // Save the updated selected items back to local storage
      localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
      console.log('Item added to the purchase order.');
      setButtonLabel('Added in PO');
      setButtonClass('added');
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="quantity-form">
          <Form.Control
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              console.log(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary"
          className={buttonClass}
          onClick={addToPurchaseOrder}
        >
          {buttonLabel}
        </Button>
      </Form>
    </>
  );
}

export default AddToPurchaseButton;
