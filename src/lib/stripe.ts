import { CURRENCY, STRIPE_SECRET_KEY } from '@/lib/config'
import Stripe from 'stripe'

export const stripe = new Stripe(
  STRIPE_SECRET_KEY,
  {
    apiVersion: '2023-10-16',
    typescript: true
  }
)

const CURRENCY_SYM: { [key in string]: string } = {
  eur: '€',
  usd: '$',
}

export const formatUnitAmount = (amount?: number | null, currency?: string) => {
  if (amount === null || amount === undefined) return ''
  if (!currency) return ''
  return `${(amount / 100).toFixed(2)} ${CURRENCY_SYM[currency]}`
}

export const getPrices = async () => {
  const { data: prices } = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    limit: 100,
  })
  return prices
}

export const getPriceBy = async (id: string) => {
  const price = await stripe.prices.retrieve(id, { expand: ['product'] })
  return price
}

export const getCheckoutSession = async (cart: Stripe.Checkout.SessionCreateParams.LineItem[]) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  })
  return response.json()
}
