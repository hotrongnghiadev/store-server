import { body } from 'express-validator';

export const signup = () => {
  return [
    body('userName', 'userName is required').exists(),
    body('userName', 'userName length of 6 characters or more').isLength({
      min: 6,
    }),

    body('password', 'password is required').exists(),
    body('password', 'password length of 6 characters or more').isLength({
      min: 6,
    }),

    body('confirmPassword', 'confirmPassword is required').exists(),
    body('confirmPassword')
      .custom((confirmPassword, { req }) => {
        if (req.body.password === confirmPassword) return true;
        else return false;
      })
      .withMessage('confirmPassword is wrong'),
  ];
};

export const signin = () => {
  return [
    body('userName', 'userName is required').exists(),
    body('userName', 'userName length of 6 characters or more').isLength({
      min: 6,
    }),

    body('password', 'password is required').exists(),
    body('password', 'password length of 6 characters or more').isLength({
      min: 6,
    }),
  ];
};

export const updatePassword = () => {
  return [
    body('password', 'password is required').exists(),
    body('password', 'password length of 6 characters or more').isLength({
      min: 6,
    }),

    body('newPassword', 'password is required').exists(),
    body('newPassword', 'password length of 6 characters or more').isLength({
      min: 6,
    }),
  ];
};
