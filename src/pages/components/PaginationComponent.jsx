// Pagination.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PaginationComponent = ({ currentPage, totalPages, setCurrentPage, endIndex, filteredProducts }) => {
  return (
    <Row className='justify-content-md-center'>
      {/* Previous Button */}
      <Col xs='auto'>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </Button>
      </Col>
      {/* Page Number Input */}
      <Col xs='auto'>
        <InputGroup className='mb-3' style={{ width: '105px' }}>
          <Form.Control
            placeholder={currentPage + ' of ' + totalPages}
            aria-label='Page'
            aria-describedby='page-number'
            type='number'
            onChange={(e) => {
              const pageNumber = parseInt(e.target.value, 10);
              if (isNaN(pageNumber) || pageNumber > totalPages || pageNumber < 1) {
                setCurrentPage(1);
              } else {
                setCurrentPage(pageNumber);
              }
            }}
          />
        </InputGroup>
      </Col>
      {/* Next Button */}
      <Col xs='auto'>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredProducts.length}>
          Next
        </Button>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
