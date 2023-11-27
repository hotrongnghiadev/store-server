import brandModel from '../models/brand.model.js';

import HandleError from '../utils/HandleThrowError.utils.js';

export const create = async (req, res) => {
  const { name } = req.body;

  const checkExist = await brandModel.findOne({ name });
  if (checkExist) throw new HandleError(`${name} is existed`, 400);

  const brand = await brandModel.create(req.body);
  return res.status(201).json(brand);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const brand = await brandModel.findByIdAndUpdate(id, body, { new: true });
  return res.status(200).json(brand);
};

export const getAll = async (req, res) => {
  const brands = await brandModel.find().sort({ name: 1 });
  return res.status(200).json(brands);
};

export const delMany = async (req, res) => {
  console.log(req.query);
  const brands = await brandModel.deleteMany({ _id: req.query.ids });
  return res.status(200).json(brands);
};
