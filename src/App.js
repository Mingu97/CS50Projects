import './App.css';
import ToolBar from './pages/components/NavBarComponent.jsx';
import AllProducts from './pages/AllProducts';
import PurchaseOrders from './pages/PurchaseOrder';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { SelectedItemsProvider } from './pages/components/SelectedItemsComponent';
import React from 'react'

function App() {
  console.log('App rendering');

  //Real Life 
  //const productFields = ['Item Code', 'Supplier Product Code', 'Brand', 'Description', 'Single Unit Measure', 'Unit of Measure']
  
  //Runescape 
  const productFields = ['id', 'name', 'cost']
  return (
    <div className="App">
      <Router>
        <header>
          <ToolBar />
          <Container className="text-center">
            <h1>Welcome to Katalog</h1>
          </Container>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<div>Hello world!</div>}
            />
            <Route
              path="/home"
              element={<div>Hello world!</div>}
            />
            <Route
              path="/all-products"
              element={
                <SelectedItemsProvider>
                  <AllProducts productFields={productFields} /> {/* Pass productFields as a prop */}
                </SelectedItemsProvider>
              }
            />
            <Route
              path="/purchase-order"
              element={
                <SelectedItemsProvider>
                  <PurchaseOrders productFields={productFields} /> {/* Pass productFields as a prop */}
                </SelectedItemsProvider>
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
