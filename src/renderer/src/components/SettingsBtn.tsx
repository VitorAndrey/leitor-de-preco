import josildoLogo from '../assets/josildo.png'

type Props = {
  onToggleSettings: () => void
}

export function SettingsBtn({ onToggleSettings }: Props) {
  return (
    <button
      onClick={onToggleSettings}
      className="absolute top-3 left-3 z-50 cursor-pointer bg-white rounded-full p-2"
    >
      <img src={josildoLogo} className="w-12 rounded-full" />
    </button>
  )
}
