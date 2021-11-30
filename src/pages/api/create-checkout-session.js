const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  console.log(items);
  console.log(email);

  const transFormedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: 'EUR',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1K0pZ6GHf2yXqQVOiAId4Xyh'],
    shipping_address_collection: {
      allowed_countries: ['ES', 'US', 'GB', 'CA'],
    },
    line_items: transFormedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
