import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import HomeAuthenticated from './pages/HomeAuthenticated'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()
  const hideNavbar = ['/login'].includes(location.pathname)
  const hideFooter = ['/login', '/home'].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeAuthenticated />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

