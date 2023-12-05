import Orders from "../../models/orders";

const FetchAllOrders = async (req, res) => {
  try {
    const { page } = req.body;
    const pageInt = parseInt(page) || 1;
    const pageSize = 10;
    const skip = (pageInt - 1) * pageSize;

    const totalOrders = await Orders.countDocuments();
    const totalPages = Math.ceil(totalOrders / pageSize);
    const orders = await Orders.find()
      .skip(skip)
      .limit(pageSize);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: 'No orders found' });
    }

    res.status(200).send({
      orders,
      totalOrders,
      currentPage: pageInt,
      totalPages
    });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error',err });
  }
};

export default FetchAllOrders;
