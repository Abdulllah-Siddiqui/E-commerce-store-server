import Orders from "../../models/orders";

const OrderAction = async (req, res) => {
  try {
    const { orderID } = req.body;

    const orders = await Orders.findOne({ _id: orderID });

    if (!orders) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    orders.action = orders.action === 'Delivered' ? 'Not Delivered' : 'Delivered';

    await orders.save();

    res.status(200).json({ msg: 'Order action toggled', updatedOrder: orders });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default OrderAction;
