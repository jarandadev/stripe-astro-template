import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Icon } from "../icons/Icon"
import { useCartStore } from "@/store/store"
import { CartItem } from "./CartItem"
import { Button } from "@nextui-org/react"
import { formatUnitAmount, getCheckoutSession } from "@/lib/stripe"
import { navigate } from "astro/virtual-modules/transitions-router.js"

export const Cart = () => {
  const { cart } = useCartStore()

  const handleCheckout = async () => {
    const { url } = await getCheckoutSession(cart)
    navigate(url)
  }

  const isCartEmpty = cart.length === 0

  const totalItems = isCartEmpty ? 0 : cart.reduce((total, currentItem) => {
    return total + currentItem.quantity!;
  }, 0);

  const totalPrice = cart.reduce((acc, item) => {
    if (item.quantity && (item.price || (item.price_data && item.price_data.unit_amount))) {
      const unitPrice = item.price_data?.unit_amount!;
      return acc + unitPrice * item.quantity;
    }
    return acc;
  }, 0);

  const totalPriceFormatted = formatUnitAmount(totalPrice, cart[0]?.price_data?.currency)

  return (
    <Sheet>
      <SheetTrigger>
        <Icon.Cart />
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Cart {`(${totalItems})`}</SheetTitle>
          {isCartEmpty && <SheetDescription>Your cart is empty</SheetDescription>}
        </SheetHeader>
        <div className="space-y-4 my-6">
          {!isCartEmpty && cart.map((item, i) => <CartItem key={i} item={item} />)}
        </div>
        {!isCartEmpty &&
          <SheetFooter>
            <div className="flex items-center justify-between w-full text-small">
              <b><span className="font-normal">Total: </span>{totalPriceFormatted}</b>
              <Button variant="flat" onClick={handleCheckout}>Checkout</Button>
            </div>
          </SheetFooter>
        }
      </SheetContent>
    </Sheet>
  )
}
