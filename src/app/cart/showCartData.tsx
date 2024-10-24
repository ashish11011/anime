'use client';
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import axios from 'axios';

// Cart Page Component
const ShowCartData = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  // Fetch products from the API based on stored product IDs
  useEffect(() => {
    const fetchCartProducts = async () => {
      const storedCart = localStorage.getItem('cart');
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      const productIds = parsedCart.map((item: any) => item.id);

      if (productIds.length > 0) {
        try {
          // Fetch products from the API
          const response = await axios.post('/api/products', {
            ids: productIds,
          });
          const products = response.data;

          // Merge product details with quantities from localStorage
          const updatedCartItems = parsedCart.map((cartItem: any) => {
            const product = products.find(
              (prod: any) => prod.id === cartItem.id
            );
            return { ...product, quantity: cartItem.quantity };
          });

          setCartItems(updatedCartItems);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
      setLoading(false);
    };

    fetchCartProducts();
  }, []);

  // Update localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to increase quantity
  const increaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Function to apply coupon code
  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10);
    } else if (couponCode === 'ASHISH100') {
      setDiscount(100);
    } else {
      setDiscount(0);
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  // Calculate total after discount
  const total = subtotal - (subtotal * discount) / 100;

  // Handle form submission for order
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    return;
    // Prepare order data
    const orderData = {
      user: userDetails,
      items: cartItems,
      total,
    };

    try {
      // Send order request to the backend
      await axios.post('/api/orders', orderData);
      alert('Order placed successfully!');
      // Clear cart and user details
      localStorage.removeItem('cart');
      setCartItems([]);
      setUserDetails({ name: '', email: '', mobile: '', address: '' });
      setShowCheckoutForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

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
                  className="subgrid col-span-4 grid grid-cols-4 border-b border-gray-400 py-4"
                >
                  {/* Product Image and Name */}
                  <div className="col-span-1 flex w-fit flex-col items-center gap-1 md:flex-row md:space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="mr-auto size-12 rounded-lg border object-cover md:h-24 md:w-24"
                    />
                    <div>
                      <h3 className="line-clamp-2 text-sm text-white md:text-lg">
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
                  <div className="col-span-1 text-right text-lg text-p-green">
                    ₹{(item.discountPrice * item.quantity).toFixed(2)}
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
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="mb-4 flex justify-between text-neon-green">
            <p>Discount ({discount}%):</p>
            <p>-₹{((subtotal * discount) / 100).toFixed(2)}</p>
          </div>
          <div className="mb-8 flex justify-between text-2xl font-bold text-neon-yellow">
            <p>Total:</p>
            <p>₹{total.toFixed(2)}</p>
          </div>

          <button
            className="w-full rounded-lg bg-p-green px-8 py-3 font-semibold text-white transition duration-300 hover:bg-p-green/90"
            onClick={() => setShowCheckoutForm(true)}
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Checkout Form */}
        {showCheckoutForm && (
          <form
            onSubmit={handleOrderSubmit}
            className="mt-8 rounded-lg bg-neutral-900 p-4"
          >
            <h2 className="mb-4 text-2xl font-semibold text-white">Checkout</h2>

            <div className="mb-4">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
                placeholder="Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                className="w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="tel"
                className="w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
                placeholder="Mobile Number"
                value={userDetails.mobile}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, mobile: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
                placeholder="Address"
                value={userDetails.address}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-p-green px-8 py-3 font-semibold text-white transition duration-300 hover:bg-p-green/90"
            >
              Place Order
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ShowCartData;
