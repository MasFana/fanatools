import { Link } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 justify-between">
      <nav className="flex gap-2 text-xl flex-row">
        
          <Link to="/" className='[&.active]:font-bold'>Home</Link>
          <Link to="/about" className='[&.active]:font-bold'>About</Link>
          <Link to='/posts'>Post</Link>
      </nav>
      <div>
        <ModeToggle/>
      </div>
    </header>
  )
}
