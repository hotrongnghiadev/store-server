import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import slugify from 'slugify';
import productModel from '../models/product.model.js';
import brandModel from '../models/brand.model.js';
import categoryModel from '../models/category.model.js';
import HandleError from '../utils/HandleThrowError.utils.js';

export const create = async (req, res) => {
  const {
    name,
    brandId,
    categoryId,
    general,
    price,
    inventory,
    color,
    detail,
  } = req.body;
  const files = req.files;

  const checkProduct = await productModel.findOne({ name });
  if (checkProduct) throw new HandleError('product name areadly used', 400);

  const slug = slugify(name, { lower: true });

  const product = new productModel({
    name,
    slug,
    brandId,
    categoryId,
    general: general ? JSON.parse(general) : [],
    price,
    inventory,
    color,
    detail: detail ? JSON.parse(detail) : [],
  });
  for (const key in files) {
    product[key] = [];
    for (const arr of files[key]) {
      product[key].push(arr);
    }
  }
  await product.save();

  // populate brand with category
  const brand = await brandModel.findById(brandId);
  const isExistCategory = brand.categories.some(
    (el) => el._id.toString() === categoryId
  );
  if (!isExistCategory) {
    brand.categories.push(categoryId);
    await brand.save();
  }
  const category = await categoryModel.findById(categoryId);
  const isExistBrand = category.brands.some(
    (el) => el._id.toString() === brandId
  );
  if (!isExistBrand) {
    category.brands.push(brandId);
    await category.save();
  }

  return res.status(201).json({
    product: product._doc,
  });
};

export const update = async (req, res) => {
  const id = req.params.id;
  const files = req.files;
  const { status, name, brandId, categoryId, price, inventory, color } =
    req.body;
  const updateData = {
    status,
    name,
    brandId,
    categoryId,
    price,
    inventory,
    color,
  };
  updateData.general = JSON.parse(req.body.general);
  updateData.detail = JSON.parse(req.body.detail);
  console.log(updateData);

  // update files
  const updateFiles = {};
  for (const key in files) {
    updateFiles[key] = [];
    for (const arr of files[key]) {
      updateFiles[key].push(arr);
    }
  }
  let product = await productModel.findById(id);
  const preThumb = product.thumb;
  const preImages = product.images;
  product = Object.assign(product, updateData, updateFiles);
  const updateProduct = await product.save();

  // clear previously saved files on cloudinary
  if (updateProduct && updateFiles.thumb) {
    const filenames = preThumb.map((el) => el.filename);
    cloudinary.api.delete_resources(filenames, function (error, result) {
      if (error) console.log(error);
    });
  }
  if (updateProduct && updateFiles.images) {
    const filenames = preImages.map((el) => el.filename);
    cloudinary.api.delete_resources(filenames, function (error, result) {
      if (error) console.log(error);
    });
  }

  return res.status(200).json(updateProduct);
};

export const delMany = async (req, res) => {
  const products = await productModel.deleteMany({ _id: req.query.ids });
  return res.status(200).json(products);
};

export const getAll = async (req, res) => {
  const products = await productModel.find();
  return res.status(200).json({
    status: 'SUCCESS',
    products,
  });
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  const products = await productModel.findById(id);
  return res.status(200).json(products);
};
