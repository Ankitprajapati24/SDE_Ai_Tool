import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem('se_auth')
    setIsLoggedIn(!!auth)
    const storedUsername = localStorage.getItem('design_username') || 'Developer'
    setUsername(storedUsername)
  }, [location.pathname]) // re-check on route changes

  const handleSignOut = () => {
    localStorage.removeItem('se_auth')
    localStorage.removeItem('design_username')
    setIsLoggedIn(false)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path ? 'active-link' : ''

  return (
    <nav className="navbar">
      <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => navigate(isLoggedIn ? '/home' : '/')}>
        <i className="fas fa-brain"></i>
        <span>DesignAI</span>
      </div>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {!isLoggedIn ? (
          <>
            <li><Link to="/" className={isActive('/')} onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/features" className={isActive('/features')} onClick={() => setOpen(false)}>Features</Link></li>
            <li><Link to="/pricing" className={isActive('/pricing')} onClick={() => setOpen(false)}>Pricing</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/home" className={isActive('/home')} onClick={() => setOpen(false)}>Workspace</Link></li>
            <li><Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setOpen(false)}>Analytics</Link></li>
            <li><Link to="/features" className={isActive('/features')} onClick={() => setOpen(false)}>Features</Link></li>
            <li><Link to="/pricing" className={isActive('/pricing')} onClick={() => setOpen(false)}>Pricing</Link></li>
          </>
        )}
      </ul>
      
      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="navbar-greeting" style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>Hi, {username}</span>
          <div className="author-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => navigate('/home')}>
            <i className="fas fa-user-astronaut"></i>
          </div>
          <button className="nav-cta" style={{ background: '#1c1c24', border: '1px solid #2a2a35' }} onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button className="nav-cta" onClick={() => { navigate('/login'); setOpen(false) }}>Sign In</button>
      )}

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  )
}

