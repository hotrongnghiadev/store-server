import { validationResult } from 'express-validator';

const validate = (validator) => {
  return [
    ...validator(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: 'VALIDATE ERROR',
          fields: errors.mapped(),
        });
      }
      next();
    },
  ];
};
export default validate;
