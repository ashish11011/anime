'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { CartProvider } from '@/const/cartContext';
import ProductCard from '@/components/productCard';

// SingleCardPage Component
const ShowProductDetail = ({ productData, similarProductsStringify }: any) => {
  const {
    name,
    images,
    rating,
    price,
    discountPrice,
    outOfStock,
    description,
    productHeadlines,
    id,
  } = JSON.parse(productData);

  const similarProducts = JSON.parse(similarProductsStringify);

  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState<any>(images[0]);
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const [inCart, setInCart] = useState(false); // State to check if product is in cart
  const router = useRouter(); // Initialize useRouter

  // Function to check if the product is already in the cart on component mount
  useEffect(() => {
    const existingCart = localStorage.getItem('cart');
    const parsedCart = existingCart ? JSON.parse(existingCart) : [];
    const productInCart = parsedCart.find((item: any) => item.id === id);
    setInCart(!!productInCart); // Set inCart state based on presence in cart
  }, [id]);

  // Function to toggle the product in the cart
  const toggleCart = () => {
    if (outOfStock) return;
    const existingCart = localStorage.getItem('cart');
    const parsedCart = existingCart ? JSON.parse(existingCart) : [];

    const productIndex = parsedCart.findIndex((item: any) => item.id === id);

    if (productIndex >= 0) {
      // If product exists, remove it
      parsedCart.splice(productIndex, 1);
      setInCart(false); // Update inCart state
    } else {
      // If product does not exist, add it with a quantity of 1
      parsedCart.push({
        id,
        name,
        price: discountPrice,
        quantity: 1,
        image: selectedImage,
      });
      setInCart(true); // Update inCart state
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(parsedCart));

    // Trigger the animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation state after 1 second
  };

  // Function to handle "Buy Now" button click
  const handleBuyNow = () => {
    if (outOfStock) return;
    // Clear existing cart
    localStorage.setItem(
      'cart',
      JSON.stringify([
        { id, name, price: discountPrice, quantity: 1, image: selectedImage },
      ])
    );

    // Navigate to the cart page
    router.push('/cart');
  };

  return (
    <div className="bg-neutral-950 py-16">
      <section className="mx-auto max-w-7xl">
        <div className="container mx-auto flex flex-col items-start gap-8 md:flex-row">
          {/* Sticky Image Section */}
          <div className="top-16 flex w-full flex-col-reverse items-center gap-4 p-4 md:sticky md:w-auto md:flex-row">
            <div className="flex flex-row items-center gap-2 md:flex-col">
              {/* Thumbnails Section */}
              {images?.map((image: string, index: number) => (
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
                alt="Selected Product"
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Scrollable Right Section */}
          <div className="space-y-12 px-4 md:ml-8 md:w-1/2 md:px-0">
            {/* Product Details */}
            <div>
              <h1 className="mb-6 text-3xl font-bold text-gray-200 md:text-5xl">
                {name}
              </h1>

              {/* <div className="mb-4 flex items-center">
                {[...Array(rating)].map((_, index) => (
                  <span key={index} className="text-xl text-neon-yellow">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-white">(5.0)</span>
              </div> */}

              <div className="mb-4 flex items-center space-x-4">
                <span className="text-xl text-neon-blue line-through">
                  ₹{price}
                </span>
                <span className="text-2xl font-bold text-neon-green">
                  ₹{discountPrice}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow} // Handle Buy Now click
                  className={`rounded bg-p-green px-8 py-2 font-semibold text-white transition duration-300 hover:bg-p-green/90 ${outOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  Buy now
                </button>
                <button
                  onClick={toggleCart}
                  className={`rounded border border-p-blue px-8 py-2 text-white transition duration-300 hover:bg-p-blue/90 ${isAnimating ? 'animate-pulse' : ''} ${outOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {outOfStock
                    ? 'Out of stock'
                    : inCart
                      ? 'Remove from cart'
                      : 'Add to cart'}
                </button>
              </div>
            </div>

            <p className="mb-4 text-lg text-gray-300">{description}</p>

            {/* Add Coupon Section */}
            {/* <div className="rounded-lg py-6">
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
            </div> */}

            {/* Product Highlights */}
            <div className="rounded-lg py-4">
              <h2 className="mb-4 text-2xl font-semibold text-gray-100">
                Product Highlights
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-white">
                {productHeadlines?.map((headline: string, index: number) => (
                  <li key={index}>{headline}</li>
                ))}
              </ul>
            </div>

            {/* Similar Products Section */}
            {/* <div className="rounded-lg py-4">
              <h2 className="mb-4 text-3xl font-medium text-gray-100">
                View More Products
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div
                      className="rounded-lg bg-dark-gray p-2 md:border"
                      key={index}
                    >
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
            </div> */}

            <CartProvider>
              <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {similarProducts.map((character: any, index: number) => (
                  <ProductCard
                    key={character.id}
                    _id={character._id}
                    id={character.id}
                    name={character.name}
                    images={character.images}
                    price={character.price}
                    discountPrice={character.discountPrice}
                    outOfStock={character.outOfStock}
                  />
                ))}
              </div>
            </CartProvider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowProductDetail;
