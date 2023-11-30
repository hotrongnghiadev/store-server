import mongoose from 'mongoose';
import slugify from 'slugify';
import productModel from '../models/product.model.js';
import variableModel from '../models/variable.model.js';
import brandModel from '../models/brand.model.js';
import categoryModel from '../models/category.model.js';
import HandleError from '../utils/HandleThrowError.utils.js';

export const create = async (req, res) => {
  const { name, brandId, categoryId, general } = req.body;

  // console.log(files);
  // console.log(req.body);

  const checkProduct = await productModel.findOne({ name });
  if (checkProduct) throw new HandleError('product name areadly used', 400);

  const slug = slugify(name, { lower: true });

  const product = new productModel();
  product.name = name;
  product.slug = slug;
  product.brandId = brandId;
  product.categoryId = categoryId;
  product.general = JSON.parse(general);

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

  // add first variable product
  const { price, inventory, color, detail } = req.body;
  const files = req.files;
  const variable = new variableModel();
  variable.productId = product._id;
  variable.price = price;
  variable.inventory = inventory;
  variable.color = color;
  variable.detail = JSON.parse(detail);
  console.log(detail);
  for (const key in files) {
    variable[key] = [];
    for (const arr of files[key]) {
      variable[key].push(arr);
    }
  }
  await variable.save();

  return res.status(201).json({
    product: product._doc,
    firstVariable: variable._doc,
  });
};
