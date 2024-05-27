import React, { useEffect, useState } from "react";
import "./products.scss";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, updateProduct, removeProduct } from '../../features/slices/productSlice';
import { addItem } from '../../features/slices/cartSlice';
import { selectAllProducts } from '../../selectors/productSelectors';
import { toast } from "react-toastify";
import axios from 'axios';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    price: '',
    rating: ''
  });
  const [isSorted, setIsSorted] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        dispatch(setProducts(parsedProducts));
        setOriginalProducts(parsedProducts);
      } else {
        try {
          let response = await axios.get('https://my-json-server.typicode.com/bot16111011/data/products');
          dispatch(setProducts(response.data));
          setOriginalProducts(response.data);
          localStorage.setItem('products', JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching from /productdata, trying /data.json", error);
        }
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleEditClick = (product) => {
    setIsEditing(product.id);
    setEditForm(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://my-json-server.typicode.com/bot16111011/data/products/${editForm.id}`, editForm);
      dispatch(updateProduct(editForm));
      setIsEditing(null);
      const updatedProducts = products.map(product => 
        product.id === editForm.id ? editForm : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product on server:", error);
      try {
        // Update locally stored products
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = storedProducts.map(product => 
          product.id === editForm.id ? editForm : product
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        dispatch(updateProduct(editForm));
        setIsEditing(null);
        toast.success("Product updated locally!");
      } catch (localError) {
        console.error("Error updating product locally:", localError);
        toast.error("Failed to update product");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://my-json-server.typicode.com/bot16111011/data/products/${id}`);
      dispatch(removeProduct(id));
      const updatedProducts = products.filter(product => product.id !== id);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      toast.success("Product removed successfully!");
    } catch (error) {
      console.error("Error deleting product on server:", error);
      try {
        // Update locally stored products
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = storedProducts.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        dispatch(removeProduct(id));
        toast.success("Product removed locally!");
      } catch (localError) {
        console.error("Error deleting product locally:", localError);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleSortClick = () => {
    if (isSorted) {
      dispatch(setProducts(originalProducts));
    } else {
      const sortedProducts = [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      dispatch(setProducts(sortedProducts));
    }
    setIsSorted(!isSorted);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success("Product added to cart!");
  };

  return (
    <>
      <Navbar />
      <div className="productColumn">
        <button 
          className="sort" 
          onClick={handleSortClick} 
          style={{ backgroundColor: isSorted ? "#007bff" : "red", color:"white"}}
        >
          {isSorted ? "Sort by Id" : "Sort by Price"}
        </button>
        <div className="wrapper">
          {products.map((product) => (
            <div className="Product" key={product.id}>
              {isEditing === product.id ? (
                <form onSubmit={handleSave}>
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
                  <textarea name="description" value={editForm.description} onChange={handleEditChange}></textarea>
                  <input type="text" name="image" value={editForm.image} onChange={handleEditChange} />
                  <input type="text" className="smallBox" name="price" value={editForm.price} onChange={handleEditChange} />
                  <input type="text" className="smallBox" name="rating" value={editForm.rating} onChange={handleEditChange} />
                  <button type="submit" style={{ color: "white", backgroundColor: "#007bff" }}>Save</button>
                  <button type="button" style={{ color: "white", backgroundColor: "rgb(146, 21, 21)" }} onClick={() => handleDelete(product.id)}>Remove</button>
                </form>
              ) : (
                <>
                  <h2>{product.name}</h2>
                  <span className="description">{product.description}</span>
                  <img src={product.image} alt={product.name} />
                  <button className="price">Price: <span>{product.price}</span></button>
                  <button className="rating">Rating: <span>{product.rating}</span></button>
                  <button className="edit" onClick={() => handleEditClick(product)}>Edit</button>
                  <button className="cart" onClick={() => handleAddToCart(product)}>Cart</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
