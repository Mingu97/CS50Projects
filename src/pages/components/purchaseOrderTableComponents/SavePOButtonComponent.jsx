import React from 'react';
import Button from 'react-bootstrap/Button';
import generatePDF from './generatePDF';

function SavePOButton({ onSavePO, selectedItems }) {
    const handleSavePO = () => {
        // Create the object to represent the saved PO
        const savedPO = { items: selectedItems };

        // Call the provided callback to save the PO
        onSavePO(savedPO);
        // Generate and save the PDF
        generatePDF('purchaseOrderTable', 'Purchase Order');

    };

    return (
        <Button variant="success" onClick={handleSavePO}>
            Save PO
        </Button>
    );
}

export default SavePOButton;
