"use client";

import NavBar from "@/components/navBar";
import { productsData } from "@/const/products";
import Link from "next/link";

export default function Page(context: any) {
  const params = context.params;

  // Decode the URL-encoded parameter to get the original value
  const decodedCategory = decodeURIComponent(params.id);

  const categoryItems = productsData.filter(
    (product) => product.family === decodedCategory
  );

  return (
    <div className=" bg-neutral-950 min-h-screen w-full flex flex-col">
      <NavBar />

      <div className=" flex flex-col max-w-7xl mx-auto gap-8 justify-center  ">
        <p className=" text-white text-5xl font-medium">
          All <span className=" font-bold capitalize ">{decodedCategory}</span>{" "}
          Items
        </p>
        <AnimeCardList productsData={categoryItems} />
      </div>
    </div>
  );
}

const AnimeCardList = ({ productsData }: any) => {
  return (
    <div className="grid max-w-7xl w-full mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
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
    <div className="bg-gray-700 rounded-lg group w-full shadow-lg p-4 transform group transition-transform duration-300">
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
