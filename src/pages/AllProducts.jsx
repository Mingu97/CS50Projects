import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchBarComponent from './components/SearchBarComponent';
import PaginationComponent from './components/PaginationComponent';
import ProductCard from './components/productCardsComponents/ProductCard';
import { fetchProducts, CaseInsensitive } from './components/api'; // Import functions and constants

const AllProducts = ({productFields}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 12; // Set the number of items per page

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  // Check if products are available
  if (products.length === 0) {
    return (
      <Container>
        <p>Loading products...</p>
      </Container>
    );
  }

  // Function to filter products based on case-insensitive search query
  const filteredProducts = CaseInsensitive(Object.values(products), searchQuery);

  // Calculate the start and end indices for the current page
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredProducts.length);

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
          {filteredProducts.slice(startIndex, endIndex).map((product) => (
            <ProductCard key={product.id} product={product} productFields={productFields} />
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
