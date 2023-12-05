import Products from "../../models/products";

const GetTopProducts = async (req, res) => {
  try {
    const topProducts = await Products.find({ isDeleted: false })
      .sort({ sold: -1 })
      .limit(10);

    if (!topProducts || topProducts.length === 0) {
      return res.status(404).send({ msg: 'No products found' });
    }

    res.status(200).send({
      products: topProducts,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default GetTopProducts;
