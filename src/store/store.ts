import type Stripe from 'stripe'
import { create } from 'zustand'

interface CartStore {
  cart: Stripe.Checkout.SessionCreateParams.LineItem[]
  addToCart: (price: Stripe.Price) => void
  setQuantityUp: (item: Stripe.Checkout.SessionCreateParams.LineItem) => void
  setQuantityDown: (item: Stripe.Checkout.SessionCreateParams.LineItem) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (price) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.price === price.id)

      if (existingItem) {
        return {
          cart: state.cart.map((i) => i.price !== price.id ? i : { ...i, quantity: i.quantity! + 1 }),
        }
      }

      const product: Stripe.Product = price.product as Stripe.Product

      const newItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        price: price.id,
        quantity: 1,
        price_data: {
          unit_amount: price.unit_amount ?? undefined,
          currency: price.currency,
          product_data: {
            name: product.name,
            images: product.images,
            description: product.description ?? '',

          },
        },
      }
      return { cart: [...state.cart, newItem] }
    }
    ),
  setQuantityUp: (item) =>
    set((state) => ({
      cart: state.cart.map((i) => i.price !== item.price ? i : { ...i, quantity: i.quantity! + 1 }),
    })),
  setQuantityDown: (item) =>
    set((state) => {
      if (item.quantity === 1) {
        return { cart: state.cart.filter((i) => i.price !== item.price) }
      }
      return {
        cart: state.cart.map((i) => i.price !== item.price ? i : { ...i, quantity: i.quantity! - 1 }),
      }
    }),
  clearCart: () => set({ cart: [] }),
}))