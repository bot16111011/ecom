import React, { useState,useEffect } from "react";
import "./addproduct.scss";
import Navbar from "../Navbar/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, removeProduct } from '../../features/slices/productSlice';
import { toast } from "react-toastify";

const AddProduct = ({ isEditing, initialData, onSave }) => {
  const dispatch = useDispatch();
  const initialFormState = {
    name: '',
    description: '',
    image: '',
    price: '',
    rating: ''
  };

  const [form, setForm] = useState(initialData || initialFormState);
  const [originalProducts, setOriginalProducts] = useState([]);
  

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setOriginalProducts(parsedProducts);
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: isEditing ? initialData.id : uuidv4(),
      ...form
    };

    if (isEditing) {
      dispatch(updateProduct(newProduct));
    } else {
      dispatch(addProduct(newProduct));
      const updatedProducts = [...originalProducts,newProduct];
      setOriginalProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      console.log(newProduct);
    }

    if (onSave) onSave();
    console.log(form);
    setForm(initialFormState); // Reset the form state to initial state
    toast.success("Product added successfully!");
  };

  const handleDelete = () => {
    dispatch(removeProduct(initialData.id));
    if (onSave) onSave();
    toast.success("Product removed successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="addproduct">
        <div className="form-container">
          <h2>{isEditing ? 'Edit' : 'Add'} a Product</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange}></textarea>

            <label htmlFor="image">Image URL</label>
            <input type="text" id="image" name="image" value={form.image} onChange={handleChange} />

            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price" value={form.price} onChange={handleChange} />

            <label htmlFor="rating">Rating</label>
            <input type="text" id="rating" name="rating" value={form.rating} onChange={handleChange} />

            <button type="submit">{isEditing ? 'Save' : 'Add'}</button>
            {isEditing && <button type="button" onClick={handleDelete}>Remove</button>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
