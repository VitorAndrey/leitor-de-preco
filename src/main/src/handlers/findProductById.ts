import { eq } from 'drizzle-orm'
import { db } from '../../../database/index'
import { products } from '../../../database/schemas/product'

export async function findProductById(_, id) {
  const data = db.select().from(products).where(eq(products.id, id)).get()

  return data
}
