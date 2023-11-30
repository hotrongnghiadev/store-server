import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    price: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
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
    detail: [
      {
        type: Object,
      },
    ],
  },
  modelOptions
);
const variableModel = mongoose.model('Variable', schema);
export default variableModel;
