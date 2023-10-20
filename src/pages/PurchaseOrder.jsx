import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './components/purchaseOrderTableComponents/TableHeaderComponent';
import TableRow from './components/purchaseOrderTableComponents/TableRowComponent';

const PurchaseOrders = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('selectedItems');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setSelectedItems(parsedItems);
    }
  }, []);

  return (
    <div>
      <h2>Purchase Order</h2>
      <Table striped bordered hover>
        <TableHeader headers={['Supplier Product Code', 'Brand', 'Description', 'Item Code']} />
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
