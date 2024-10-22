'use client';

import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import { productsData } from '@/const/products';
import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import Link from 'next/link';

export default async function Page(context: any) {
  const params = context.params;

  // Decode the URL-encoded parameter to get the original value
  const decodedCategory = decodeURIComponent(params.id);

  await connect();
  const categoryItems = await Product.find({ series: decodedCategory });

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-950">
      <NavBar />

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col justify-center gap-8">
        <div className="flex max-w-xl flex-col gap-4 px-8 text-5xl font-medium text-white">
          <p className="font-bold capitalize">{decodedCategory}</p>{' '}
        </div>
        <AnimeCardList productsData={categoryItems} />
      </div>
      <Footer />
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
    <Link
      href={`/product/${id}`}
      className="group transform rounded-lg border border-gray-600 bg-neutral-950 p-3 shadow-lg transition-transform duration-300"
    >
      <img
        src={images[0]}
        alt={name}
        className="block h-52 w-full rounded-lg bg-white object-contain duration-300 group-hover:hidden"
      />
      <img
        src={images[1]}
        alt={name}
        className="hidden h-52 w-full rounded-lg bg-white object-contain duration-300 group-hover:block"
      />

      <div className="flex flex-col gap-0 py-4">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-100">{name}</h3>

        {/* Price and Discount */}
        <div className="">
          <span className="text-lg text-neon-blue line-through">₹{price}</span>
          <span className="ml-2 text-lg font-bold text-p-green">
            ₹{discountPrice}
          </span>
        </div>

        {/* Shop Button */}
        <div className="mt-4 w-full rounded-lg border py-2 text-center font-medium text-white transition duration-300 hover:bg-white hover:text-gray-800">
          Add to cart
        </div>
      </div>
    </Link>
  );
};
