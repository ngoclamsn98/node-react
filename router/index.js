import express from 'express';
import { login, refreshToken, signUp } from '../controller/signin';
import { checkTokenExpired } from '../middleware';
import { getProducts } from '../controller/production';
const router = express.Router();

// Product
router.get('/product',checkTokenExpired,getProducts);
router.get('/product1',checkTokenExpired,getProducts);
router.get('/product2',checkTokenExpired,getProducts);
// Signin
router.post('/login',login);
router.post('/signup',signUp)
router.post('/refresh_token',refreshToken);

// 
export default router;