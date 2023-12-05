import express from 'express';
import passport from "passport";
import('../config/passport/jwtStrategy');
import { AddProduct, GetProduct, GetProducts, DeleteProduct, UpdateProduct, GetUserProducts, addStockToAllProducts, GetTopProducts, AddBulkProducts } from '../controllers/products';

const productRoutes = express.Router();

productRoutes.post('/addProduct',passport.authenticate('jwt', { session: false }), AddProduct);
productRoutes.get('/getProduct/:title', GetProduct);
productRoutes.post('/getProducts',passport.authenticate('jwt', { session: false }), GetProducts);
productRoutes.delete('/deleteProduct/:productId',passport.authenticate('jwt', { session: false }), DeleteProduct);
productRoutes.patch('/updateProduct', passport.authenticate('jwt', { session: false }), UpdateProduct);
productRoutes.post('/getUserProducts', GetUserProducts);
productRoutes.post('/addStockToAllProducts', addStockToAllProducts);
productRoutes.get('/getTopProducts', GetTopProducts);
productRoutes.post('/addBulkProducts',passport.authenticate('jwt', { session: false }), AddBulkProducts);


export default productRoutes;
