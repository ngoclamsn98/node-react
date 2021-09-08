import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { users } from '../../fakeUser';
import { tokenLife, refreshTokenLife } from '../../configs';
dotenv.config();

const tokenList = {};

export const login= async (req,res) => {
  try {
    const { username, password } = req.body;
    if(users.some(user=> user.username === username && user.password === password)){
      const user = users.find(user=>user.username === username && user.password === password);
      const token = jwt.sign(user, process.env.CREATE_TOKEN, {expiresIn: tokenLife});
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: refreshTokenLife});
      tokenList[refreshToken] = user;
      return res.status(200).json({token,refreshToken});
    }
    return res.status(200).json({message:"user is not exit!"});
  } catch (error) {
    return res.json({error});
  }
}

export const signUp = async (req,res) => {
  try {
    const { username, password } = req.body;
    if(users.some(user=> user.username === username)){
      return res.status(200).json({message: "username is exit !"});
    }
    return res.status(200).json({data: req.body});
  } catch (error) {
    return res.json({error});
  }
}

export const refreshToken = async (req,res) => {
  let { refreshToken } = req.body;
  if (refreshToken && (refreshToken in tokenList)) {
    try {
      const user = tokenList[refreshToken];
      const token = jwt.sign(user, process.env.CREATE_TOKEN, {expiresIn: tokenLife});
      refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: refreshTokenLife});
      tokenList[refreshToken] = user;
      return res.status(200).json({token, refreshToken});
    } catch (err) {
      return res.status(403).json({
        message: 'Invalid refresh token',
      });
    }
  } else {
    res.status(400).json({
      message: 'Invalid request',
    });
  }
}