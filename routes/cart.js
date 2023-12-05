import express from 'express';
import { AddToCart, GetCart, DeleteCart, EmptyCart, UpdateQuantity } from '../controllers/cart';

const cartRoutes = express.Router();

cartRoutes.post('/addToCart', AddToCart);
cartRoutes.post('/getCart', GetCart);
cartRoutes.post('/deleteCart', DeleteCart);
cartRoutes.post('/emptyCart', EmptyCart);
cartRoutes.post('/updateQuantity', UpdateQuantity); 

export default cartRoutes;