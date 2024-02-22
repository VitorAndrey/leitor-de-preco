import { usePriceReader } from '@renderer/hooks/usePriceReader'
import { useEffect, useState } from 'react'
import { Product } from './ProductPrice'
import { Carrousel } from './Carrousel'

export function Home() {
  const [productId, setProductId] = useState<string>('')

  const { product, handleFindProductById } = usePriceReader()

  useEffect(() => {
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

  return product ? <Product product={product} /> : <Carrousel />
}
