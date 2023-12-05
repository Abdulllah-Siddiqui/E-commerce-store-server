import Payments from "../../models/payments";

const GetPaymentMethod = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ msg: 'userID is required' });
    }

    const paymentMethods = await Payments.find({ userID });

    if (!paymentMethods) {
      return res.status(404).json({ msg: 'Payment method not found for the specified userID' });
    }

    res.status(200).json(paymentMethods);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error',err });
  }
};

export default GetPaymentMethod;
