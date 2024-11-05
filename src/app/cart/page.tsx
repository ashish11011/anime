'use client';
import React, { useState } from 'react';
import ShowCartData from './showCartData';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';

// Cart Page Component
const CartPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-950">
      <NavBar />
      {/* // <CartDataProvider> */}
      <ShowCartData />
      {/* // </CartDataProvider> */}
      <Footer />
    </div>
  );
};

export default CartPage;
