import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro'
import Cors from 'micro-cors';

import Stripe from 'stripe';

import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        secret,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            // eslint-disable-next-line no-case-declarations
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false,
            );

            break;
          case 'checkout.session.completed':
            // eslint-disable-next-line no-case-declarations
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true,
            );

            break;
          default:
            throw new Error('Unhandled event.');
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed.' });
      }
    }

    return res.json({ received: true });
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method not allowed');
}

export default cors(webhookHandler);
