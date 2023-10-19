import './App.css';
import ToolBar from './Navbar';
import AllProducts from './pages/all-products';
import PurchaseOrders from './pages/purchase_order';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/esm/Container';
import { SelectedItemsProvider } from './pages/SelectedItemsComponent';

function App() {
  console.log('App rendering');
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
                  <AllProducts />
                </SelectedItemsProvider>
              }
            />
            <Route
              path="/purchase-order"
              element={
                <SelectedItemsProvider>
                  <PurchaseOrders />
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
