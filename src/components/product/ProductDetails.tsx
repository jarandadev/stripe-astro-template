import { useCartStore } from "@/store/store";
import { formatUnitAmount } from "@/lib/stripe"
import { Card, CardBody, CardFooter, Button, CardHeader } from "@nextui-org/react"
import { navigate } from 'astro:transitions/client';
import type Stripe from "stripe"
import { Icon } from "../icons/Icon";
import { useToast } from "../ui/use-toast";

interface Props {
  price: Stripe.Price
}

export const ProductDetails = ({ price }: Props) => {
  const product: Stripe.Product = price.product as Stripe.Product
  const { toast } = useToast()
  const { addToCart } = useCartStore()
  const priceFormatted = formatUnitAmount(price.unit_amount, price.currency)

  const handleAdd = () => {
    addToCart(price)
    toast({
      title: "Product added to cart",
      description: product.name,
    })
  }

  return (
    <Card shadow="sm" className="w-full">
      <CardHeader>
        <h1 className="font-bold text-2xl mb-2">{product.name}</h1>
      </CardHeader>

      <CardBody>
        {product?.description && <p><span className="font-bold">Description: </span>{product.description}</p>}
        <p><span className="font-bold">Price: </span>{priceFormatted}</p>
      </CardBody>
      <CardFooter className="flex gap-4 flex-col sm:flex-row items-start">
        <Button variant="flat" onClick={handleAdd}>
          Add to Cart<Icon.CartAdd />
        </Button>
        <Button variant="light" onClick={() => navigate('/')}>
          Continue Shopping<Icon.ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
