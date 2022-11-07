import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

/* 
Credit Card Test Details:
4242 4242 4242 4242
04 / 24
424
 */

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        allow_promotion_codes: true,
        shipping_options: [
          { shipping_rate: 'shr_1M1LUOL9jrX4SsiB4EOzdDEv' },
          { shipping_rate: 'shr_1M1LZFL9jrX4SsiB4W0rGk9d' },
        ],

        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
