import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './components/purchaseOrderTableComponents/TableHeaderComponent';
import TableRow from './components/purchaseOrderTableComponents/TableRowComponent';

const PurchaseOrders = (productFields) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('selectedItems');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setSelectedItems(parsedItems);
      console.log(parsedItems)
    }
  }, []);
  console.log(selectedItems)
  return (
    <div>
      <h2>Purchase Order</h2>
      <Table striped bordered hover>
      <TableHeader headers={productFields} />
        <tbody>
          {selectedItems.map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseOrders;
