const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./api/routes/userRoutes');
const { client } = require('./api/db');
const jwt = require('jsonwebtoken');



require('dotenv').config(); // Load environment variables from a .env file

const app = express()
const port = process.env.PORT || 8080; // Use port 8080 if the PORT environment variable is not set

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend origin
  credentials: true,
};

app.use(cors(corsOptions));


//ROUTE PROTECTION

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', userRoutes);

app.get('/api/products', async (req, res, next) => {
  try {
    await client.connect();

    const database = client.db('katalog');
    const products = database.collection('_products');

    const productList = await products.find({ "Item Status": "Approved" }).toArray();

    res.json(productList);
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
