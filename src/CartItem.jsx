import React from "react";
import "./CartItem.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // ดึง items จาก Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // เพิ่มจำนวน +1
  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ลดจำนวน -1 (กันไม่ให้ต่ำกว่า 1)
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // ลบ item ออกจาก cart
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // คำนวณ subtotal ต่อ item
  const calculateItemSubtotal = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // "$15" -> 15
    return (unitPrice * item.quantity).toFixed(2);
  };

  // คำนวณ total cost ทั้ง cart
  const calculateTotalCost = () => {
    const total = cartItems.reduce((sum, item) => {
      const unitPrice = parseFloat(item.cost.substring(1));
      return sum + unitPrice * item.quantity;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-card" key={item.name}>
              <img className="cart-image" src={item.image} alt={item.name} />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>

                <div className="cart-qty">
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>

                <p>Subtotal: ${calculateItemSubtotal(item)}</p>

                <button
                  className="delete-button"
                  onClick={() => handleRemove(item.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h3 className="cart-total">Total Cost: ${calculateTotalCost()}</h3>

          <div className="cart-actions">
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button className="checkout-button">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
