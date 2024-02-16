import { useState, createContext, ReactNode } from 'react'
import { ProductType } from 'src/types'

type PriceReaderContextProps = {
  product: ProductType | null
  isLoading: boolean
  handleFindProductById: (id: string) => Promise<void>
}

export const PriceReaderReaderContext = createContext({} as PriceReaderContextProps)

let currentAudio: HTMLAudioElement | null = null

export function PriceReaderProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ProductType | null>({
    id: '1',
    image: 'https://github.com/Alex.png',
    name: 'Azulin Limpeza Profunda',
    price: 5.99
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleFindProductById(id: string) {
    setIsLoading(true)

    try {
      const foundProduct = await window.api.products.findById(id)

      if (!foundProduct) {
        handleSpeak('Produto não encontrado.')
        setProduct(null)
        return
      }

      setProduct(foundProduct)
      setIsLoading(false)
      handleSpeak(formatProductText(foundProduct))
    } catch (error) {
      window.api.log(JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSpeak(text: string): Promise<void> {
    const { audioContent } = await window.api.speak(text)

    if (currentAudio) {
      return
    }

    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`)
    currentAudio = audio

    audio.onended = () => {
      setTimeout(() => {
        setProduct(null)
      }, 5000)
      currentAudio = null
    }

    audio.play()
  }

  function formatProductText(product) {
    const splitedPrice = String(product.price).split('.')
    const fullPrice = splitedPrice[0]
    const cents = splitedPrice[1]

    if (cents) {
      return `Preço do produto. ${fullPrice} reais e ${cents} centavos.`
    } else {
      return `Preço do produto. ${fullPrice} reais.`
    }
  }

  return (
    <PriceReaderReaderContext.Provider value={{ product, isLoading, handleFindProductById }}>
      {children}
    </PriceReaderReaderContext.Provider>
  )
}
