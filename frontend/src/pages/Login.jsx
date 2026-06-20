import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleGoogleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('se_auth', 'true')
      localStorage.setItem('design_username', 'GoogleUser')
      navigate('/home')
    }, 1000)
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.username.trim() || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('se_auth', 'true')
      localStorage.setItem('design_username', form.username.trim())
      navigate('/home')
    }, 1400)
  }

  return (
    <div className="login-wrapper">
      <div className="login-page">
        {/* Left Panel */}
        <div className="login-left">
          <div className="login-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <i className="fas fa-brain"></i>
            <span>DesignAI</span>
          </div>
          <div className="login-left-content">
            <h1>Welcome to <span>DesignAI</span></h1>
            <div className="login-perks">
              <div className="perk-item">
                <div className="perk-icon-wrap">🎨</div>
                <div className="perk-text">AI UI Wireframes & Layout Designs</div>
              </div>
              <div className="perk-item">
                <div className="perk-icon-wrap">⚡</div>
                <div className="perk-text">Layered System Architecture Specs</div>
              </div>
              <div className="perk-item">
                <div className="perk-icon-wrap">🧠</div>
                <div className="perk-text">Interactive UML & DFD Blueprints</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-right">
          <div className="login-card">
            <div className="login-alert-box">
              You're signing in to DesignAI Software Design Workspace
            </div>

            <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
              {loading ? (
                <div className="btn-spinner" style={{ width: '18px', height: '18px', borderTopColor: '#f97316' }}></div>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div className="login-divider">OR</div>

            {error && (
              <div className="login-error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handle}
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handle}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="continue-btn" disabled={loading}>
                {loading ? <div className="btn-spinner"></div> : 'Continue'}
              </button>
            </form>

            <p className="login-fineprint">
              By signing up, you agree to the Terms of Use, Privacy Policy and other platform agreements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

