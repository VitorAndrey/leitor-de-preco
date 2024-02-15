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
      image: 'https://github.com/f.png'
    },
    {
      id: '2',
      name: 'Feijao',
      price: 3.99,
      image: 'https://github.com/d.png'
    },
    {
      id: '3',
      name: 'Batata',
      price: 3.99,
      image: 'https://github.com/e.png'
    }
  ]

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{
        delay: 8000,
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
