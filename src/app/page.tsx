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

export default async function App() {
  connect();

  const instagramGallaryData = await IsntagramProduct.find({});
  const categoryData = await ProductCategory.find({});
  const seriesCategoryData = await SeriesCategory.find({});
  const productsData = await Product.find({});

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-950">
      <NavBar />
      <Carousel />
      <CategorySection categoryData={categoryData} />

      <NarutoCollection />
      <SeriesCategorySection seriesCategoryData={seriesCategoryData} />

      <HotDeals productsData={JSON.stringify(productsData)} />

      {/* Instagram gallary */}
      <InstagramGallary instagramGallaryData={instagramGallaryData} />
      {/* Subscribe */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
