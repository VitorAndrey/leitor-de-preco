import { ProductType } from 'src/types'

type PromotionSlideProps = {
  product: ProductType
}

export function PromotionSlide({ product }: PromotionSlideProps) {
  return <div>{product.name}</div>
}
