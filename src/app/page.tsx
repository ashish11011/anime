"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/navBar";
import { productsData } from "@/const/products";
const slides = [
  { id: 1, content: "https://via.placeholder.com/1920x1080?text=Slide+1" },
  { id: 2, content: "https://via.placeholder.com/1920x1080?text=Slide+2" },
  { id: 3, content: "https://via.placeholder.com/1920x1080?text=Slide+3" },
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
      x: direction === 1 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: any) => ({
      x: direction === 1 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className=" bg-neutral-950 relative h-[90vh] w-full overflow-hidden">
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
            type: "spring",
            stiffness: 300,
            damping: 30, // Adjust this to control the spring bounce
            mass: 0.5, // Reduces the flickering by controlling inertia
            duration: 0.5,
          }}
          className="absolute px-4 md:px-6 inset-0"
        >
          <div className=" w-full h-full flex-col-reverse md:flex-row flex gap-2 md:gap-16">
            <div className="w-full h-full flex flex-col gap-3 md:gap-6 justify-start md:justify-center items-center text-white px-4 py-2 md:py-8 md:px-8  space-y-6">
              <h1 className=" text-gray-100 font-semibold text-center md:text-5xl text-3xl">
                Your Favorite Anime Character
              </h1>

              <p className="text-gray-300 text-center font-exo md:text-lg">
                Exclusive, Limited-Edition Anime Characters for Every Fan! Shop
                now and get your hands on the best selection.
              </p>

              <div className=" w-full justify-center flex gap-4">
                <button className=" w-full md:w-fit h-fit  bg-p-green text-white px-2 md:px-6 py-3 text-sm md:text-base rounded-lg hover:bg-p-green/70 transition duration-300">
                  Shop Now
                </button>
                <button className=" w-full md:w-fit h-fit  hover:bg-p-blue/70  border border-p-blue text-white px-2 text-sm md:text-base md:px-6 py-3 rounded-lg transition duration-300">
                  Explore Characters
                </button>
              </div>

              <div className=" hidden md:block pt-8 space-y-4">
                <h3 className="text-p-green font-audiowide text-xl">
                  Limited Edition Naruto Figure - Only 100 Left!
                </h3>
                <p className="font-exo text-lg">
                  Get your hands on this rare collectible before it’s gone!
                </p>
              </div>
            </div>
            <div className=" flex h-full justify-center items-center w-full">
              <img
                className="w-full h-full object-cover"
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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-r-lg focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-l-lg focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

const animeData = [
  {
    name: "Naruto Uzumaki",
    image: "./anime.png",
    rating: 5,
    price: 800,
    discountPrice: 280,
  },
  {
    name: "Sasuke Uchiha",
    image: "./anime.png",
    rating: 4,
    price: 860,
    discountPrice: 320,
  },
  {
    name: "Goku",
    image: "./anime.png",
    rating: 5,
    price: 650,
    discountPrice: 230,
  },
  {
    name: "Luffy",
    image: "./anime.png",
    rating: 4,
    price: 1600,
    discountPrice: 740,
  },
  {
    name: "Naruto Uzumaki",
    image: "./anime.png",
    rating: 5,
    price: 800,
    discountPrice: 280,
  },
  {
    name: "Sasuke Uchiha",
    image: "./anime.png",
    rating: 4,
    price: 860,
    discountPrice: 320,
  },
  {
    name: "Goku",
    image: "./anime.png",
    rating: 5,
    price: 650,
    discountPrice: 230,
  },
  {
    name: "Luffy",
    image: "./anime.png",
    rating: 4,
    price: 1600,
    discountPrice: 740,
  },
  // Add more characters as needed
];

// AnimeCard Component
const AnimeCard = ({ id, name, images, rating, price, discountPrice }: any) => {
  return (
    <div className="bg-gray-700 rounded-lg group shadow-lg p-4 transform group transition-transform duration-300">
      <img
        src={images[0]}
        alt={name}
        className="  duration-300 block group-hover:hidden h-52 w-full object-contain bg-white rounded-t-lg"
      />
      <img
        src={images[1]}
        alt={name}
        className=" duration-300 hidden group-hover:block h-52 w-full object-contain bg-white rounded-t-lg"
      />

      <div className="py-4 flex flex-col gap-0 ">
        {/* Name */}
        <h3 className="text-gray-100 text-xl font-bold">{name}</h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(rating)].map((_, index) => (
            <span
              key={index}
              className={`text-neon-yellow ${
                index < rating ? "text-opacity-100" : "text-opacity-30"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Price and Discount */}
        <div className="">
          <span className="line-through text-neon-blue text-lg">₹{price}</span>
          <span className="text-p-green text-lg font-bold ml-2">
            ₹{discountPrice}
          </span>
        </div>

        {/* Shop Button */}
        <Link
          href={`/product/${id}`}
          className="mt-4 font-medium w-full text-center hover:bg-white text-white py-2 rounded-lg border hover:text-gray-800 transition duration-300"
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
    <div className="grid max-w-7xl w-full mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
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
    <section className=" bg-primary/90 py-16 px-8 flex items-center justify-center">
      <div className="container mx-auto flex flex-col  md:flex-row gap-8 items-center">
        {/* Image Section */}
        <div className="md:w-1/2 h-fit md:mt-0">
          <img
            src="./lanAllNaruto.png" // Replace with your collection image URL
            alt="Naruto Character Collection"
            className="w-full h-full rounded-lg object-contain"
          />
        </div>
        <div className="md:w-1/2 text-center justify-center items-center flex flex-col gap-4 md:px-4 md:text-left">
          <h2 className="text-gray-200 text-center  text-4xl mb-4">
            Explore Our Exclusive Naruto Collection
          </h2>
          <p className="text-white text-center text-lg mb-6">
            Dive into the world of Naruto with our exclusive collection of
            characters. Celebrate your favorite ninjas and add them to your
            collection today!
          </p>
          <button className="bg-p-green text-white w-fit  py-3 px-6 rounded-lg text-lg hover:bg-neon-pink transition duration-300">
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
    <div className=" bg-neutral-950 w-full min-h-screen flex flex-col ">
      <NavBar />
      <Carousel />
      {/* <img src="./anime.png" alt="" /> */}
      <NarutoCollection />
      <div className="bg-dark-bg min-h-screen text-white">
        <div className="container mx-auto py-12 md:py-16">
          <h1 className="text-gray-200 text-4xl md:text-5xl font-semibold text-center mb-6  md:mb-12">
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
    <div className="bg-primary/90 items-center py-12 flex flex-col gap-10">
      <p className=" text-5xl text-white font-medium ">All Categories</p>
      <div className="grid max-w-7xl w-full mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-8">
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
      className=" cursor-pointer rounded overflow-hidden relative w-full h-72"
    >
      <video
        autoPlay
        loop
        muted
        className="  top-0 left-0 w-full h-full opacity-85 object-cover"
      >
        <source src="./videos/keyChain.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className=" bg-gradient-to-b from-transparent to-black w-full text-gray-300 text-center text-lg py-2 font-semibold absolute bottom-0 left-0">
        {category}
      </div>
    </Link>
  );
}
