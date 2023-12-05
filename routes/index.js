import express from 'express';
// import passport from "passport";
import('../config/passport/jwtStrategy');

import authRoutes from './auth.js';
import productRoutes from './products.js';
import cartRoutes from './cart.js';
import addressRoutes from './address.js'
import paymentRoutes from './payment.js';
import orderRoutes from './orders.js';
import jobRoutes from './jobs.js';
import mailRoutes from './nodemailer.js';
import notificationRoutes from './notifications.js'
import NonAuthenticatedRoute from './non-authenticated-routes.js'
import PaymentSuccess from '../controllers/orders/payment-success.js';

const router = express.Router();

// router.use('/products', passport.authenticate('jwt', { session: false }), productRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/address', addressRoutes);
router.use('/payment', paymentRoutes);
router.use('/orders', orderRoutes);
router.use('/jobs', jobRoutes);
router.use('/notifications', notificationRoutes)
router.use('/mail', mailRoutes);
router.use( NonAuthenticatedRoute);
router.post('/webhooks/paymentSuccess', PaymentSuccess);

export default router;
