// api.js

// Function to fetch products from the API
export const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  // Function to calculate page indices
  export function CalcPageIndices(currentPage, filteredProducts) {
    const pageSize = 12;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    // Slice the data to get items for the current page
    const itemsForCurrentPage = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    return { totalPages, endIndex, itemsForCurrentPage };
  }
  
  // Function to filter products based on a case-insensitive search query
  export function CaseInsensitive(products, searchQuery) {
    return products.filter((product) => {
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
  }
  