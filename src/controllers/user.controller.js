import HandleError from '../utils/HandleThrowError.utils.js';

export const signup = (req, res) => {
  throw new HandleError('abc', 400);
};
