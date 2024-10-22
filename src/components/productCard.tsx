'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({
  id,
  name,
  images,
  rating,
  price,
  discountPrice,
}: any) {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div
      // href={`/product/${id}`}
      className="group transform rounded-lg border border-gray-600 bg-neutral-950 p-3 shadow-lg transition-transform duration-300"
    >
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
        <div className="">
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
        {!isAdded ? (
          <div
            // onClick={() =>
            //   addToCart({
            //     id,
            //     name,
            //     price: discountPrice,
            //     image: images[0],
            //     quantity: 1,
            //   })
            // }
            className="mt-4 w-full cursor-pointer rounded-lg border py-2 text-center font-medium text-white transition duration-300 hover:bg-white hover:text-gray-800"
          >
            Add to cart
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}
