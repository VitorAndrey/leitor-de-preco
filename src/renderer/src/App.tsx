import { useContext } from 'react'
import { Carrousel } from './components/Carrousel'
import { PriceReaderReaderContext } from './contexts/PriceReaderContext'
import { Header } from './components/Header'

export default function App() {
  const { product } = useContext(PriceReaderReaderContext)

  return (
    <main>
      <Header />
      {product ? <p>{JSON.stringify(product)}</p> : <Carrousel />}
    </main>
  )
}
