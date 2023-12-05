// import jwt from 'jsonwebtoken';
import User from '../../models/user';


export const VerifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const tokenAsString = token.toString();

    if (!token) {
      return res.status(400).send('Token is missing in the request body');
    }

    const user = await User.findOne({ token: tokenAsString });

    if (!user) {
      return res.status(401).send(false);
    }
    return res.status(200).send(true);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).send('Internal Server Error');
  }

};
