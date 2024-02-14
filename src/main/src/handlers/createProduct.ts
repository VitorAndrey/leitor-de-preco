import { db } from '../../../database/index'
import { products } from '../../../database/schemas/product'

export async function createProduct(_, product) {
  const data = db.insert(products).values(product)

  return data
}
