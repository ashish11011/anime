import BottomInstagram from '@/components/bottomInstagram';
import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import ProductCard from '@/components/productCard';
import { CartProvider } from '@/const/cartContext';
import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';

import { Metadata } from 'next';

export async function generateMetadata(context: any): Promise<Metadata> {
  const params = context.params;
  const decodedCategory = decodeURIComponent(params.id);

  return {
    title: decodedCategory,
  };
}

export default async function Page(context: any) {
  const params = context.params;
  const decodedCategory = decodeURIComponent(params.id);

  await connect();

  const categoryItems = await Product.find({ category: decodedCategory });

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <BottomInstagram />
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
    <CartProvider>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 gap-y-4 px-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsData.map((character: any, index: number) => (
          <ProductCard
            key={character.id}
            id={character.id}
            name={character.name}
            images={character.images}
            rating={character.rating}
            outOfStock={character.outOfStock}
            price={character.price}
            discountPrice={character.discountPrice}
          />
        ))}
      </div>
    </CartProvider>
  );
};
