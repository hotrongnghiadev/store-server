import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['ordered', 'pending', 'success'],
      default: 'ordered',
    },
  },
  modelOptions
);

const userModel = mongoose.model('Order', schema);
export default userModel;
