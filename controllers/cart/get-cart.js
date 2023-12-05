import Cart from '../../models/cart';

const GetCart = async (req, res) => {
  try {
    const { userID } = req.body;

    const getCart = await Cart.find({ userID });
    
    return res.status(200).send(getCart);
  } catch (err) {
    return res.status(500).send(`Internal Server Error${err}`);
  }
};

export default GetCart;