'use client';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

// Cart Page Component
const CartPage = () => {
  // Cart items state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Naruto Uzumaki',
      price: 29.99,
      quantity: 1,
      image: 'https://via.placeholder.com/150?text=Naruto',
    },
    {
      id: 2,
      name: 'Sasuke Uchiha',
      price: 39.99,
      quantity: 2,
      image: 'https://via.placeholder.com/150?text=Sasuke',
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
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
    if (couponCode === 'DISCOUNT10') {
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
    <div className="min-h-screen bg-primary py-16">
      <section className="mx-auto max-w-7xl p-4">
        <h1 className="mb-8 text-4xl font-semibold text-gray-100">
          Shopping Cart
        </h1>

        {/* Cart Items with Grid Layout */}
        <div className="mb-8 rounded-lg bg-neutral-900 p-4">
          {cartItems.length === 0 ? (
            <p className="text-white">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              {/* Header Row */}
              <div className="col-span-1 font-bold text-white">Product</div>
              <div className="col-span-1 text-right font-bold text-white">
                Quantity
              </div>
              <div className="col-span-1 text-right font-bold text-white">
                Price
              </div>
              <div className="col-span-1 text-right font-bold text-white">
                Remove
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="subgrid col-span-4 grid grid-cols-4 border-b border-neon-pink py-4"
                >
                  {/* Product Image and Name */}
                  <div className="col-span-1 flex w-fit flex-col items-center gap-1 md:flex-row md:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mr-auto size-12 rounded-lg border object-cover md:h-24 md:w-24"
                    />
                    <div>
                      <h3 className="text-sm text-white md:text-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="col-span-1 flex h-fit items-center justify-end gap-2 md:gap-4">
                    <button
                      className="flex size-6 items-center justify-center rounded-lg bg-neon-blue px-2 py-1 text-white md:size-auto md:px-4 md:py-2"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      className="flex size-6 items-center justify-center rounded-lg bg-neon-blue px-2 py-1 text-white md:size-auto md:px-4 md:py-2"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Price for the quantity */}
                  <div className="col-span-1 text-right text-lg text-neon-green">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 text-right">
                    <button
                      className="ml-auto flex items-center gap-2 rounded-lg bg-red-600 px-2 py-2 text-white transition duration-300 hover:bg-neon-green md:px-4 md:py-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                      <p className="hidden md:block">Remove</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coupon Code Section */}
        <div className="mb-8 rounded-lg bg-neutral-900 p-4">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Apply Coupon
          </h2>
          <input
            type="text"
            className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="rounded-lg bg-p-green px-4 py-2 text-white transition duration-300 hover:bg-p-green/90"
            onClick={applyCoupon}
          >
            Apply Coupon
          </button>
          {discount > 0 && (
            <p className="mt-4 text-neon-green">Coupon Applied: {discount}%</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="rounded-lg bg-dark-gray p-4">
          <h2 className="mb-4 text-2xl font-semibold text-gray-100">
            Cart Summary
          </h2>
          <div className="mb-4 flex justify-between text-white">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="mb-4 flex justify-between text-neon-green">
            <p>Discount ({discount}%):</p>
            <p>-${((subtotal * discount) / 100).toFixed(2)}</p>
          </div>
          <div className="mb-8 flex justify-between text-2xl font-bold text-neon-yellow">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <button className="w-full rounded-lg bg-p-green px-8 py-3 font-semibold text-white transition duration-300 hover:bg-p-green/90">
            Proceed to Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
