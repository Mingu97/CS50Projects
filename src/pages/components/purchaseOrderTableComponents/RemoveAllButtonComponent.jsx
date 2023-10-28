import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RemoveAllButton({ onRemoveAll }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleHideConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleRemoveAll = () => {
    // Call the provided callback to clear the selected items
    onRemoveAll();
    handleHideConfirmation(); // Hide the confirmation modal after removal
  };

  return (
    <>
      <Button variant="danger" onClick={handleShowConfirmation}>
        Remove All
      </Button>

      <Modal show={showConfirmation} onHide={handleHideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all items in the purchase order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveAll}>
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveAllButton;
