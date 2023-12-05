import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { comparePassword } from '../../utils/helpers';

const LoginMethod = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(401).send('Invalid credentials');
    }

    const isValid = await comparePassword(password, userDB.password);
    const { SECRET_KEY } = process.env;

    if (isValid) {
      const secretKey = SECRET_KEY;
      const params = {
        id: userDB._id,
        email: userDB.email
      }
      const token = await jwt.sign(params, secretKey, { expiresIn: '2d' });

      return res.status(200).json({ token: token, user: userDB });
    }

    return res.status(401).send('Wrong Password');
  } catch (err) {
    return res.status(500).send('Internal Server Error', err);
  }
};

export default LoginMethod;
