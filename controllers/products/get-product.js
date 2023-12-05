import Products from "../../models/products";

const GetProduct = ('/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const productDB = await Products.findOne({ title });

    if (!productDB) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send(productDB);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
});

export default GetProduct;
