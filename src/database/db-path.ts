import { app } from 'electron'
import * as fs from 'fs'
import { join } from 'path'

const userDataPath = app.getPath('userData')
const appDataPath = join(userDataPath, 'Database')

if (!fs.existsSync(appDataPath)) {
  fs.mkdirSync(appDataPath)
}

export const dbPath = join(appDataPath, 'sqlite.db')
