import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import ListAllProducts from './listAllProducts';

const Admin = async () => {
  connect();
  const productData = await Product.find({});
  return (
    <div className="flex flex-col gap-12">
      <ListAllProducts productData={JSON.stringify(productData)} />
    </div>
  );
};

export default Admin;
