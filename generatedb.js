const fs = require('fs');

// Function to generate random data
const generateRandomData = () => {
  const suppliers = ['SupplierA', 'SupplierB', 'SupplierC'];
  const brands = ['BrandX', 'BrandY', 'BrandZ'];
  const descriptions = ['Product1', 'Product2', 'Product3'];
  const itemCodes = ['ABC123', 'DEF456', 'GHI789'];
  const itemQuantities = [10, 20, 30];
  const singleUnitMeasures = ['Piece', 'Box', 'Set'];
  const unitsOfMeasure = ['Dozen', 'Case', 'Each'];
  const itemStatus = ['Approved']

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  return {
    'Supplier Product Code': `${getRandomElement(suppliers)}-${getRandomElement(itemCodes)}`,
    'Brand': getRandomElement(brands),
    'Description': getRandomElement(descriptions),
    'Item Code': getRandomElement(itemCodes),
    'Item Quantity': getRandomElement(itemQuantities),
    'Single Unit Measure': getRandomElement(singleUnitMeasures),
    'Unit of Measure': getRandomElement(unitsOfMeasure),
    'Item Status': getRandomElement(itemStatus)
  };
};

// Function to generate an array of test data
const generateTestDataArray = (count) => {
  const testDataArray = [];
  for (let i = 0; i < count; i++) {
    testDataArray.push(generateRandomData());
  }
  return testDataArray;
};

// Number of test data objects to generate
const numberOfTestDataObjects = 10;

// Generate test data
const testData = generateTestDataArray(numberOfTestDataObjects);

// Write test data to a JSON file
fs.writeFileSync('testData.json', JSON.stringify(testData, null, 2));

console.log(`Test data generated and saved to 'testData.json'.`);
