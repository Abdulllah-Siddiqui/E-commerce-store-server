import Cart from '../../models/cart';

const UpdateQuantity = async (req, res) => {
  try {
    const { itemID, key } = req.body;

    const cartItem = await Cart.findOne({ _id: itemID });

    if (!cartItem) {
      return res.status(404).json({ msg: 'Cart item not found.' });
    }
    let quantity = cartItem.quantity;

    if (key === 0) {
      if (quantity >= 1) {
        quantity -= 1;
      }
    }
    else if (key === 1) {
      quantity += 1;
    }
    else {
      return res.status(400).json({ msg: 'Invalid key or key not found.' });
    }
    cartItem.quantity = quantity;

    await cartItem.save();

    return res.status(200).json(cartItem);
  } catch (err) {
    return res.status(500).json({ msg: `Internal Server Error: ${err}` });
  }
};

export default UpdateQuantity;
