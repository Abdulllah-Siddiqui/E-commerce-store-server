import Users from "../../models/user";
import Stripe from "stripe";

const { STRIPE_PUBLISH_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = Stripe(STRIPE_SECRET_KEY);
const publicStripe = Stripe(STRIPE_PUBLISH_KEY);

const AddNewCard = async (req, res) => {
  try {
    const {
      userId,
      cvc,
      num
    } = req.body;
  
    const user = await Users.findOne({ _id: userId });

    if (user) {
      if (user.stripeId) {
        const card_Token = await publicStripe.tokens.create({
          card: {
            cvc,
            number: num,
            exp_month: '01',
            exp_year: '25',
          },
        });

        const newCard = await stripe.customers.createSource(user.stripeId, {
          source: `${card_Token.id}`,
        });

        res.status(200).send(newCard);
      } else {
        const customer = await stripe.customers.create({
          name: user.name,
          email: user.email,
        });

        await Users.updateOne({ _id: userId }, { stripeId: customer.id });

        const card_Token = await publicStripe.tokens.create({
          card: {
            cvc,
            number: num,
            exp_month: '01',
            exp_year: '25',
          },
        });

        const newCard = await stripe.customers.createSource(customer.id, {
          source: `${card_Token.id}`,
        });

        res.status(200).send(newCard);
      }
    } else {
      throw new Error('User does not');
    }
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error',err });
  }
};

export default AddNewCard;
