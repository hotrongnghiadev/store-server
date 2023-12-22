import { body } from 'express-validator';

export const create = () => {
  return [
    body('total', 'total is required').exists(),

    body('products', 'products is required').custom((products) => {
      const arr = products ? JSON.parse(products) : [];
      if (!arr.length) return true;
      return false;
    }),
  ];
};
