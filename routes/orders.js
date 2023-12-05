import express from 'express';
import { PlaceOrder, FetchOrders, FetchAllOrders, GenerateRandomOrders, OrderDetails, OrderAction, AddNewCard } from '../controllers/orders';


const orderRoutes = express.Router();

orderRoutes.post('/placeOrder', PlaceOrder);
orderRoutes.post('/fetchOrders', FetchOrders);
orderRoutes.post('/fetchAllOrders', FetchAllOrders);
orderRoutes.post('/generateRandomOrders', GenerateRandomOrders);
orderRoutes.get('/orderDetails', OrderDetails);
orderRoutes.post('/orderAction', OrderAction);
orderRoutes.post('/addNewCard', AddNewCard);

export default orderRoutes;
