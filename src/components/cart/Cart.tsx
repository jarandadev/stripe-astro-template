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
import { getCheckoutSession } from "@/lib/stripe"
import { navigate } from "astro/virtual-modules/transitions-router.js"

interface Props {
}

export const Cart = ({ }: Props) => {
  const { cart } = useCartStore()

  const handleCheckout = async () => {
    const {url} = await getCheckoutSession(cart)
    navigate(url)
  }

  const isCartEmpty = cart.length === 0

  const totalItems = isCartEmpty ? 0 : cart.reduce((total, currentItem) => {
    return total + currentItem.quantity!;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger>
        <Icon.Cart />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart {`(${totalItems})`}</SheetTitle>
          {isCartEmpty && <SheetDescription>Your cart is empty</SheetDescription>}
        </SheetHeader>
        <div className="space-y-4 my-6">
          {!isCartEmpty && cart.map((item, i) => <CartItem key={i} item={item} />)}
        </div>
        <SheetFooter>
          {!isCartEmpty && <Button variant="flat" onClick={handleCheckout}>Checkout</Button>}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
