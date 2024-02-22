type Props = {
  imagePath: string
}

export function CarrouselItem({ imagePath }: Props) {
  return <img className="w-screen h-screen" src={imagePath} />
}
