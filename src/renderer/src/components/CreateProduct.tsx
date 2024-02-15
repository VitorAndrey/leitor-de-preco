import { FormEvent, useRef, useState } from 'react'
import { ProductType } from 'src/types'

export function CreateProduct() {
  const [productIdInput, setProductIdInput] = useState('')
  const [productNameInput, setProductNameInput] = useState('')
  const [productPriceInput, setProductPriceInput] = useState('')

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

  return (
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
  )
}
