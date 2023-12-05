import Products from "../../models/products";
import("../../config/passport/jwtStrategy")

const GetProducts = async (req, res) => {

  if (req.user.isAdmin) {
    try {
      const { page, filter } = req.body;
      const pageInt = parseInt(page) || 1;
      const pageSize = 10;
      const skip = (pageInt - 1) * pageSize;
      const queryObj = {};

      if (filter.search) {
        queryObj.title = { $regex: new RegExp(filter.search, 'i') };
      }
      const totalProducts = await Products.countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);
      const products = await Products.find({
        $and: [
          { isDeleted: false },
          { ...queryObj }
        ]
      })
        .skip(skip)
        .limit(pageSize);

      if (!products || products.length === 0) {
        return res.status(404).send({ msg: 'No products found' });
      }

      res.status(200).send({
        products,
        totalProducts,
        currentPage: pageInt,
        totalPages
      });
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error', err });
    }
  } else {
    throw new Error('Access denied');
  }
}

export default GetProducts;
