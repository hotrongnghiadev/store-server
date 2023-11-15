import jsonwebtoken from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import HandleError from '../utils/HandleThrowError.utils.js';

export const signup = async (req, res) => {
  const { userName, password } = req.body;

  const isExist = await userModel.findOne({ userName });
  if (isExist) throw new HandleError('username already used');

  const user = new userModel();

  user.userName = userName;
  user.setPassword(password);

  await user.save();

  const accessToken = jsonwebtoken.sign(
    { data: user._id },
    process.env.TOKEN_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    accessToken,
    ...user._doc,
  });
};

export const signin = async (req, res) => {
  const { userName, password } = req.body;

  // check is the info login
  const user = await userModel
    .findOne({ userName })
    .select('userName password salt _id');
  console.log(user);
  if (!user) throw new HandleError('userName is wrong', 401);

  if (!user.validPassword(password))
    throw new HandleError('password is wrong', 401);

  // handle after login
  const accessToken = jsonwebtoken.sign(
    { id: user.id },
    process.env.TOKEN_SECRET,
    { expiresIn: '24h' }
  );

  user.password = undefined;
  user.salt = undefined;

  return res.status(200).json({
    accessToken,
    ...user._doc,
  });
};

export const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { password, newPassword } = req.body;

  // check if the password is correct
  const user = await userModel.findById(id).select('id password salt');

  if (!user) throw new HandleError('user is not exist', 401);
  if (!user.validPassword(password))
    throw new HandleError('password is wrong', 401);

  // update password
  user.setPassword(newPassword);
  await user.save();

  res.status(200).json({
    status: 'success',
  });
};

export const getCurrent = async (req, res) => {
  const { id } = req.user;

  const user = await userModel.findById(id);
  if (!user) throw new HandleError('user is not found', 400);

  return res.status(200).json(user);
};
