import { useCartStore } from "@/store/store";
import { formatUnitAmount } from "@/lib/stripe"
import { Card, CardBody, CardFooter, Button, CardHeader } from "@nextui-org/react"
import { navigate } from 'astro:transitions/client';
import type Stripe from "stripe"
import { Icon } from "../icons/Icon";
import { HOST_URL } from "@/lib/config";


interface Props {
  price: Stripe.Price
}

export const ProductDetails = ({ price }: Props) => {
  const product: Stripe.Product = price.product as Stripe.Product
  const { addToCart } = useCartStore()
  const priceFormatted = formatUnitAmount(price.unit_amount, price.currency)
  const imageHeight = 300

  return (
      <Card shadow="sm">
        <CardHeader>
          <h1 className="font-bold text-2xl mb-2">{product.name}</h1>
        </CardHeader>

        <CardBody>
          {product?.description && <p><span className="font-bold">Description: </span>{product.description}</p>}
          <p><span className="font-bold">Price: </span>{priceFormatted}</p>
        </CardBody>
        <CardFooter className="space-x-4">
          <Button variant="flat" onClick={() => addToCart(price)}>
            Add to Cart<Icon.CartAdd />
          </Button>
          <Button variant="light" onClick={() => navigate(HOST_URL)}>
            Continue Shopping<Icon.ArrowRight />
          </Button>
        </CardFooter>
      </Card>
  )
}
