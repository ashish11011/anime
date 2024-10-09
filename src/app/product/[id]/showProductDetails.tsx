"use client";
import Link from "next/link";
// import Navbar from "@/components/navBar";
import React, { useState } from "react";
import { productsData } from "@/const/products";

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
    <div className="bg-neutral-900 py-16">
      {/* <Navbar /> */}
      <section className="max-w-7xl mx-auto">
        <div className="container mx-auto flex flex-col gap-8 md:flex-row items-start">
          {/* Sticky Image Section */}
          <div className="md:sticky top-16 items-center w-full md:w-auto flex flex-col-reverse p-4 md:flex-row gap-4">
            <div className="flex md:flex-col flex-row items-center gap-2">
              {/* Thumbnails Section */}
              {images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                    selectedImage === image ? "border-4  border-p-green" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            {/* Main Image Display */}
            <div className="w-80 h-80 md:w-96 md:h-96 ">
              <img
                src={selectedImage}
                alt="Selected Naruto Character"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Scrollable Right Section */}
          <div className="md:w-1/2 px-4 md:px-0 md:ml-8 space-y-12">
            {/* Character Details */}
            <div>
              <h1 className="text-gray-200 font-bold text-5xl mb-2">{name}</h1>

              <div className="flex items-center mb-4">
                {[...Array(rating)].map((_, index) => (
                  <span key={index} className="text-neon-yellow text-xl">
                    ★
                  </span>
                ))}
                <span className="text-white ml-2">(5.0)</span>
              </div>

              <p className="text-gray-300 text-lg mb-6">{description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <span className="line-through text-neon-blue text-xl">
                  ₹{price}
                </span>
                <span className="text-neon-green text-2xl font-bold">
                  ₹{discountPrice}
                </span>
              </div>

              <div className=" flex gap-4">
                <button className="bg-p-green text-white font-semibold py-2 px-8 rounded hover:bg-p-green/90 transition duration-300">
                  Buy now
                </button>
                <Link
                  href="/cart"
                  className=" border border-p-blue text-white py-2 px-8 rounded hover:bg-p-blue/90 transition duration-300"
                >
                  Add to Cart
                </Link>
              </div>
            </div>

            {/* Add Coupon Section */}
            <div className=" py-6 rounded-lg">
              <h2 className="text-gray-100 font-medium text-2xl mb-4">
                Add Coupon
              </h2>
              <input
                type="text"
                className=" bg-transparent border focus:outline-none text-white py-2 px-4 rounded-lg w-full"
                placeholder="Enter your coupon code"
              />
              <button className=" bg-p-green text-white font-medium py-2 px-4 mt-4 rounded-lg hover:bg-p-green/90 transition duration-300">
                Apply Coupon
              </button>
            </div>

            {/* Product Highlights */}
            <div className=" py-4 rounded-lg">
              <h2 className=" text-gray-100 font-semibold text-2xl mb-4">
                Product Highlights
              </h2>
              <ul className="list-disc pl-5 text-white space-y-2">
                {productHeadlines.map((headline: string, index: number) => (
                  <li key={index}>{headline}</li>
                ))}
              </ul>
            </div>

            {/* Similar Products Section */}
            <div className=" py-4 rounded-lg">
              <h2 className=" text-gray-100 font-medium text-3xl mb-4">
                View More Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div className="md:border rounded-lg p-2 bg-dark-gray">
                      <img
                        src="https://via.placeholder.com/150?text=Naruto+Character+1"
                        alt="Similar Product 1"
                        className="w-full h-60 md:h-40 object-cover rounded-lg"
                      />
                      <h3 className="text-white text-lg mt-2">Sasuke Uchiha</h3>
                      <button className="bg-p-green w-fit text-white py-2 px-6 md:w-full  my-2 rounded">
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
