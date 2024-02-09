import { FormEvent, useRef, useState } from 'react'

type ProductType = {
  id: string
  name: string
  price: number
}

let currentAudio: HTMLAudioElement | null = null

export default function App() {
  const [productIdInput, setProductIdInput] = useState('')
  const [productNameInput, setProductNameInput] = useState('')
  const [productPriceInput, setProductPriceInput] = useState('')

  const [searchIdInput, setSearchIdInput] = useState('')

  const [product, setProduct] = useState<ProductType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    if (!productIdInput || !productNameInput || !productPriceInput) return

    const newProduct = {
      id: productIdInput,
      name: productNameInput,
      price: parseFloat(productPriceInput)
    } as ProductType

    try {
      await window.api.products.create(newProduct)

      setProductIdInput('')
      setProductNameInput('')
      setProductPriceInput('')
    } catch (error) {
      window.api.log(JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="flex items-center justify-center h-screen w-screen gap-8 text-center">
      <form
        id="create-product"
        ref={formRef}
        onSubmit={handleCreateProduct}
        className="flex flex-col gap-2 border w-80 h-64 p-4 rounded-lg"
      >
        <h3>Criar Produto</h3>

        <div className="flex-1 flex flex-col justify-evenly">
          <input
            required
            placeholder="Nome do produto"
            className="border px-4 py-2 rounded-lg"
            type="text"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
          />
          <input
            required
            placeholder="Preço do produto"
            className="border px-4 py-2 rounded-lg"
            type="number"
            step={0.01}
            min={0}
            value={productPriceInput}
            onChange={(e) => setProductPriceInput(e.target.value)}
          />
          <input
            required
            placeholder="Código do produto"
            className="border px-4 py-2 rounded-lg"
            type="text"
            value={productIdInput}
            onChange={(e) => setProductIdInput(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="border px-4 py-2 rounded-lg" type="submit">
          {isLoading ? <span className="animate-pulse">Carregando</span> : <span>Criar</span>}
        </button>
      </form>

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
          <p className="truncate">{`${product?.name} - R$${product?.price}` || '...'}</p>
        </div>

        <button disabled={isLoading} className="border px-4 py-2 rounded-lg" type="submit">
          {isLoading ? <span className="animate-pulse">Carregando</span> : <span>Buscar</span>}
        </button>
      </form>
    </div>
  )
}
