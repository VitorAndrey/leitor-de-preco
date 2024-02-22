import josildoLogo from '../assets/images/josildo.png'

type Props = {
  onToggleSettings: () => void
}

export function SettingsBtn({ onToggleSettings }: Props) {
  return (
    <button onClick={onToggleSettings} className="absolute top-3 left-3">
      <img src={josildoLogo} className="w-14 rounded-full bg-white border-black border-2" />
    </button>
  )
}
