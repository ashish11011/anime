import ShowProductDetail from './showProductDetails';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { CartProvider } from '@/const/cartContext';
import BottomInstagram from '@/components/bottomInstagram';

// SingleCardPage Component
const SingleCardPage = async (context: any) => {
  const router = context.params;

  await connect();
  const [productData] = await Product.find({ id: router.id });
  const similarProducts = await Product.find({
    category: productData.category,
    _id: { $ne: productData._id },
  }).limit(3);

  return (
    <div className="flex flex-col bg-neutral-950">
      <BottomInstagram />
      <NavBar />
      {productData && (
        <CartProvider>
          <ShowProductDetail
            similarProductsStringify={JSON.stringify(similarProducts)}
            productData={JSON.stringify(productData)}
          />
        </CartProvider>
      )}
      <Footer />
    </div>
  );
};

export default SingleCardPage;
