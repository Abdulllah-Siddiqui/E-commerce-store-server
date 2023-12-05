import User from '../../models/user';

export const IsVerified = async (req, res) => {
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
    user.token = '';
    user.isVerified = true;
    await user.save();

    return res.status(200).send(true);
  } catch (err) {
    return res.status(500).send('Internal Server Error', err);
  }
};
