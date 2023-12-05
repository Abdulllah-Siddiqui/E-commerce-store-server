import Orders from "../../models/orders";

const PaymentSuccess = async (req, res) => {
  try {
    const metadata = req.body.data.object.metadata;

    const order = await Orders.updateOne({ _id: metadata.orderId }, { status: 'Paid' })

    if (order) {
      console.log(`Order #${metadata.orderId} was marked as paid.`);
      res.status(200).send(order);
    } else throw new Error('Cannot Mark Order As Paid');
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
}
export default PaymentSuccess;
