import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')('sk_test_51LTRpuI367r17akcRDtlKD4OPB2Noav5ZIEOChB5ydvuTZXCkdvdEybYiqT24AsWHbkDLBLVG0zRVxvw4IitfJAY00BjaGvLQN');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cart } = JSON.parse(req.body);

  console.log(cart)

  const lineItems = [];
  for (const key in cart) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: cart[key].name,
          //images: [cart[key].imageUrl]
        },
        unit_amount: cart[key].price * 100
      },
      quantity: cart[key].qty
    })
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [...lineItems],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
  });

  res.status(200).json({ session });
};