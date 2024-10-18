'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavBar from '@/components/navBar';
import { productsData } from '@/const/products';
const slides = [
  { id: 1, content: 'https://via.placeholder.com/1920x1080?text=Slide+1' },
  { id: 2, content: 'https://via.placeholder.com/1920x1080?text=Slide+2' },
  { id: 3, content: 'https://via.placeholder.com/1920x1080?text=Slide+3' },
  // Add more slides as needed
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<any>(0); // Track slide direction for animation
  const intervalRef = useRef<any>(null); // Ref to hold the interval for auto-slide

  // Function to go to the next slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer(); // Reset the auto-slide timer on manual navigation
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer(); // Reset the auto-slide timer on manual navigation
  };

  // Reset the auto-slide timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextSlide, 5000); // Restart the timer
  };

  // Auto-slide every 5 seconds (initial setup)
  useEffect(() => {
    resetTimer(); // Start the initial timer

    // Cleanup on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  // Framer Motion animation variants
  const variants = {
    enter: (direction: any) => ({
      x: direction === 1 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: any) => ({
      x: direction === 1 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-neutral-950">
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30, // Adjust this to control the spring bounce
            mass: 0.5, // Reduces the flickering by controlling inertia
            duration: 0.5,
          }}
          className="absolute inset-0 px-4 md:px-6"
        >
          <div className="flex h-full w-full flex-col-reverse gap-2 md:flex-row md:gap-16">
            <div className="flex h-full w-full flex-col items-center justify-start gap-3 space-y-6 px-4 py-2 text-white md:justify-center md:gap-6 md:px-8 md:py-8">
              <h1 className="text-center text-3xl font-semibold text-gray-100 md:text-5xl">
                Your Favorite Anime Character
              </h1>

              <p className="text-center font-exo text-gray-300 md:text-lg">
                Exclusive, Limited-Edition Anime Characters for Every Fan! Shop
                now and get your hands on the best selection.
              </p>

              <div className="flex w-full justify-center gap-4">
                <button className="h-fit w-full rounded-lg bg-p-green px-2 py-3 text-sm text-white transition duration-300 hover:bg-p-green/70 md:w-fit md:px-6 md:text-base">
                  Shop Now
                </button>
                <button className="h-fit w-full rounded-lg border border-p-blue px-2 py-3 text-sm text-white transition duration-300 hover:bg-p-blue/70 md:w-fit md:px-6 md:text-base">
                  Explore Characters
                </button>
              </div>

              <div className="hidden space-y-4 pt-8 md:block">
                <h3 className="font-audiowide text-xl text-p-green">
                  Limited Edition Naruto Figure - Only 100 Left!
                </h3>
                <p className="font-exo text-lg">
                  Get your hands on this rare collectible before it’s gone!
                </p>
              </div>
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <img
                className="h-full w-full object-cover"
                src="./anime.png"
                alt=""
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left and right buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-r-lg bg-black bg-opacity-50 px-4 py-2 text-white focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-l-lg bg-black bg-opacity-50 px-4 py-2 text-white focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

const animeData = [
  {
    name: 'Naruto Uzumaki',
    image: './anime.png',
    rating: 5,
    price: 800,
    discountPrice: 280,
  },
  {
    name: 'Sasuke Uchiha',
    image: './anime.png',
    rating: 4,
    price: 860,
    discountPrice: 320,
  },
  {
    name: 'Goku',
    image: './anime.png',
    rating: 5,
    price: 650,
    discountPrice: 230,
  },
  {
    name: 'Luffy',
    image: './anime.png',
    rating: 4,
    price: 1600,
    discountPrice: 740,
  },
  {
    name: 'Naruto Uzumaki',
    image: './anime.png',
    rating: 5,
    price: 800,
    discountPrice: 280,
  },
  {
    name: 'Sasuke Uchiha',
    image: './anime.png',
    rating: 4,
    price: 860,
    discountPrice: 320,
  },
  {
    name: 'Goku',
    image: './anime.png',
    rating: 5,
    price: 650,
    discountPrice: 230,
  },
  {
    name: 'Luffy',
    image: './anime.png',
    rating: 4,
    price: 1600,
    discountPrice: 740,
  },
  // Add more characters as needed
];

// AnimeCard Component
const AnimeCard = ({ id, name, images, rating, price, discountPrice }: any) => {
  return (
    <div className="group transform rounded-lg bg-gray-700 p-4 shadow-lg transition-transform duration-300">
      <img
        src={images[0]}
        alt={name}
        className="block h-52 w-full rounded-t-lg bg-white object-contain duration-300 group-hover:hidden"
      />
      <img
        src={images[1]}
        alt={name}
        className="hidden h-52 w-full rounded-t-lg bg-white object-contain duration-300 group-hover:block"
      />

      <div className="flex flex-col gap-0 py-4">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-100">{name}</h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(rating)].map((_, index) => (
            <span
              key={index}
              className={`text-neon-yellow ${
                index < rating ? 'text-opacity-100' : 'text-opacity-30'
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Price and Discount */}
        <div className="">
          <span className="text-lg text-neon-blue line-through">₹{price}</span>
          <span className="ml-2 text-lg font-bold text-p-green">
            ₹{discountPrice}
          </span>
        </div>

        {/* Shop Button */}
        <Link
          href={`/product/${id}`}
          className="mt-4 w-full rounded-lg border py-2 text-center font-medium text-white transition duration-300 hover:bg-white hover:text-gray-800"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

// AnimeCardList Component
const AnimeCardList = () => {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productsData.map((character, index) => (
        <AnimeCard
          key={character.id}
          id={character.id}
          name={character.name}
          images={character.images}
          rating={character.rating}
          price={character.price}
          discountPrice={character.discountPrice}
        />
      ))}
    </div>
  );
};

const NarutoCollection = () => {
  return (
    <section className="flex items-center justify-center bg-primary/90 px-8 py-16">
      <div className="container mx-auto flex flex-col items-center gap-8 md:flex-row">
        {/* Image Section */}
        <div className="h-fit md:mt-0 md:w-1/2">
          <img
            src="./lanAllNaruto.png" // Replace with your collection image URL
            alt="Naruto Character Collection"
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center md:w-1/2 md:px-4 md:text-left">
          <h2 className="mb-4 text-center text-4xl text-gray-200">
            Explore Our Exclusive Naruto Collection
          </h2>
          <p className="mb-6 text-center text-lg text-white">
            Dive into the world of Naruto with our exclusive collection of
            characters. Celebrate your favorite ninjas and add them to your
            collection today!
          </p>
          <button className="w-fit rounded-lg bg-p-green px-6 py-3 text-lg text-white transition duration-300 hover:bg-neon-pink">
            View More Naruto Characters
          </button>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = new Set<string>();

    productsData.forEach((product: any) => {
      uniqueCategories.add(product.family);
    });
    setAllCategories(Array.from(uniqueCategories));
  }, [productsData]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-950">
      <NavBar />
      <Carousel />
      {/* <img src="./anime.png" alt="" /> */}
      <NarutoCollection />
      <div className="min-h-screen bg-dark-bg text-white">
        <div className="container mx-auto py-12 md:py-16">
          <h1 className="mb-6 text-center text-4xl font-semibold text-gray-200 md:mb-12 md:text-5xl">
            Anime Character Shop
          </h1>
          <AnimeCardList />
        </div>
      </div>
      <CategorySection allCategories={allCategories} />
    </div>
  );
}

function CategorySection({ allCategories }: any) {
  return (
    <div className="flex flex-col items-center gap-10 bg-primary/90 py-12">
      <p className="text-5xl font-medium text-white">All Categories</p>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3">
        {allCategories.map((category: any, index: any) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }: any) {
  return (
    <Link
      href={`/category/${category}`}
      className="relative h-72 w-full cursor-pointer overflow-hidden rounded"
    >
      <video
        autoPlay
        loop
        muted
        className="left-0 top-0 h-full w-full object-cover opacity-85"
      >
        <source src="./videos/keyChain.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black py-2 text-center text-lg font-semibold text-gray-300">
        {category}
      </div>
    </Link>
  );
}
