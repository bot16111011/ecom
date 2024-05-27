import "./cart.scss";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../features/slices/cartSlice';
import { selectCartItems } from '../../selectors/cartSelectors';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    toast.error("Item removed from cart!");
  };

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    const newQuantity = Math.max(1, (item.quantity || 1) + delta);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
    toast.info("Item quantity updated!");
  };

  return (
    <>
      <Navbar />
      <h2>Your Cart</h2>
      <div className="cartColumn">
        <div className="wrapper">
          {cartItems.map(item => (
            <div className="Product" key={item.id}>
              <h2>{item.name}</h2>
              <span className="description">{item.description}</span>
              <img src={item.image} alt={item.name}></img>
              <button className="price">Price: <span>{item.price}</span></button>
              <button className="rating">Rating: <span>{item.rating}</span></button>
              <div className="quantity-controls">
                <button className="control_button" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span className="quantity">{item.quantity || 1}</span>
                <button className="control_button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button className="remove" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
