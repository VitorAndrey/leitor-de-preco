import type { Config } from 'drizzle-kit'

export default {
  schema: './src/database/schemas/!(exports).ts',
  out: './src/database/migrations',
  driver: 'better-sqlite'
} satisfies Config
