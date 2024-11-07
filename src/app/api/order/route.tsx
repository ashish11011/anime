import connect from '@/dbConfig/dbConfig';
import OrderModel from '@/Models/orderModel';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await connect();

  const body = await request.json();
  const { user, items, total, isGiftWrap } = body;

  let serverTotal = 0;
  let orderData = [];
  let extraCharge = 0;

  for (let item of items) {
    const data = await Product.findOne({ id: item.id });

    if (!data) {
      return new Response(
        JSON.stringify({ message: `Product not found for id: ${item.id}` }),
        { status: 404 }
      );
    }

    const serverItem = {
      productId: item.id,
      name: data.name,
      image: data.images[0],
      price: data.discountPrice || data.price,
      quantity: item.quantity.toString(),
    };

    orderData.push(serverItem);
    serverTotal += parseFloat(serverItem.price) * parseInt(serverItem.quantity);
  }

  const userData = {
    name: user.name,
    email: user.email,
    address: user.address,
    pincode: user.pincode,
    phone: user.mobile,
  };

  let serverDiscountedPrice = serverTotal;

  if (serverTotal > 1999) {
    serverDiscountedPrice = serverTotal * 0.9;
  } else {
    if (serverTotal <= 999) {
      extraCharge = 60;
    }
  }

  //checking Is Gift Wrap
  if (isGiftWrap) {
    extraCharge += 40;
  }

  const phishingActivity =
    serverDiscountedPrice.toFixed(0) === total.toFixed(0) ? 'no' : 'yes';

  try {
    await OrderModel.create({
      name: userData.name,
      email: userData.email,
      address: userData.address,
      pincode: userData.pincode,
      phone: userData.phone,
      orderDetails: orderData,
      extraCharge: extraCharge.toFixed(0).toString(),
      discountedPrice: serverDiscountedPrice.toFixed(0).toString(),
      totalAmount: serverTotal.toFixed(0).toString(),
      status: 'pending',
      phishingActivity: phishingActivity,
      isGiftWrap: isGiftWrap,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return new Response(JSON.stringify({ message: 'Error placing order' }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ message: 'Order placed successfully' }),
    { status: 200 }
  );
}
