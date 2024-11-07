'use client';
import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

const ShowCartData = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '', // Optional field for landmark
  });

  useEffect(() => {
    const fetchCartProducts = async () => {
      const storedCart = localStorage.getItem('cart');
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      const productIds = parsedCart.map((item: any) => item.id);

      if (productIds.length > 0) {
        try {
          const response = await axios.post('/api/products', {
            ids: productIds,
          });
          const products = response.data;
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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    // if (couponCode === 'NT10') {
    //   setDiscount(10);
    // } else if (couponCode === 'AJH0') {
    //   setDiscount(100);
    // } else {
    //   setDiscount(0);
    // }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  // Delivery charge calculation
  const deliveryCharge = subtotal <= 999 ? 60 : 0;

  // Extra 10% discount if subtotal is 1999 or more
  const extraDiscount = subtotal > 1999 ? 10 : 0;
  const effectiveDiscount = discount + extraDiscount;
  const discountAmount = (subtotal * effectiveDiscount) / 100;

  const total =
    subtotal - discountAmount + deliveryCharge + (isGiftWrap ? 40 : 0);

  const handleOrderSubmit = async (e: any) => {
    e.preventDefault();

    if (total < 499) {
      alert('Minimum order amount is ₹499.');
      return;
    }

    const orderData = {
      user: {
        ...userDetails,
        address:
          `${userDetails.addressLine1}, ${userDetails.addressLine2}, ${userDetails.landmark}`.trim(),
      },
      items: cartItems || [],
      total,
      isGiftWrap,
    };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        scrollTo({ top: 0, behavior: 'smooth' });
        localStorage.removeItem('cart');
        setCartItems([]);
        setUserDetails({
          name: '',
          email: '',
          mobile: '',
          pincode: '',
          addressLine1: '',
          addressLine2: '',
          landmark: '', // Optional field for landmark
        });
        setShowCheckoutForm(false);
        setIsOrderPlaced(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 p-4">
        <div className="animate-pulse rounded-lg bg-neutral-900 py-20 text-white md:py-24"></div>
        ;
        <div className="animate-pulse rounded-lg bg-neutral-900 py-20 text-white md:py-24"></div>
        ;
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-16">
      <section className="mx-auto max-w-7xl p-4">
        <h1 className="mb-8 text-4xl font-semibold text-gray-100">
          Shopping Cart
        </h1>
        {isOrderPlaced && (
          <div className="flex flex-col gap-1">
            <p className="text-green-400"> Your Order is Placed.</p>
            <Link
              className="mb-2 text-blue-500 underline duration-200 hover:text-blue-600"
              href="/orders"
            >
              Visit Order page
            </Link>
          </div>
        )}

        <div className="mb-8 rounded-lg bg-neutral-900 p-4">
          {cartItems.length === 0 ? (
            <p className="text-white">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
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

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="subgrid col-span-4 grid grid-cols-4 border-b border-gray-400 py-4"
                >
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

                  <div className="col-span-1 flex h-fit items-center justify-end gap-2 md:gap-4">
                    <button
                      className="flex items-center justify-center rounded-lg bg-neon-blue px-1.5 py-1.5 text-white md:px-3 md:py-2.5"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      className="flex items-center justify-center rounded-lg bg-neon-blue px-1.5 py-1.5 text-white md:px-3 md:py-2.5"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="col-span-1 text-right text-lg text-p-green">
                    ₹{(item.discountPrice * item.quantity).toFixed(2)}
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      className="ml-auto flex items-center gap-2 rounded-lg bg-red-600 px-2 py-2 text-white transition duration-300 hover:bg-red-700 md:px-4 md:py-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                      <p className="hidden md:block">Remove</p>
                    </button>
                  </div>
                </div>
              ))}
              <div className="col-span-4">
                <div className="mb-4 flex items-center space-x-3 rounded-lg p-4">
                  <input
                    type="checkbox"
                    id="giftWrap"
                    className="mr-2 h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-0"
                    checked={isGiftWrap}
                    onChange={() => setIsGiftWrap(!isGiftWrap)}
                  />
                  <label
                    htmlFor="giftWrap"
                    className="text-sm font-medium text-white"
                  >
                    Add Gift Wrap <span className="text-green-400">(₹40)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

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

        <div className="rounded-lg bg-dark-gray p-4">
          <h2 className="mb-4 text-2xl font-semibold text-gray-100">
            Cart Summary
          </h2>
          <div className="mb-4 flex justify-between text-white">
            <p>Subtotal:</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          {extraDiscount > 0 && (
            <div className="mb-4 flex justify-between text-neon-green">
              <p>Additional Discount (10%):</p>
              <p>-₹{((subtotal * extraDiscount) / 100).toFixed(2)}</p>
            </div>
          )}
          {/* <div className="mb-4 flex justify-between text-neon-green">
            <p>Coupon Discount ({discount}%):</p>
            <p>-₹{discountAmount.toFixed(2)}</p>
          </div> */}
          {deliveryCharge > 0 && (
            <div className="mb-4 flex justify-between text-white">
              <p>Delivery Charge:</p>
              <p>₹{deliveryCharge.toFixed(2)}</p>
            </div>
          )}
          {isGiftWrap && (
            <div className="mb-4 flex justify-between text-white">
              <p>Gift Wraping Charge:</p>
              <p>₹40</p>
            </div>
          )}
          <div className="mb-4 flex justify-between text-white">
            <p>Total:</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <button
            className="rounded-lg bg-p-green px-4 py-2 text-white transition duration-300 hover:bg-p-green/90"
            onClick={() => setShowCheckoutForm(true)}
          >
            Proceed to Checkout
          </button>
        </div>

        {showCheckoutForm && (
          <form
            className="mt-8 rounded-lg bg-neutral-900 p-4"
            onSubmit={handleOrderSubmit}
          >
            <h2 className="mb-4 text-2xl font-semibold text-white">Checkout</h2>
            <input
              type="text"
              placeholder="Name"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Mobile"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.mobile}
              onChange={(e) =>
                setUserDetails({ ...userDetails, mobile: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.pincode}
              onChange={(e) =>
                setUserDetails({ ...userDetails, pincode: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Address Line 1"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white"
              value={userDetails.addressLine1}
              onChange={(e) =>
                setUserDetails({ ...userDetails, addressLine1: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Address Line 2"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white"
              value={userDetails.addressLine2}
              onChange={(e) =>
                setUserDetails({ ...userDetails, addressLine2: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Landmark (Optional)"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white"
              value={userDetails.landmark}
              onChange={(e) =>
                setUserDetails({ ...userDetails, landmark: e.target.value })
              }
            />

            <button
              type="submit"
              className="rounded-lg bg-p-green px-4 py-2 text-white transition duration-300 hover:bg-p-green/90"
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
