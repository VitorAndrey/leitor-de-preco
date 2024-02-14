import { findProductById, speak, createProduct } from './handlers/@exports'

export function registerIpcEvents(ipcMain) {
  ipcMain.handle('speak', speak)

  ipcMain.handle('find-product-by-id', findProductById)

  ipcMain.handle('create-product', createProduct)

  ipcMain.on('log', async (_, text) => {
    console.log(text)
  })
}
