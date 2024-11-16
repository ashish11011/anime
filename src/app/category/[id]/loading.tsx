import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import React from 'react';

const Page = () => {
  return (
    <div className="h-full min-h-screen w-full bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 bg-neutral-950 px-4">
        <NavBar />
        <div className="h-96 w-full animate-pulse bg-neutral-900"></div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
