import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
      },
    ],
    desc: {
      type: Object,
    },
  },
  modelOptions
);

export default mongoose.model('Brand', schema);
