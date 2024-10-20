'use client';
// import { CartDataProvider, useCartData } from '@/const/cartContext';

import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
// Cart Page Component
const ShowCartData = () => {
  // const cookiesData = Cookies.get('cartData');

  // let parsedData = [];

  // if (cookiesData) {
  //   parsedData = JSON.parse(cookiesData);
  // }
  // // console.log(cartData);
  // const [cartItems, setCartItems] = useState(parsedData);

  // const [couponCode, setCouponCode] = useState('');
  // const [discount, setDiscount] = useState(0);

  // // Function to increase quantity
  // const increaseQuantity = (id: any) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // Function to decrease quantity
  // const decreaseQuantity = (id: any) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // // Function to remove item from cart
  // const removeItem = (id: any) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  // // Function to apply coupon code
  // const applyCoupon = () => {
  //   if (couponCode === 'DISCOUNT10') {
  //     setDiscount(10); // Apply 10% discount
  //   } else {
  //     setDiscount(0);
  //   }
  // };

  // // Calculate subtotal
  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  // // Calculate total after discount
  // const total = subtotal - (subtotal * discount) / 100;

  return <div className=""></div>;
};

export default ShowCartData;
