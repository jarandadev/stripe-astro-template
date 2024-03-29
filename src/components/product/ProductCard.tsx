import { useCartStore } from "@/store/store";
import { formatUnitAmount } from "@/lib/stripe"
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react"
import { navigate } from 'astro:transitions/client';
import type Stripe from "stripe"
import { Icon } from "../icons/Icon";
import { useToast } from "../ui/use-toast";

interface Props {
  price: Stripe.Price
}

export const ProductCard = ({ price }: Props) => {
  const product: Stripe.Product = price.product as Stripe.Product
  const { addToCart } = useCartStore()
  const { toast } = useToast()
  const priceFormatted = formatUnitAmount(price.unit_amount, price.currency)

  const handleAdd = () => {
    addToCart(price)
    toast({
      title: "Product added to cart",
      description: product.name,
    })
  }

  return (
    <div className="relative h-full">
      <Card className="h-full" fullWidth isHoverable shadow="sm" isPressable onPress={() => navigate(`/product/${price.id}`)}>
        <CardBody className="p-0">
          <Image
            alt={product.name}
            src={product.images[0]}
            loading="lazy"
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
      <Button variant="flat" className="absolute right-3 bottom-3" isIconOnly onClick={handleAdd}>
        <Icon.CartAdd />
      </Button>
    </div>
  )
}
