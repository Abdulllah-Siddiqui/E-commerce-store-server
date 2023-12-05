import Cart from '../../models/cart';

const AddToCart = async (req, res) => {
  try {
    const {
      productID,
      userID,
      title,
      description,
      price,
      brand,
      rating,
      quantity,
      thumbnail,
      size,
      colour
    } = req.body;

    const existingCartItem = await Cart.findOne({ productID, userID });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

    } else {
      const cartItem = new Cart({
        productID,
        userID,
        title,
        description,
        price,
        brand,
        rating,
        quantity,
        thumbnail,
        size,
        colour
      });
      await cartItem.save();
    }

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export default AddToCart;
