import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelectedItems } from '../SelectedItemsComponent';
import Form from 'react-bootstrap/Form';

function AddToPurchaseButton({ item }) {
  const [quantity, setQuantity] = useState(1);
  const addToPurchaseOrder = CreatePO(item, quantity);


  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="quantity-form">
          <Form.Control type="number" placeholder="Quantity" value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              console.log(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary"
          onClick={() =>
          (
            addToPurchaseOrder(item)
          )
          }
        >
          Add to PO
        </Button>
      </Form>
    </>
  );
}

function CreatePO(item, quantity) {
  const { dispatch } = useSelectedItems();
  const addToPurchaseOrder = () => {
    const itemsWithQuantity = {...item, "Item Quantity": quantity}
    console.log('Adding item to purchase order:', itemsWithQuantity);
    dispatch({ type: 'ADD_ITEM', payload: itemsWithQuantity});
    // Retrieve the current selected items from local storage
    const storedItems = localStorage.getItem('selectedItems');
    const updatedSelectedItems = storedItems ? JSON.parse(storedItems) : [];

    // Add the new item to the selected items
    updatedSelectedItems.push(itemsWithQuantity);

    // Save the updated selected items back to local storage
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
  };
  return addToPurchaseOrder;
}

export default AddToPurchaseButton;
