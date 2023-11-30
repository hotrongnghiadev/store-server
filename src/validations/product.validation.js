import { body, check } from 'express-validator';

export const create = () => {
  return [
    body('name', 'name is required').exists().notEmpty(),
    body('brandId', 'brandId is required').exists().notEmpty(),
    body('categoryId', 'categoryId is required').exists().notEmpty(),
    body('price', 'price is required').exists().notEmpty(),
    body('inventory', 'inventory is required').exists().notEmpty(),
    body('color', 'color is required').exists().notEmpty(),
    body('general', 'general is required')
      .custom((general) => {
        const arr = general ? JSON.parse(general) : [];
        if (!arr.length) return true;
        if (arr.some((el) => Object.values(el).every((e) => e !== '')))
          return true;
        return false;
      })
      .withMessage('general is invalid'),
    body('detail', 'detail is required')
      .custom((detail) => {
        const arr = detail ? JSON.parse(detail) : [];
        if (!arr.length) return true;
        if (arr.some((el) => Object.values(el).every((e) => e !== '')))
          return true;
        return false;
      })
      .withMessage('detail is invalid'),
  ];
};
