import './App.css';
import ToolBar from './Navbar';
import AllProducts from './pages/all-products';
import PurchaseOrders from './pages/purchase_order';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/home",
    element: <div>Hello world!</div>,
  },
  {
    path: "/all-products",
    element: <AllProducts />,
  },
  {
    path: "/purchase-order",
    element: <PurchaseOrders />,
  }
]);
function App() {
  return (
    <div className="App">
      <header>
        <ToolBar />
        <Container className="text-center">
          <h1>Welcome to Katalog</h1>
        </Container>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
