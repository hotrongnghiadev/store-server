import express from 'express';
import userRouter from './user.route.js';
import brandRouter from './brand.route.js';
import categoryRouter from './category.route.js';
import productRouter from './product.route.js';
import orderRouter from './order.route.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);

export default router;
