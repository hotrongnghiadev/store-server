import jsonwebtoken from 'jsonwebtoken';
import HandleError from '../utils/HandleThrowError.utils.js';

const handleToken = async (req, res, next) => {
  const auth = req.headers.authorization;
  // check access token
  if (!auth) throw new HandleError('authorization is not exist', 401);
  if (!auth.startsWith('Bearer'))
    throw new HandleError('authorization is invalid', 401);

  // decode access token
  const accessToken = auth.split(' ')[1];
  jsonwebtoken.verify(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError')
        throw new HandleError('accessToken is expired', 401);
      else throw new HandleError('accessToken is invalid', 401);
    }
    // pass data into req.user
    req.user = decoded;
    next();
  });
};

export default handleToken;
