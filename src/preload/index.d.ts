import { ElectronAPI } from '@electron-toolkit/preload'
import { ProductType } from 'src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

interface Api {
  log: (text: string) => ReturnType<typeof ipcRenderer.send>
  speak: (text: string) => ReturnType<typeof ipcRenderer.invoke>
  products: {
    findById: (id: string) => ReturnType<typeof ipcRenderer.invoke>
    create: (product: ProductType) => ReturnType<typeof ipcRenderer.invoke>
  }

  getEnv: (variable: string) => ReturnType<typeof ipcRenderer.invoke>
}
