import Products from "../../models/products";

const UpdateProduct = async (req, res) => {
  try {
    const {
      productId,
      title,
      description,
      price,
      rating,
      quantity,
      brand,
      category,
      thumbnail,
      images
    } = req.body;

    const filter = { _id: productId };
    const update = {
      title,
      description,
      price,
      rating,
      quantity,
      brand,
      category,
      thumbnail,
      images
    };
    
    await Products.updateOne(filter, update);
    const productDB = await Products.findOne(filter);

    if (!productDB) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send({ msg: 'Product updated successfully', product: productDB });
  } catch (err) {
    console.log('Failed to update product', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default UpdateProduct;
