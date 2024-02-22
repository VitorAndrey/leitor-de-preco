import { ProductType } from 'src/types'
import image from '../assets/images/azulim.png'
import { AnimatedCounter } from 'react-animated-counter'

type ProductProps = {
  product: ProductType
}

export function Product({ product }: ProductProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-3xl">{product.name}</h3>
      <img src={image} className="h-3/5 rounded-3xl" />
      <div>
        <AnimatedCounter value={product.price} color="black" />
      </div>
    </div>
  )
}
