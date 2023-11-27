import { check } from 'express-validator';

export const create = () => {
  return [
    check('brand', 'brandId is required').exists(),
    check('category', 'categoryId is required').exists(),
    check('name', 'name is required').exists(),
  ];
};
