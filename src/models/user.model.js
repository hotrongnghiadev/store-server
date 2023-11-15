import crypto from 'crypto';
import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // no appearence in select query
      select: false,
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        variable: {
          type: mongoose.Types.ObjectId,
          ref: 'Variable',
        },
        quantity: {
          type: Number,
        },
      },
    ],
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  modelOptions
);

schema.methods.setPassword = function (password) {
  // convert binary to hex string
  this.salt = crypto.randomBytes(16).toString('hex');
  // hashing password
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

schema.methods.validPassword = function (password) {
  const decrypt = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');

  return this.password === decrypt;
};

const userModel = mongoose.model('User', schema);
export default userModel;
