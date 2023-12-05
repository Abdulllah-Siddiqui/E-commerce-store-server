import express from 'express';
import { AddAddress, GetAddress } from '../controllers/address';
const addressRoutes = express.Router();

addressRoutes.post('/addAddress', AddAddress);
addressRoutes.post('/getAddress', GetAddress);

export default addressRoutes;