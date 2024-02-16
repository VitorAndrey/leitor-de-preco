import { useContext, useEffect, useState } from 'react'
import { Carrousel } from './components/Carrousel'
import { PriceReaderReaderContext } from './contexts/PriceReaderContext'
import { Header } from './components/Header'
import { Product } from './components/Product'
import { CreateProduct } from './components/CreateProduct'

export default function App() {
  const { product, handleFindProductById } = useContext(PriceReaderReaderContext)
  const [productId, setProductId] = useState<string>('')

  const createProductMode = false

  useEffect(() => {
    if (createProductMode) return

    const handleKeyPress = (event) => {
      const alphanumericRegex = /^[a-zA-Z0-9]$/
      if (event.key === 'Enter') {
        handleFindProductById(productId)
        setProductId('')
      } else if (alphanumericRegex.test(event.key)) {
        setProductId((prev) => (prev += event.key))
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [productId, handleFindProductById])

  if (createProductMode) return <CreateProduct />

  return (
    <main>
      <Header />
      <p className="absolute top-2 right-2">{productId}</p>
      {product ? <Product product={product} /> : <Carrousel />}
    </main>
  )
}
