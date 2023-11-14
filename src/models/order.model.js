import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        variable_id: {
          type: mongoose.Types.ObjectId,
          ref: 'Variable',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['ordered', 'pending', 'success'],
    },
  },
  modelOptions
);

export default userSchema = mongoose.model('Order', schema);
