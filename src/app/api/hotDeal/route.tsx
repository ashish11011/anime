import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;
  await connect();
  const product = await Product.findOne({ id });
  console.log(product);
  product.isHotDeal = !product.isHotDeal;
  await product.save();
  return new Response(JSON.stringify({ message: 'Toggled hot deal' }), {
    status: 200,
  });
}
