'use client';
import Link from 'next/link';
// import Navbar from "@/components/navBar";
import React, { useState } from 'react';
import { productsData } from '@/const/products';
import ShowProductDetail from './showProductDetails';
import { useRouter } from 'next/router';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';

// SingleCardPage Component
const SingleCardPage = (context: any) => {
  const router = context.params;

  const product = productsData.find((product) => product.id === router.id);
  //   // State to track the currently selected image
  //   const [selectedImage, setSelectedImage] = useState(
  //     "https://via.placeholder.com/400x300?text=Naruto+Main"
  //   );

  //   // List of thumbnails
  //   const images = [
  //     "https://via.placeholder.com/400x300?text=Naruto+Main", // Main Image
  //     "https://via.placeholder.com/100x100?text=Naruto+1",
  //     "https://via.placeholder.com/100x100?text=Naruto+2",
  //     "https://via.placeholder.com/100x100?text=Naruto+3",
  //   ];

  return (
    <div className="flex flex-col bg-neutral-950">
      <NavBar />
      <ShowProductDetail {...product} />
      <Footer />
    </div>
  );
};

export default SingleCardPage;
