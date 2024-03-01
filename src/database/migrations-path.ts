import { app } from 'electron'
import { join } from 'path'

const userDataPath = app.getPath('userData')
export const migrationsPath = join(userDataPath, 'Migrations')
