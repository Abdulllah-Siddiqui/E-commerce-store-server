// import Products from "../../models/products";
import User from "../../models/user";

const addStockToAllProducts = async (req, res) => {
  try {
    const { token, isVerified } = req.body;

    await User.updateMany({}, { $set: { token, isVerified } });

    res.status(200).json({ message: 'token and isVerified field added to all products successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default addStockToAllProducts;
