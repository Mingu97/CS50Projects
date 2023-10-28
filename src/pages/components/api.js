// api.js

// Function to fetch products from the API
export const fetchProducts = async () => {
  try {
    const response = await fetch("/api/rsitems");
    const data = await response.json();
    return data; // Assuming data is an array of objects
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to calculate page indices
export function CalcPageIndices(currentPage, filteredProducts, pageSize = 12) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data to get items for the current page
  const itemsForCurrentPage = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return { totalPages, endIndex, itemsForCurrentPage };
}

// Function to filter products based on a case-insensitive search query
export function CaseInsensitive(products, searchQuery) {
  if (!Array.isArray(products)) {

    return [];
  }
  return products.filter((product) => {
    // Assuming you want to filter by the 'name' property of the object
    const name = (product['name'] && product['name'].toLowerCase()) || '';
    return name.includes(searchQuery.toLowerCase());
  });
}
