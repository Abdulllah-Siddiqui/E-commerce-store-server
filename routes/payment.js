import express from 'express';
import { AddPaymentMethod, GetPaymentMethod } from '../controllers/payment';

const paymentRoutes = express.Router();

paymentRoutes.post('/addPaymentMethod', AddPaymentMethod);
paymentRoutes.post('/getPaymentMethod', GetPaymentMethod);

export default paymentRoutes;
