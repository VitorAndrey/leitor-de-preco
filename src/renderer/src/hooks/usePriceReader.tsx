import { useState } from 'react'

export function usePriceReader() {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let currentAudio: HTMLAudioElement | null = null

  async function handleFindProductById(id) {
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

  async function handleSpeak(text: string) {
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

  return {
    product,
    isLoading,
    handleFindProductById
  }
}
