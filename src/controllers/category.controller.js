import categoryModel from '../models/category.model.js';
import HandleError from '../utils/HandleThrowError.utils.js';

export const create = async (req, res) => {
  const { name } = req.body;

  const checkExist = await categoryModel.findOne({ name });
  if (checkExist) throw new HandleError(`${name} is existed`, 400);

  const category = await categoryModel.create(req.body);
  return res.status(201).json(category);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = await categoryModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  return res.status(200).json(category);
};

export const getAll = async (req, res) => {
  const categories = await categoryModel.find().sort({ name: 1 });
  return res.status(200).json(categories);
};

export const delMany = async (req, res) => {
  const categories = await categoryModel.deleteMany({ _id: req.query.ids });
  return res.status(200).json(categories);
};
