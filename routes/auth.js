import express from 'express';
import { LoginMethod, SignupMethod, ForgotPassword, ResetPassword, VerifyToken, IsVerified } from '../controllers/auth'

const authRoutes = express.Router();

authRoutes.post('/login', LoginMethod);
authRoutes.post('/signup', SignupMethod);
authRoutes.post('/forgotPassword', ForgotPassword);
authRoutes.post('/resetPassword', ResetPassword);
authRoutes.post('/verifyToken', VerifyToken);
authRoutes.post('/isVerified', IsVerified);

export default authRoutes;
