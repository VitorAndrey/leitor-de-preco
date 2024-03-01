import { ProductType } from 'src/types'
import image from '../assets/images/azulim.png'
import { AnimatedCounter } from 'react-animated-counter'

type ProductProps = {
  product: ProductType
}

export function Product({ product }: ProductProps) {
  return (
    <div className="h-screen w-screen flex gap-4 bg-red-300 flex-col items-center justify-center">
      <h3 className="text-4xl uppercase font-semibold">Azulim Multiuso</h3>
      <img src={image} className="h-3/6 rounded-3xl" />

      <div className="flex items-center text-3xl gap-2">
        <div className="digital flex items-center gap-3">
          <span className="text-5xl">R$</span>
          <AnimatedCounter value={4.99} color="black" fontSize="72px" />
        </div>
      </div>
    </div>
  )
}
