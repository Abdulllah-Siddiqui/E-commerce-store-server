import Products from "../../models/products";

const GetUserProducts = async (req, res) => {
  try {
    const { page, filter } = req.body;

    const pageInt = parseInt(page) || 1;
    const pageSize = 10;
    const skip = (pageInt - 1) * pageSize;

    const queryObj = {};
    const sortObj = {};

    if(filter){
      if(filter.colour) queryObj.colour = filter.colour;

      if(filter.size) queryObj.size = filter.size;

      if(filter.price) {
        const priceValues = filter.price.split('-');
        const [min, max] = priceValues.map((value) => parseInt(value.replace('$', '')));
        queryObj.price = { $gte: min, $lte: max };
      }

      if(filter.sort) {
        switch (filter.sort) {
          case '1':
            sortObj.price = 1;
            break;
          case '2':
            sortObj.price = -1;
            break;
        }
      }

      if (filter.search) {
        queryObj.title = { $regex: new RegExp(filter.search, 'i') };
      }
    }

    const totalProducts = await Products.countDocuments(queryObj);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Products.find({
    $and: [
      { isDeleted: false },
      { ...queryObj }
    ]
  })
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize);

    if (!products || products.length === 0) {
      return res.status(404).send({ msg: 'No products found' });
    }
    
    res.status(200).send({products, totalPages});
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
}

export default GetUserProducts;
