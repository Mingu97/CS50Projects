const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors'); // Import the cors middleware
const path = require('path');


const app = express();
const port = 3000; // Set your desired port

app.use(cors()); // Enable CORS for all routes
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

const uri = "mongodb+srv://mingdmin:VFepsBpPlsYEXKds@katalog.i3qsrh8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/api/products', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('katalog');
    const products = database.collection('_products');

    const productList = await products.find({"Item Status": "Approved"}).toArray();
    
    res.json(productList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  } finally {
    await client.close();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
