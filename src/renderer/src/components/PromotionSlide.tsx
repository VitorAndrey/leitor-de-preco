import { ProductType } from 'src/types'

type PromotionSlideProps = {
  product: ProductType
}

export function PromotionSlide({ product }: PromotionSlideProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h3>{product.name}</h3>
      <img src={product.image} className="h-3/5 rounded-3xl" />
      <span>{product.price}</span>
    </div>
  )
}
