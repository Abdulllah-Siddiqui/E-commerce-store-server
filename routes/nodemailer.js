import express from 'express';
import { SendMail, SendResetToken } from '../controllers/nodemailer/nodemailer';

const mailRoutes = express.Router();

mailRoutes.get('/nodemailer',SendMail);
mailRoutes.get('/sendResetToken',SendResetToken);

export default mailRoutes;


