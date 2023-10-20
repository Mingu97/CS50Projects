import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchBarComponent from './SearchBarComponent';
import PaginationComponent from './PaginationComponent';
import ProductCard from './productCardsComponents/ProductCard';
import { fetchProducts, CalcPageIndices, CaseInsensitive } from './api'; // Import functions and constants

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchProducts().then((data) => setProducts(data));
  }, []);

  // Function to filter products based on case-insensitive search query
  const filteredProducts = CaseInsensitive(products, searchQuery);

  // Calculate the start and end indices for the current page
  const { totalPages, endIndex, itemsForCurrentPage } = CalcPageIndices(currentPage, filteredProducts);

  return (
    <Container>
      <Container style={{ margin: '40px', justifyContent: 'center' }}>
        <SearchBarComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
      </Container>

      <Container>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} endIndex={endIndex} filteredProducts={filteredProducts} />
      </Container>

      <Container style={{ margin: '40px', justifyContent: 'center' }}>
        <Row style={{ margin: '20px' }}>
          {itemsForCurrentPage.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Row>
      </Container>

      <Container>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} endIndex={endIndex} filteredProducts={filteredProducts} />
      </Container>
    </Container>
  );
};

export default AllProducts;
