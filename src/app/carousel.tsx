'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    id: 1,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-goku.png',
  },
  {
    id: 2,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-itachi.png',
  },
  {
    id: 3,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-zoro.png',
  },
  {
    id: 4,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-boa.png',
  },
  // Add more slides as needed
];

export default function Carousel() {
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
                <button className="h-fit w-full rounded bg-p-green px-2 py-3 text-sm text-white transition duration-300 hover:bg-p-green/70 md:w-fit md:px-6 md:text-base">
                  Shop Now
                </button>
                <button className="h-fit w-full rounded border border-p-blue px-2 py-3 text-sm text-white transition duration-300 hover:bg-p-blue/70 md:w-fit md:px-6 md:text-base">
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
                className="h-full max-h-[90vh] w-full object-contain"
                src={slides[currentSlide].content}
                alt={`Slide ${currentSlide + 1}`}
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
}
