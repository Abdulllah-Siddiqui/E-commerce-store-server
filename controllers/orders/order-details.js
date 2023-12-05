import Orders from "../../models/orders";

const OrderDetails = async (req, res) => {
  try {
    const totalAmount = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalUnits = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalUnits: { $sum: { $size: '$productDetails' } },
        },
      },
    ]);
    const totalOrders = await Orders.countDocuments();

    res.send({
      totalAmount: totalAmount[0] ? parseFloat(totalAmount[0].totalAmount.toFixed(2)) : 0,
      totalUnits: totalUnits[0] ? totalUnits[0].totalUnits : 0,
      totalOrders: totalOrders,

    });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default OrderDetails;
