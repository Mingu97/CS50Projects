// SearchBar.js
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const SearchBarComponent = ({ searchQuery, setSearchQuery, setCurrentPage }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search for products..."
        aria-label="Search for products..."
        aria-describedby="search-bar"
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
    </InputGroup>
  );
};

export default SearchBarComponent;
