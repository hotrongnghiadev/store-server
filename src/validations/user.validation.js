import { check } from 'express-validator';

export const signup = () => {
  return [
    check('userName', 'userName is required').exists(),
    check('userName', 'userName length of 6 characters or more').isLength({
      min: 6,
    }),

    check('password', 'password is required').exists(),
    check('password', 'password length of 6 characters or more').isLength({
      min: 6,
    }),
  ];
};

export const signin = () => {
  return [
    check('userName', 'userName is required').exists(),
    check('userName', 'userName length of 6 characters or more').isLength({
      min: 6,
    }),

    check('password', 'password is required').exists(),
    check('password', 'password length of 6 characters or more').isLength({
      min: 6,
    }),
  ];
};

export const updatePassword = () => {
  return [
    check('password', 'password is required').exists(),
    check('password', 'password length of 6 characters or more').isLength({
      min: 6,
    }),

    check('newPassword', 'password is required').exists(),
    check('newPassword', 'password length of 6 characters or more').isLength({
      min: 6,
    }),
  ];
};
