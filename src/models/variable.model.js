import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = mongoose.Schema(
  {
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    thumb: [
      {
        originalname: {
          type: String,
        },
        path: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
    ],
    images: [
      {
        originalname: {
          type: String,
        },
        path: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
    ],
    desc: {
      type: Object,
    },
  },
  modelOptions
);
export default mongoose.model('Variable', schema);
