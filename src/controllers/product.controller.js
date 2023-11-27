import slugify from 'slugify';
import productModel from '../models/product.model.js';
import HandleError from '../utils/HandleThrowError.utils.js';

export const create = async (req, res) => {
  const files = req.files;
  const { brand, category, name } = req.body;

  const checkProduct = await productModel.findOne({ name });
  if (checkProduct) throw new HandleError('product name areadly used', 400);

  const slug = slugify(name, { lower: true });
  const data = { brand, category, name, slug };

  for (const key in files) {
    data[key] = [];
    for (const arr of files[key]) {
      data[key].push(arr);
    }
  }

  const product = await productModel.create(data);
  console.log(product);

  return res.status(201).send('Ok');
};
