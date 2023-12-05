import moment from "moment";
import Orders from "../../models/orders";

const GenerateRandomOrders = async (req, res) => {
  try {
    const {
      userID,
      userName,
      productDetails,
      status,
      amount
    } = req.body;

    const totalProducts = productDetails.length;
    const startDate = moment('2023-09-28');
    const endDate = moment('2023-10-28');
    const ordersToGenerate = 15;
    const generatedOrders = [];

    for (let i = 0; i < ordersToGenerate; i++) {
      const randomDate = moment(
        startDate + Math.random() * (endDate - startDate)
      );

      const order = new Orders({
        userID,
        userName,
        productDetails,
        status,
        amount,
        totalProducts,
        date: randomDate.toDate(),
      });

      generatedOrders.push(order);
    }

    await Orders.insertMany(generatedOrders);

    res.status(201).json({ message: 'Random orders generated successfully.' });
  } catch (err) {
    console.log('Error generating random orders:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export default GenerateRandomOrders;
