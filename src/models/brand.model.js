import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [
      {
        categoryId: {
          type: mongoose.Types.ObjectId,
          ref: 'Category',
        },
      },
    ],
    desc: {
      type: String,
    },
  },
  modelOptions
);

const brandModel = mongoose.model('Brand', schema);
export default brandModel;
