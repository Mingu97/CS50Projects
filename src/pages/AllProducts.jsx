import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCards from './ProductCards';
import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


const pageSize = 12; // Number of items per page

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to filter products based on case-insensitive search query
  const filteredProducts = products.filter((product) => {
    const description = product['Description'] && product['Description'].toLowerCase();
    const supplierProductCode = product['Supplier Product Code'] && product['Supplier Product Code'].toString();
    const brand = product['Brand'] && product['Brand'].toLowerCase();

    // Concatenate brand and description
    const brandAndDescription = `${brand} ${description}`;

    return (
      (brandAndDescription && brandAndDescription.includes(searchQuery.toLowerCase())) ||
      (supplierProductCode && supplierProductCode.includes(searchQuery))
    );
  });


  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data to get items for the current page
  const itemsForCurrentPage = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <Container>
      <Container style={{ margin: '40px', justifyContent: 'center' }}>
        {/* Search Bar */}

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

      </Container>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs='auto'>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </Button>
          </Col>
          <Col xs='auto'>
            <InputGroup className='mb-3' style={{ width: '105px' }}>
              <Form.Control placeholder={currentPage + ' of ' + totalPages}
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
              >
              </Form.Control>
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= filteredProducts.length}>
              Next
            </Button>
          </Col>
        </Row>

      </Container>
      <Container style={{ margin: '40px', justifyContent: 'center' }}>
        <Row style={{ margin: '20px' }}>
          {itemsForCurrentPage.map((product) => (
            <Col key={product._id} md={3}>
              <ProductCards item={product} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container>
        <Row className='justify-content-md-center'>
          <Col xs='auto'>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </Button>
          </Col>
          <Col xs='auto'>
            <InputGroup className='mb-3' style={{ width: '105px' }}>
              <Form.Control placeholder={currentPage + ' of ' + totalPages}
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
              >
              </Form.Control>
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= filteredProducts.length}>
              Next
            </Button>
          </Col>
        </Row>

      </Container>

    </Container >
  );
};

export default AllProducts;
