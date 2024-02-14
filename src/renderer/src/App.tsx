import { FormEvent, useState } from 'react'

export type ProductType = {
  id: string
  name: string
  price: number
}

let currentAudio: HTMLAudioElement | null = null

export default function App() {
  const [searchIdInput, setSearchIdInput] = useState('')
  const [product, setProduct] = useState<ProductType | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleFindProductById(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const foundProduct = await window.api.products.findById(searchIdInput)

      setSearchIdInput('')
      setProduct(foundProduct)
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
      currentAudio.pause()
      currentAudio = null
    }

    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`)
    currentAudio = audio
    audio.play()
  }

  function formatProductText(product) {
    const productName = product.name
    const splitedPrice = String(product.price).split('.')
    const fullPrice = splitedPrice[0]
    const cents = splitedPrice[1]

    if (cents) {
      return `${productName} ${fullPrice} reais e ${cents} centavos`
    } else {
      return `${productName} ${fullPrice} reais`
    }
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen gap-8 text-center">
      <form
        onSubmit={handleFindProductById}
        id="search-product"
        className="flex flex-col gap-2 border w-80 h-64 p-4 rounded-lg"
      >
        <input
          required
          className="border px-4 py-2 rounded-lg"
          type="text"
          value={searchIdInput}
          onChange={(e) => setSearchIdInput(e.target.value)}
        />

        <div className="flex flex-1 items-center justify-center">
          <p className="truncate">
            {product?.name && product.price ? `${product?.name} - R$${product?.price}` : '...'}
          </p>
        </div>

        <button disabled={isLoading} className="border px-4 py-2 rounded-lg" type="submit">
          {isLoading ? <span className="animate-pulse">Carregando</span> : <span>Buscar</span>}
        </button>
      </form>
    </main>
  )
}
