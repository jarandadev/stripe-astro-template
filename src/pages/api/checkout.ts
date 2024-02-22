import { HOST_URL } from "@/lib/config";
import { stripe } from "@/lib/stripe";
import type { APIRoute } from "astro";
import type Stripe from "stripe";

export const POST: APIRoute = async (req) => {
  try {
    const lineItems = await req.request.json() as Stripe.Checkout.SessionCreateParams.LineItem[]
    const newLineItems = lineItems.map((item) => {
      return {
        price: item.price,
        quantity: item.quantity
      }
    })
    const session = await stripe.checkout.sessions.create({
      line_items: newLineItems,
      mode: 'payment',
      success_url: HOST_URL,
      cancel_url: HOST_URL,
      billing_address_collection: 'required',
    });
    console.log(session)
    return new Response(JSON.stringify(session), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response('Error creating checkout session', { status: 500 })
  }

}