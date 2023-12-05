import jwt from 'jsonwebtoken';
import { Stripe } from 'stripe';
import('../../config/passport/localStrategy');
import User from '../../models/user';
import { hashPassword } from '../../utils/helpers'
import { SendMail } from '../nodemailer/nodemailer';

const { STRIPE_SECRET_KEY } = process.env
const stripe = Stripe(STRIPE_SECRET_KEY);

const SignupMethod = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('Email and password are required.');
    }
    const userDB = await User.findOne({ email });

    if (userDB) {
      return res.status(400).send({ msg: 'User already exists.' });
    } else {
      const { SECRET_KEY: secretKey } = process.env;
      
      const params = { email };
      const token = await jwt.sign(params, secretKey);
      const password = hashPassword({password});

      const customer = await stripe.customers.create({ name, email });
      const newUser = await User.create({ name, email, password, mobile, token, stripeId: customer.id });
      newUser.save();
      SendMail(email, name, token);

      res.status(200).send({ msg: 'User created successfully.' });
    }
  } catch (err) {
    return res.status(500).send('Internal Server Error',err);
  }
};

export default SignupMethod;
