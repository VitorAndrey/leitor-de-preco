import { useState } from 'react'
import { SettingsBtn } from './components/SettingsBtn'
import { Settings } from './components/Settings'
import { Home } from './components/Home'

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  function handleToggleSettings() {
    setIsSettingsOpen((prev) => !prev)
  }

  return (
    <>
      <SettingsBtn onToggleSettings={handleToggleSettings} />

      {isSettingsOpen ? <Settings /> : <Home />}
    </>
  )
}
