'use client';
// import { CartDataProvider, useCartData } from '@/const/cartContext';

import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import ShowCartData from './showCartData';

// Cart Page Component
const CartPage = () => {
  return (
    // <CartDataProvider>
    <ShowCartData />
    // </CartDataProvider>
  );
};

export default CartPage;
