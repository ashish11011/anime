import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col gap-24 bg-neutral-950">
      <NavBar />
      <p className="text-center text-2xl font-medium text-white">
        Comming Soon...
      </p>
      <Footer />
    </div>
  );
};

export default AboutUs;