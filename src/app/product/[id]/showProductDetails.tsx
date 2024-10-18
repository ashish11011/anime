'use client';
import Link from 'next/link';
// import Navbar from "@/components/navBar";
import React, { useState } from 'react';
import { productsData } from '@/const/products';

// SingleCardPage Component
const ShowProductDetail = ({
  name,
  images,
  rating,
  price,
  discountPrice,
  description,
  productHeadlines,
  id,
}: any) => {
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="bg-neutral-950 py-16">
      {/* <Navbar /> */}
      <section className="mx-auto max-w-7xl">
        <div className="container mx-auto flex flex-col items-start gap-8 md:flex-row">
          {/* Sticky Image Section */}
          <div className="top-16 flex w-full flex-col-reverse items-center gap-4 p-4 md:sticky md:w-auto md:flex-row">
            <div className="flex flex-row items-center gap-2 md:flex-col">
              {/* Thumbnails Section */}
              {images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-16 w-16 cursor-pointer rounded-lg object-cover ${
                    selectedImage === image ? 'border-4 border-p-green' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            {/* Main Image Display */}
            <div className="h-80 w-80 md:h-96 md:w-96">
              <img
                src={selectedImage}
                alt="Selected Naruto Character"
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Scrollable Right Section */}
          <div className="space-y-12 px-4 md:ml-8 md:w-1/2 md:px-0">
            {/* Character Details */}
            <div>
              <h1 className="mb-2 text-5xl font-bold text-gray-200">{name}</h1>

              <div className="mb-4 flex items-center">
                {[...Array(rating)].map((_, index) => (
                  <span key={index} className="text-xl text-neon-yellow">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-white">(5.0)</span>
              </div>

              <p className="mb-6 text-lg text-gray-300">{description}</p>

              <div className="mb-4 flex items-center space-x-4">
                <span className="text-xl text-neon-blue line-through">
                  ₹{price}
                </span>
                <span className="text-2xl font-bold text-neon-green">
                  ₹{discountPrice}
                </span>
              </div>

              <div className="flex gap-4">
                <button className="rounded bg-p-green px-8 py-2 font-semibold text-white transition duration-300 hover:bg-p-green/90">
                  Buy now
                </button>
                <Link
                  href="/cart"
                  className="rounded border border-p-blue px-8 py-2 text-white transition duration-300 hover:bg-p-blue/90"
                >
                  Add to Cart
                </Link>
              </div>
            </div>

            {/* Add Coupon Section */}
            <div className="rounded-lg py-6">
              <h2 className="mb-4 text-2xl font-medium text-gray-100">
                Add Coupon
              </h2>
              <input
                type="text"
                className="w-full rounded-lg border bg-transparent px-4 py-2 text-white focus:outline-none"
                placeholder="Enter your coupon code"
              />
              <button className="mt-4 rounded-lg bg-p-green px-4 py-2 font-medium text-white transition duration-300 hover:bg-p-green/90">
                Apply Coupon
              </button>
            </div>

            {/* Product Highlights */}
            <div className="rounded-lg py-4">
              <h2 className="mb-4 text-2xl font-semibold text-gray-100">
                Product Highlights
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-white">
                {productHeadlines.map((headline: string, index: number) => (
                  <li key={index}>{headline}</li>
                ))}
              </ul>
            </div>

            {/* Similar Products Section */}
            <div className="rounded-lg py-4">
              <h2 className="mb-4 text-3xl font-medium text-gray-100">
                View More Products
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div className="rounded-lg bg-dark-gray p-2 md:border">
                      <img
                        src="https://via.placeholder.com/150?text=Naruto+Character+1"
                        alt="Similar Product 1"
                        className="h-60 w-full rounded-lg object-cover md:h-40"
                      />
                      <h3 className="mt-2 text-lg text-white">Sasuke Uchiha</h3>
                      <button className="my-2 w-fit rounded bg-p-green px-6 py-2 text-white md:w-full">
                        Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowProductDetail;
