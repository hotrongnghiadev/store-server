import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = new mongoose.Schema(
  {
    brand_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
    },
    category_id: {
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
    star_avg: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
        },
        parent_id: {
          type: mongoose.Types.ObjectId,
          default: null,
        },
      },
    ],
    status: {
      type: String,
      enum: ['on', 'out', 'off'],
    },
  },
  modelOptions
);

export default userSchema = mongoose.model('Product', schema);
