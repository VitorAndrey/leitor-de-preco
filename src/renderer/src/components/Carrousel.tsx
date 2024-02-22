import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import { CarrouselItem } from './CarrouselItem'

export function Carrousel() {
  const promotionImagePaths: string[] = ['../assets/azulim.png', '../assets/josildo.png']

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
