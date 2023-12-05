import jwt from 'jsonwebtoken';
import { hashPassword } from '../../utils/helpers'
import User from '../../models/user';

const ResetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || token == null || !password || password.length === 0) {
      return res.status(400).send('Token and password are required');
    }

    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);

    const users = await User.find({ _id: decodedToken.id });
    if (users.length === 0) {
      return res.status(404).send('User not found');
    }
    const user = users[0];

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.token = '';
    await user.save();

    return res.status(200).send('Password reset successful');
  } catch (err) {
    return res.status(500).send('Internal Server Error',err);
  }
};

export default ResetPassword;

