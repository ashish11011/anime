import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import Carousel from './carousel';
import CategorySection from './allCategories';
import SeriesCategorySection from './seriesCategory';
import NarutoCollection from './narutoCollection';
import HotDeals from './hotDeals';
import InstagramGallary from './instagramGallary';
import connect from '@/dbConfig/dbConfig';
import IsntagramProduct from '@/Models/instagramModel';
import ProductCategory from '@/Models/categoryModel';
import SeriesCategory from '@/Models/seriesCategory';
import Product from '@/Models/productModel';
import BottomInstagram from '@/components/bottomInstagram';

export const revalidate = 0;

export default async function App() {
  connect();

  const instagramGallaryData = await IsntagramProduct.find({});
  const categoryData = await ProductCategory.find({});
  const seriesCategoryData = await SeriesCategory.find({});
  const productsData = await Product.find({});

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-neutral-950">
      <BottomInstagram />
      <NavBar />
      <Carousel />
      <CategorySection categoryData={JSON.stringify(categoryData)} />
      <NarutoCollection />
      <SeriesCategorySection
        seriesCategoryData={JSON.stringify(seriesCategoryData)}
      />
      <HotDeals productsData={JSON.stringify(productsData)} />
      {/* Instagram gallary */}
      <InstagramGallary
        instagramGallaryData={JSON.stringify(instagramGallaryData)}
      />
      {/* Subscribe */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
