import { categoryData } from '@/const/products';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="mt-24 flex w-full flex-col gap-12 border-t border-gray-500 py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 md:flex-row md:py-6">
        <div className="flex w-full flex-col gap-2 md:gap-6">
          <p className="text-2xl font-medium text-white md:text-3xl">
            About Us
          </p>
          <p className="text-base text-gray-400">
            At Cozzy corner, we are passionate about bringing the finest
            die-cast models and collectibles to enthusiasts and collectors pan
            India.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:gap-6">
          <p className="text-2xl font-medium text-white md:text-3xl">
            Get Early Stock Notifications!
          </p>
          <p className="text-base text-gray-400">
            Join our WhatsApp group to get early stock updates.{' '}
            <a href="#" className="text-blue-600 underline">
              Click Here
            </a>{' '}
            to join
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:gap-6">
          <p className="text-2xl font-medium text-white md:text-3xl">
            Categories
          </p>
          <div className="flex flex-col gap-3">
            {categoryData.map((item) => {
              return (
                <Link
                  href={item.slug}
                  className="cursor-pointer text-gray-400 hover:underline"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 md:gap-6">
          <p className="text-2xl font-medium text-white md:text-3xl">
            Quick Links
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="cursor-pointer text-gray-400 hover:underline"
            >
              Home
            </Link>
            <Link
              href={'/about-us'}
              className="cursor-pointer text-gray-400 hover:underline"
            >
              About Us
            </Link>
            <Link
              href={'/contact-us'}
              className="cursor-pointer text-gray-400 hover:underline"
            >
              Contact Us
            </Link>
            <Link
              href={'/orders'}
              className="cursor-pointer text-gray-400 hover:underline"
            >
              My orders
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-fit gap-4">
        <Link href={'https://www.instagram.com/cozzy___corner/'}>
          <Instagram className="h-6 w-6 cursor-pointer text-gray-200 duration-200 hover:scale-105" />
        </Link>
        <Link
          target={'_blank'}
          href={
            'https://wa.me/+919664203951?text=Hi Cozzy Corner, I am interested in your product'
          }
        >
          {' '}
          <img
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/whatsapp-icon.png"
            className="h-6 w-6 cursor-pointer hover:scale-105"
            alt=""
          />
        </Link>
      </div>
      <div className="px-6 text-center text-xs text-gray-400">
        © 2024, DIECASTO.com Powered by Shopify {' · '}
        <Link
          className="text-gray-200 hover:underline"
          href={'/privacy-policy'}
        >
          Privacy policy
        </Link>
        {' · '}
        <Link className="text-gray-200 hover:underline" href={'/contact-us'}>
          Contact information
        </Link>
      </div>
    </div>
  );
}
