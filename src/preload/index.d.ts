import { ElectronAPI } from '@electron-toolkit/preload'

type ProductType = {
  id: string
  name: string
  price: number
}

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
}
