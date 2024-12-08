import Razorpay from 'razorpay';
import React from 'react';

const showpayments = async () => {
  const newRazorpay = new Razorpay({
    key_id: process.env.RAZERPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

  const orderData = await newRazorpay.orders.all();

  console.log(JSON.stringify(orderData));

  return <div>check console</div>;
};

export default showpayments;
