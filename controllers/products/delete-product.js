import Products from "../../models/products";

const DeleteProduct = async (req, res) => {
  
  if (req.user && req.user.isAdmin) {
    try {
      const { productId } = req.params;

      await Products.updateOne({
        _id: productId
      }, {
        $set: {
          isDeleted: true
        }
      });
      res.status(200).send({ msg: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error', err });
    }
  } else {
    throw new Error('Access denied');
  }
};

export default DeleteProduct;
