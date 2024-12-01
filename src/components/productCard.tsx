'use client';
import { useCart } from '@/const/cartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductCard({
  id,
  name,
  images,
  rating,
  outOfStock,
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
    if (outOfStock) return;
    if (isAdded) {
      removeFromCart(id);
      setIsAdded(false);
    } else {
      addToCart(id, 1);
      setIsAdded(true);
    }
  }

  return (
    <Link
      href={`/product/${id}`}
      className={`group max-w-56 shrink-0 transform rounded-lg border border-gray-600 bg-neutral-950 p-2 shadow-lg transition-transform duration-300 hover:cursor-pointer md:max-w-none md:p-3`}
    >
      <img
        src={images[0]}
        alt={name}
        className="block h-44 w-full rounded-lg bg-white object-contain duration-300 group-hover:hidden md:h-52"
      />
      <img
        src={images[1]}
        alt={name}
        className="hidden h-44 w-full rounded-lg bg-white object-contain duration-300 group-hover:block md:h-52"
      />

      <div className="flex flex-col gap-0 py-4">
        {/* Name */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-100 md:line-clamp-1 md:text-xl">
          {name}
        </h3>

        {/* Price and Discount */}
        <div>
          <span className="text-lg text-neon-blue line-through">₹{price}</span>
          <span className="ml-2 text-lg font-bold text-p-green">
            ₹{discountPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}
