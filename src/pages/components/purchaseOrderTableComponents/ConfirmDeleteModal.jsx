import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function ConfirmDeleteModal({ show, onHide, onConfirm }) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all items in the purchase order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ConfirmDeleteModal;