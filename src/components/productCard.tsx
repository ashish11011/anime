'use client';
import { useCart } from '@/const/cartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductCard({
  id,
  name,
  images,
  rating,
  price,
  discountPrice,
}: any) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the product is already in the cart
    setIsAdded(cart.some((item) => item.id === id));
  }, [cart, id]);

  function handleCartToggle(id: string) {
    if (isAdded) {
      removeFromCart(id);
      setIsAdded(false);
    } else {
      addToCart(id, 1);
      setIsAdded(true);
    }
  }

  return (
    <div className="group transform rounded-lg border border-gray-600 bg-neutral-950 p-3 shadow-lg transition-transform duration-300">
      <img
        src={images[0]}
        alt={name}
        className="block h-52 w-full rounded-lg bg-white object-contain duration-300 group-hover:hidden"
      />
      <img
        src={images[1]}
        alt={name}
        className="hidden h-52 w-full rounded-lg bg-white object-contain duration-300 group-hover:block"
      />

      <div className="flex flex-col gap-0 py-4">
        {/* Name */}
        <h3 className="line-clamp-1 text-xl font-bold text-gray-100">{name}</h3>

        {/* Price and Discount */}
        <div>
          <span className="text-lg text-neon-blue line-through">₹{price}</span>
          <span className="ml-2 text-lg font-bold text-p-green">
            ₹{discountPrice}
          </span>
        </div>

        <Link
          href={`/product/${id}`}
          className="mt-4 w-full rounded-lg border py-2 text-center font-medium text-white transition duration-300 hover:bg-white hover:text-gray-800"
        >
          View product
        </Link>

        {/* Shop Button */}
        <div
          onClick={() => handleCartToggle(id)}
          className={`mt-4 w-full cursor-pointer rounded-lg border py-2 text-center font-medium transition duration-300 ${
            isAdded
              ? 'bg-white text-gray-800'
              : 'text-white hover:bg-white hover:text-gray-800'
          }`}
        >
          {isAdded ? 'Remove from cart' : 'Add to cart'}
        </div>
      </div>
    </div>
  );
}
