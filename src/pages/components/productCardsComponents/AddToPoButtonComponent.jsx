import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelectedItems } from '../../SelectedItemsComponent';

function AddToPurchaseButton({ item }) {
  const addToPurchaseOrder = CreatePO(item);

  return (
    <Button variant="primary" onClick={() => addToPurchaseOrder(item)}>
      Add to PO
    </Button>
  );
}

function CreatePO(item) {
  const { dispatch } = useSelectedItems();
  const addToPurchaseOrder = () => {
    console.log('Adding item to purchase order:', item);
    dispatch({ type: 'ADD_ITEM', payload: item });
    // Retrieve the current selected items from local storage
    const storedItems = localStorage.getItem('selectedItems');
    const updatedSelectedItems = storedItems ? JSON.parse(storedItems) : [];

    // Add the new item to the selected items
    updatedSelectedItems.push(item);

    // Save the updated selected items back to local storage
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
  };
  return addToPurchaseOrder;
}

export default AddToPurchaseButton;
