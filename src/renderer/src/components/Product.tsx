import { ProductType } from 'src/types'

type ProductProps = {
  product: ProductType
}

export function Product({ product }: ProductProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h3>{product.name}</h3>
      <span>{product.price}</span>
    </div>
  )
}
