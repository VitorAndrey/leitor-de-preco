import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import { dbPath } from './db-path'

import * as productSchema from './schemas/product'

export const betterSqlite = new Database(dbPath)
const db = drizzle(betterSqlite, { schema: { ...productSchema } })

migrate(db, { migrationsFolder: 'src/database/migrations' })

export { db }
