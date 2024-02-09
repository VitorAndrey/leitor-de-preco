import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name'),
  price: real('price')
})

export type ProductType = typeof products.$inferSelect
export type InsertProductType = typeof products.$inferInsert
