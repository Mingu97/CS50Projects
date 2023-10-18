import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCards({ item, addToPurchaseOrder}) {
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
        <Button variant="primary">Add to PO</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCards;