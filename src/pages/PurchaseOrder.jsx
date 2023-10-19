import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'

const PurchaseOrders = () => {
    // Define a state variable to store the selected items
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Retrieve selected items from local storage
        const storedItems = localStorage.getItem('selectedItems');
        if (storedItems) {
            const parsedItems = JSON.parse(storedItems);
            setSelectedItems(parsedItems);
        }
    }, []); // Empty dependency array to run this effect once

    return (
        <div>
            <h2>Purchase Order</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Supplier Product Code</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Item Code</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item['Supplier Product Code']}</td>
                            <td>{item['Brand']}</td>
                            <td>{item['Description']} {item['Single Unit Measure']} {item['Unit of Measure']}</td>
                            <td>{item['Item Code']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PurchaseOrders;
