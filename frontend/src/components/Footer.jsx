import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <i className="fas fa-brain"></i>
          <span>DesignAI</span>
        </div>
        <p>AI-Powered Software Design Blueprints & System Architecture Generator</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/#generate">Generate</Link>
          <Link to="/#about">About</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Built with <i className="fas fa-heart"></i> as a Minor Project &copy; 2026</p>
      </div>
    </footer>
  )
}
