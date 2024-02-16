import josildoLogo from '../assets/images/josildo.png'

export function Header() {
  return (
    <header className="absolute top-3 left-3">
      <img src={josildoLogo} className="w-14 rounded-full" />
    </header>
  )
}
