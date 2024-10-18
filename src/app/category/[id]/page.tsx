'use client';

import NavBar from '@/components/navBar';
import { productsData } from '@/const/products';
import Link from 'next/link';

export default function Page(context: any) {
  const params = context.params;

  // Decode the URL-encoded parameter to get the original value
  const decodedCategory = decodeURIComponent(params.id);

  const categoryItems = productsData.filter(
    (product) => product.family === decodedCategory
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-950">
      <NavBar />

      <div className="mx-auto flex max-w-7xl flex-col justify-center gap-8">
        <p className="text-5xl font-medium text-white">
          All <span className="font-bold capitalize">{decodedCategory}</span>{' '}
          Items
        </p>
        <AnimeCardList productsData={categoryItems} />
      </div>
    </div>
  );
}

const AnimeCardList = ({ productsData }: any) => {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productsData.map((character: any, index: number) => (
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

const AnimeCard = ({ id, name, images, rating, price, discountPrice }: any) => {
  return (
    <div className="group w-full transform rounded-lg bg-gray-700 p-4 shadow-lg transition-transform duration-300">
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
