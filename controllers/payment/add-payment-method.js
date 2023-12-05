import Payments from "../../models/payments";
import Users from "../../models/user";
import Stripe from "stripe";

const { STRIPE_PUBLISH_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = Stripe(STRIPE_SECRET_KEY);
const publicStripe = Stripe(STRIPE_PUBLISH_KEY);

const AddPaymentMethod = async (req, res) => {

  try {
    const {
      userID,
      cardNumber,
      cardExpiry,
      cardCVC,
      cardCountry,
      cardType,
    } = req.body;

    if (!userID || !cardNumber || !cardCVC || !cardType) {
      return res.status(400).json({ msg: 'userID, cardNumber, cardCVC, and cardType are required' });
    }

    const newPaymentMethod = new Payments({
      userID,
      cardNumber,
      cardExpiry,
      cardCVC,
      cardCountry,
      cardType,
    });

    const savedPaymentMethod = await newPaymentMethod.save();

    const user = await Users.findOne({ _id: userID });

    if (user) {
      if (user.stripeId) {
        const card_Token = await publicStripe.tokens.create({
          card: {
            cvc: cardCVC,
            number: cardNumber,
            exp_month: '01',
            exp_year: '25',
          },
        });

        const newCard = await stripe.customers.createSource(user.stripeId, {
          source: `${card_Token.id}`,
        });

        res.status(200).send({ savedCard: savedPaymentMethod, stripeCard: newCard });
      } else {
        const customer = await stripe.customers.create({
          name: user.name,
          email: user.email,
        });

        await Users.updateOne({ _id: userID }, { stripeId: customer.id });

        const card_Token = await publicStripe.tokens.create({
          card: {
            cvc: cardCVC,
            number: cardNumber,
            exp_month: '01',
            exp_year: '25',
          },
        });

        const newCard = await stripe.customers.createSource(customer.id, {
          source: `${card_Token.id}`,
        });

        res.status(200).send({ savedCard: savedPaymentMethod, stripeCard: newCard });
      }
    } else {
      throw new Error('User does not');
    }
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default AddPaymentMethod;
