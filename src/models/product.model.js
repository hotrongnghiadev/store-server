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
    desc: {
      type: Object,
    },
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
      type: String,
      enum: ['on', 'out', 'off'],
      default: 'off',
    },
  },
  modelOptions
);

const productModel = mongoose.model('Product', schema);
export default productModel;
