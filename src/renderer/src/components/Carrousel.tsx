import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import { CarrouselItem } from './CarrouselItem'

export function Carrousel() {
  const promotionImagePaths: string[] = [
    'https://abipla.org.br/wp-content/uploads/2020/08/ype-promocao-scaled-770x510.jpg',
    'https://pegapromocao.com.br/wp-content/uploads/2021/01/promocao-iogurtes-nestle-saudavel-como-o-verao.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/32/br-consumables/2021/Super/Merchandising/929_amazonsuper_gridtile_op01_750x447.jpg'
  ]

  if (promotionImagePaths.length < 1) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h3>Nenhuma promoção encontrada!</h3>
      </div>
    )
  }

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false
      }}
      loop
    >
      {promotionImagePaths.map((imagePath) => (
        <SwiperSlide key={imagePath}>
          <CarrouselItem imagePath={imagePath} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
