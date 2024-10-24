import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orderDetails: [orderDetailsSchema],
  total: {
    type: Number,
    required: true,
  },
});

const OrderModel =
  mongoose.models.OrderModel || mongoose.model('order', orderSchema);
export default OrderModel;

// const order = await OrderModel.findById(orderId).populate('orderDetails.product');
