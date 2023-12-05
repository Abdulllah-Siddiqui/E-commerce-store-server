import Orders from "../../models/orders";
import Products from "../../models/products";
import Notifications from "../../models/notifications";
import User from "../../models/user";

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PlaceOrder = async (req, res) => {
  try {
    const {
      userID,
      userName,
      productDetails,
      amount,
      cardId
    } = req.body;

    for (const item of productDetails) {
      const productId = item.productID;
      const quantityOrdered = item.quantity;

      await Products.updateOne(
        { _id: productId },
        { stock: { $gte: quantityOrdered } },
        { $inc: { stock: -quantityOrdered, sold: +quantityOrdered } },
        { new: true }
      );
    }

    const totalProducts = productDetails.length;
    const order = new Orders({
      userID,
      userName,
      productDetails,
      amount,
      totalProducts
    });

    const savedOrder = await order.save();

    const user = await User.findOne({ _id: userID });

    const orderIdStr = savedOrder._id.toString() + '';
    const orderTotal = (amount * 100).toFixed(0);

    await stripe.charges.create({
      receipt_email: user.email,
      amount: orderTotal,
      currency: 'USD',
      card: cardId,
      customer: user.stripeId,
      metadata: { orderId: orderIdStr }
    });

    const admin = await User.findOne({ isAdmin: true });

    if (productDetails?.length) {
      const productTitles = productDetails.map((item) => item.title);
      const userNotiBody = `Congratulations, your order of ${productTitles.join(', ')} has been placed.`;
      const userNotification = new Notifications({
        userID,
        body: userNotiBody
      });
      await userNotification.save();
    }
    const adminNotiBody = `Order #${savedOrder._id} has been placed.`;
    const adminNotification = new Notifications({
      userID: admin._id,
      body: adminNotiBody
    });

    await adminNotification.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default PlaceOrder;
