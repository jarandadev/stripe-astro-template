import { useCartStore } from "@/store/store"
import type Stripe from "stripe"
import { Icon } from "../icons/Icon";
import { Button, Image } from "@nextui-org/react";
import { formatUnitAmount } from "@/lib/stripe";

interface Props {
  item: Stripe.Checkout.SessionCreateParams.LineItem
}

export const CartItem = ({ item }: Props) => {
  const product: Stripe.Product = item.price_data?.product_data as Stripe.Product
  const { setQuantityUp, setQuantityDown } = useCartStore()
  const priceFormatted = formatUnitAmount(item.price_data?.unit_amount, item.price_data?.currency)

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Image className="border w-20 h-20 object-cover" src={product.images[0]} alt={product.name} />
        <div className=" flex flex-col justify-between">
          <b>{product.name}</b>
          <p>{priceFormatted}</p>
          <div className="flex">
            <Button variant='flat' size="sm" className="rounded-l-md" isIconOnly radius="none" onClick={() => setQuantityDown(item)}>
              <Icon.Minus height={20} width={20} />
            </Button>
            <Button variant='flat' size="sm" isIconOnly disabled radius="none">
              {item.quantity}
            </Button>
            <Button variant='flat' size="sm" className="rounded-r-md" isIconOnly radius="none" onClick={() => setQuantityUp(item)}>
              <Icon.Plus height={20} width={20} />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <p><span></span></p>
      </div>
    </div>
  )
}