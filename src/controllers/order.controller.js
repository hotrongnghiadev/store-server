import orderModel from '../models/order.model.js';

export const create = async (req, res) => {
  const { id } = req.user;
  const { total, cart } = req.body;

  const products = cart?.map((el) => ({
    productId: el.product.id,
    quantity: el.quantity,
  }));
  const order = new orderModel({
    userId: id,
    products,
    total,
  });
  await order.save();
  return res.status(200).json(order);
};

export const getAll = async (req, res) => {
  const orders = await orderModel
    .find()
    .populate('products.productId')
    .populate('userId');
  return res.status(200).json(orders);
};

export const getByUser = async (req, res) => {
  const { id } = req.user;
  const orders = await orderModel
    .find({ userId: id })
    .populate('products.productId');
  return res.status(200).json(orders);
};
