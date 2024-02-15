import { useContext } from 'react'
import { Carrousel } from './components/Carrousel'
import { PriceReaderReaderContext } from './contexts/PriceReaderContext'

export default function App() {
  const { product } = useContext(PriceReaderReaderContext)

  return <main>{product ? <p>{JSON.stringify(product)}</p> : <Carrousel />}</main>
}
