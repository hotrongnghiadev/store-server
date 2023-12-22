import { v2 as cloudinary } from 'cloudinary';
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
  const slug = req.params.slug;
  const product = await productModel
    .findOne({ slug })
    .populate('categoryId')
    .populate('brandId')
    .populate('comments.userId');
  return res.status(200).json(product);
};

export const getOneById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await productModel
    .findById(id)
    .populate('categoryId')
    .populate('brandId')
    .populate('comments.userId');
  return res.status(200).json(product);
};

export const filter = async (req, res) => {
  const query = req.query;
  // 1.FILTER
  // since query is an object, mySQL uses operator '...' to refer to the variable myFilter
  let myFilter = { ...query };
  // strip some values ​​from myFilter
  const removalList = ['page', 'limit', 'sort', 'select'];
  for (const el of removalList) delete myFilter[el];
  // convert myFilter to string to add $ sign before gt, gte, lt, lte on all object values
  myFilter = JSON.stringify(myFilter).replace(
    //match any word in brackets, with different letters in front and back, eg: xgte, gtex, xgtex
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  // convert myFilter to JSON
  myFilter = JSON.parse(myFilter);
  if (query.name) {
    myFilter.name = { $regex: query.name, $options: 'i' };
  }
  if (!myFilter) myFilter = null;
  // 2. SORT
  const mySorter = {};
  if (query.sort) {
    if (query.sort.charAt(0) === '-') {
      mySorter[query.sort.slice(1)] = -1;
    } else mySorter[query.sort] = 1;
  }
  // 3. SELECT
  const mySelector = query.select?.split(',').join(' ');

  // 4. PAGINATION
  const page = query.page || 1;
  const limit = query.limit || 4;
  const skip = (page - 1) * limit;
  await productModel
    .find(myFilter)
    .populate('categoryId')
    .sort(mySorter)
    .select(mySelector)
    .skip(skip)
    .limit(limit)
    .then(async (resolve) => {
      const count = await productModel
        .find(myFilter)
        .populate('categories')
        .countDocuments();
      return res.status(200).json({
        status: 'SUCCESS',
        count: count,
        data: resolve,
      });
    });
};

export const rate = async (req, res) => {
  const params = req.params;
  const body = req.body;
  const user = req.user;
  console.log(body);

  const product = await productModel.findById(params.id);
  // check if users have rated this product before
  const isRated = product.ratings.find(
    (el) => el.userId.toString() === user.id
  );
  // handle when not rate before
  let resDB = {};
  if (!isRated) {
    // update avg
    const updateStarAvg =
      product.starAvg +
      (body.star - product.starAvg) / (product.ratings.length + 1);
    // update ratings
    const contentUpdate = {
      starAvg: updateStarAvg,
      $push: {
        ratings: {
          userId: user.id,
          star: body.star,
        },
      },
    };
    if (body.comment)
      contentUpdate.$push.comments = {
        userId: user.id,
        content: body.comment,
      };
    resDB = await productModel.findByIdAndUpdate(params.id, contentUpdate, {
      new: true,
    });
  }
  // handle if rated
  else {
    const starAvg = product.starAvg || 0;
    const updateStarAvg =
      starAvg + (body.star - isRated.star) / product.ratings.length;

    //
    const contentUpdate = {
      // $ points to the element found in the ratings array
      $set: { 'ratings.$.star': body.star, starAvg: updateStarAvg },
    };
    if (body.comment)
      contentUpdate.$push = {
        comments: {
          userId: user.id,
          content: body.comment,
        },
      };
    console.log(contentUpdate);
    resDB = await productModel.updateOne({ ratings: isRated }, contentUpdate, {
      new: true,
    });
  }

  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};
