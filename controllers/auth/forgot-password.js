import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { SendResetToken } from '../nodemailer/nodemailer';

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).send('Invalid email');
    }
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(401).send('User not found');
    }
    const { SECRET_KEY } = process.env;
    const secretKey = SECRET_KEY;
    const params = {
      id: userDB._id,
      email: userDB.email
    }
    const token = await jwt.sign(params, secretKey);
    userDB.token = token;

    await userDB.save();
    await SendResetToken(email, token);

  } catch (err) {
    console.log('Err', err);
    return res.status(500).send('Internal Server Error');

  }
};

export default ForgotPassword;
