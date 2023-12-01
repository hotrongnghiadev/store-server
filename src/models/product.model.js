import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    general: [
      {
        type: Object,
      },
    ],
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
    sold: {
      type: Number,
      default: 0,
    },
    detail: [
      {
        type: Object,
      },
    ],
    ratings: [
      {
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        star: {
          type: Number,
        },
      },
    ],
    starAvg: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
        },
        parentId: {
          type: mongoose.Types.ObjectId,
          default: null,
        },
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  modelOptions
);

const productModel = mongoose.model('Product', schema);
export default productModel;
