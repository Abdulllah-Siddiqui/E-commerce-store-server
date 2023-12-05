import Cart from '../../models/cart';

const DeleteCart = async (req, res) => {
  try {
    const { cartID } = req.body;
    
    if (!cartID) {
      return res.status(400).json({ message: 'CartID are required in the request body' });
    }
    const deletedCartItem = await Cart.deleteOne({ _id: cartID });

    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    res.status(200).json({ message: 'Item deleted from the cart successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export default DeleteCart;