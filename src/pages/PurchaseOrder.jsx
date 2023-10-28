import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './components/purchaseOrderTableComponents/TableHeaderComponent';
import TableRow from './components/purchaseOrderTableComponents/TableRowComponent';
import Container from 'react-bootstrap/Container'
import RemoveAllButton from './components/purchaseOrderTableComponents/RemoveAllButtonComponent';
import SavePOButton from './components/purchaseOrderTableComponents/SavePOButtonComponent';



const PurchaseOrders = () => {
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    const storedItems = localStorage.getItem('selectedItems');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setSelectedItems(parsedItems);
      console.log(parsedItems)
    }
  }, []);

  const handleQuantityChange = (item, newQuantity) => {
    // Update the quantity of the specific item in the state
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem['Item Code'] === item['Item Code']) {
        return { ...selectedItem, "Item Quantity": newQuantity };
      }
      return selectedItem;
    });

    // Update the state with the modified items
    setSelectedItems(updatedItems);

    // Update local storage with the modified items
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };
  const handleRemoveAll = () => {
    // Clear the selected items from local storage and reset the state
    localStorage.removeItem('selectedItems');
    setSelectedItems([]);
  };
  const handleSavePO = (savedPO) => {
    // Log the saved PO object for now
    console.log('Saved Purchase Order:', savedPO);
  };

  return (
    <Container fluid style={{ marginTop: '50px' }}>
      <h2 style={{
        fontFamily: `Montserrat`,
        color: '#10656d'
      }}>Purchase Order</h2>

      <Table id="purchaseOrderTable"  striped bordered hover>
        <TableHeader headers={['Supplier Product Code', 'Brand', 'Description', 'Item Code', 'Item Quantity']} />
        <tbody>
          {selectedItems.map((item, index) => (
            <TableRow key={index} item={item} onQuantityChange={handleQuantityChange} />
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <RemoveAllButton onRemoveAll={handleRemoveAll} />
        <div style={{ marginLeft: '10px' }} /> {/* Add a custom margin for separation */}
        <SavePOButton onSavePO={handleSavePO} selectedItems={selectedItems} />
      </div>
    </Container>
  );
};

export default PurchaseOrders;
