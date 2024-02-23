import { createHashRouter, RouterProvider, Link } from 'react-router-dom'
import { CreateProduct } from './CreateProduct'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <h1>Configuracoes</h1>
        <Link to="create-product">Criar Produto</Link>
        <Link to="create-product">Escolher Imagens de Promoção</Link>
      </div>
    )
  },
  {
    path: 'create-product',
    element: (
      <div>
        <CreateProduct />

        <Link to="/" className="absolute top-3 right-3">
          Voltar
        </Link>
      </div>
    )
  }
])

export function Settings() {
  return <RouterProvider router={router} />
}
