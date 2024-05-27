import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Products from "./components/Products/Products";
import AddProduct from "./components/Addproduct/Addproduct";
import Cart from "./components/Cart/Cart";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/e-com" element={<Products />} />
        <Route path="/e-com/products" element={<Products />} />
        <Route path="/e-com/add-product" element={<AddProduct />} />
        <Route path="/e-com/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;