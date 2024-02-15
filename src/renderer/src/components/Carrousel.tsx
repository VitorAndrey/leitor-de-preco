import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import { PromotionSlide } from './PromotionSlide'
import { ProductType } from 'src/types'

export function Carrousel() {
  const promotions: ProductType[] = [
    {
      id: '1',
      name: 'Macarrao',
      price: 3.99,
      image: 'https://github.com/a.png'
    }
  ]

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      loop
    >
      {promotions.map((product) => (
        <SwiperSlide key={product.id}>
          <PromotionSlide product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
