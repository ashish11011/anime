import ShowProductDetail from './showProductDetails';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';

// SingleCardPage Component
const SingleCardPage = async (context: any) => {
  const router = context.params;

  await connect();
  const [productData] = await Product.find({ id: router.id });

  return (
    <div className="flex flex-col bg-neutral-950">
      <NavBar />
      {productData && (
        <ShowProductDetail productData={JSON.stringify(productData)} />
      )}
      <Footer />
    </div>
  );
};

export default SingleCardPage;
