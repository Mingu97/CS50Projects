const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./api/routes/userRoutes');
const { client } = require('./api/db');
const jwt = require('jsonwebtoken');
const purchaseOrderRoutes = require('./api/routes/purchaseOrderRoutes');
const cookieParser = require('cookie-parser');
const authenticate = require('./api/controllers/authMiddleware');
require('dotenv').config(); // environment variables from a .env file

const app = express();
const port = process.env.PORT || 8080; // port 8080 if the PORT environment variable is not set

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
}));

app.use(cookieParser());

// Connect to the database once during your application's startup
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Use the database connection in your middleware
app.use((req, res, next) => {
  req.db = client.db('katalog');
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/purchase-order', authenticate, purchaseOrderRoutes);

app.get('/api/products', authenticate, async (req, res, next) => {
  try {
    const products = req.db.collection('_products');
    const productList = await products.find({ "Item Status": "Approved" }).toArray();
    console.log("Sending");
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

// Close the connection when your application is shutting down
process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
