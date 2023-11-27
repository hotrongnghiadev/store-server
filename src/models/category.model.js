import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    brands: [
      {
        brandId: {
          type: mongoose.Types.ObjectId,
          ref: 'Brand',
        },
      },
    ],
    desc: {
      type: Object,
    },
  },
  modelOptions
);
const categoryModel = mongoose.model('Category', schema);
export default categoryModel;
