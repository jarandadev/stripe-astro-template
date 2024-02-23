import { stripe } from "@/lib/stripe";
import type { APIRoute } from "astro";
import type Stripe from "stripe";

export const GET: APIRoute = async () => {
  return new Response('Method not allowed', { status: 405 })
}

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
      success_url: req.request.headers.get('referer') || '/',
      cancel_url: req.request.headers.get('referer') || '/',
      billing_address_collection: 'required',
    });
    return new Response(JSON.stringify(session), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response('Error creating checkout session', { status: 500 })
  }

}