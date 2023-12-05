import Cart from '../../models/cart';

const EmptyCart = async (req, res) => {
  try {
    const userID = req.body.userID;

    if (!userID) {
      return res.status(400).json({ message: 'userID is required in the request body' });
    }
    const deletedCartItems = await Cart.deleteMany({ userID });

    if (deletedCartItems.deletedCount === 0) {
      return res.status(404).json({ message: 'No cart items found for the specified userID' });
    }

    res.status(200).json({ message: 'Cart emptied successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export default EmptyCart;
