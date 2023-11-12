const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./api/routes/userRoutes');
const { client } = require('./api/db');
const jwt = require('jsonwebtoken');
const purchaseOrderRoutes = require('./api/routes/purchaseOrderRoutes');
const cookieParser = require('cookie-parser');

require('dotenv').config(); // environment variables from a .env file

const app = express()
const port = process.env.PORT || 8080; // port 8080 if the PORT environment variable is not set

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3001', // frontend origin
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    await client.connect();
    req.db = client.db('katalog');
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/users', userRoutes);
app.use('/api/purchase-order', purchaseOrderRoutes)

app.get('/api/products', async (req, res, next) => {
  try {
    const products = req.db.collection('_products');
    const productList = await products.find({ "Item Status": "Approved" }).toArray();
    res.json(productList);
  } catch (err) {
    next(err);
  }
});


// static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
