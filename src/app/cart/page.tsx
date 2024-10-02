"use client";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

// Cart Page Component
const CartPage = () => {
  // Cart items state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Naruto Uzumaki",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/150?text=Naruto",
    },
    {
      id: 2,
      name: "Sasuke Uchiha",
      price: 39.99,
      quantity: 2,
      image: "https://via.placeholder.com/150?text=Sasuke",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Function to increase quantity
  const increaseQuantity = (id: any) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id: any) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeItem = (id: any) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Function to apply coupon code
  const applyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(10); // Apply 10% discount
    } else {
      setDiscount(0);
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate total after discount
  const total = subtotal - (subtotal * discount) / 100;

  return (
    <div className="bg-primary min-h-screen py-16">
      <section className="max-w-7xl mx-auto p-4">
        <h1 className=" text-gray-100 font-semibold text-4xl mb-8">
          Shopping Cart
        </h1>

        {/* Cart Items with Grid Layout */}
        <div className="bg-neutral-900 p-4 rounded-lg mb-8">
          {cartItems.length === 0 ? (
            <p className="text-white">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-4 gap-4 items-center">
              {/* Header Row */}
              <div className="col-span-1 text-white font-bold">Product</div>
              <div className="col-span-1 text-right text-white font-bold">
                Quantity
              </div>
              <div className="col-span-1 text-right text-white font-bold">
                Price
              </div>
              <div className="col-span-1 text-right text-white font-bold">
                Remove
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="col-span-4 grid grid-cols-4 subgrid py-4 border-b border-neon-pink"
                >
                  {/* Product Image and Name */}
                  <div className="col-span-1 w-fit flex flex-col md:flex-row gap-1 items-center md:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="md:w-24 size-12 md:h-24 object-cover border mr-auto rounded-lg"
                    />
                    <div>
                      <h3 className="text-white text-sm md:text-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="col-span-1 flex items-center gap-2 md:gap-4 h-fit justify-end">
                    <button
                      className="bg-neon-blue text-white size-6 md:size-auto md:py-2 py-1 md:px-4 px-2 flex items-center justify-center   rounded-lg"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      className="bg-neon-blue text-white size-6 md:size-auto md:py-2 py-1 md:px-4 px-2 flex items-center justify-center  rounded-lg"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Price for the quantity */}
                  <div className="col-span-1 text-neon-green text-lg text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 text-right">
                    <button
                      className="bg-red-600 ml-auto text-white md:py-2 py-2 md:px-4 px-2 flex items-center gap-2 rounded-lg hover:bg-neon-green transition duration-300"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                      <p className=" hidden md:block">Remove</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coupon Code Section */}
        <div className="bg-neutral-900 p-4 rounded-lg mb-8">
          <h2 className=" text-white font-semibold text-2xl mb-4">
            Apply Coupon
          </h2>
          <input
            type="text"
            className=" bg-transparent border focus:outline-none text-white py-2 px-4 border-gray-400 rounded-lg w-full mb-4"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="bg-p-green text-white py-2 px-4 rounded-lg hover:bg-p-green/90 transition duration-300"
            onClick={applyCoupon}
          >
            Apply Coupon
          </button>
          {discount > 0 && (
            <p className="text-neon-green mt-4">Coupon Applied: {discount}%</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-dark-gray p-4 rounded-lg">
          <h2 className=" text-gray-100 font-semibold text-2xl mb-4">
            Cart Summary
          </h2>
          <div className="flex justify-between text-white mb-4">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-neon-green mb-4">
            <p>Discount ({discount}%):</p>
            <p>-${((subtotal * discount) / 100).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-neon-yellow text-2xl font-bold mb-8">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <button className=" bg-p-green text-white py-3 px-8 rounded-lg hover:bg-p-green/90 font-semibold transition duration-300 w-full">
            Proceed to Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
