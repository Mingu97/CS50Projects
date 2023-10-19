import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelectedItems } from './SelectedItemsComponent';


function ProductCards({ item }) {
  const { dispatch } = useSelectedItems();
  const addToPurchaseOrder = () => {
    console.log('Adding item to purchase order:', item);
    dispatch({ type: 'ADD_ITEM', payload: item });
    // Retrieve the current selected items from local storage
    const storedItems = localStorage.getItem('selectedItems');
    const updatedSelectedItems = storedItems ? JSON.parse(storedItems) : [];

    // Add the new item to the selected items
    updatedSelectedItems.push(item);

    // Save the updated selected items back to local storage
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));

  }
  return (
    <Card style={{ width: '14rem', marginTop: '20px' }}>
      <Card.Img
        variant="top"
        src={`${process.env.PUBLIC_URL}/product-images/${item['Supplier Product Code']}.jpg`}
        onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/product-images/errorImage.jpg` }}
      />
      <Card.Body>
        <Card.Title>{item['Brand']} {item['Description']} {item['Single Unit Measure']} {item['Unit of Measure']} </Card.Title>
        <Card.Text>
          {item['Item Code']}
        </Card.Text>
        <Card.Text>
          {item['Supplier Product Code']}
        </Card.Text>
        <Button variant="primary" onClick={() => addToPurchaseOrder(item)}>Add to PO</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCards;