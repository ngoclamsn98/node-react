import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkTokenExpired =async (req,res,next) =>{
  if (!req.headers.authorization || (req.headers.authorization && !req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return res.status(403).json({ message: 'Token is not exit in headers'});
  }
  const token = req.headers.authorization.split(' ')[1] || null;
  try {
    const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized access.',
    });
  }
}