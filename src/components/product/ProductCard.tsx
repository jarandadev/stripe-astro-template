import { useCartStore } from "@/store/store";
import { formatUnitAmount } from "@/lib/stripe"
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react"
import { navigate } from 'astro:transitions/client';
import type Stripe from "stripe"
import { Icon } from "../icons/Icon";


interface Props {
  price: Stripe.Price
}

export const ProductCard = ({ price }: Props) => {
  const product: Stripe.Product = price.product as Stripe.Product
  const { addToCart } = useCartStore()
  const priceFormatted = formatUnitAmount(price.unit_amount, price.currency)

  return (
    <div className="relative">
      <Card className="h-[300px]" fullWidth isHoverable shadow="sm" isPressable onPress={() => navigate(`/product/${price.id}`)}>
        <CardBody className="overflow-visible p-0">
          <Image
            alt={product.name}
            src={product.images[0]}
            loading="lazy"
            className="object-cover w-full max-h-[230px]"
            width={300}
            height={300}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <div className="text-left">
            <b>{product.name}</b>
            <p className="text-default-500">{priceFormatted}</p>
          </div>
        </CardFooter>
      </Card>
      <Button variant="flat" className="absolute right-3 bottom-3" isIconOnly onClick={() => addToCart(price)}>
        <Icon.CartAdd />
      </Button>
    </div>
  )
}
