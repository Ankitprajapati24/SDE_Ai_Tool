import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const STATS = [
  { icon: 'fa-wand-magic-sparkles', cls: 'blue-icon', label: 'Designs Generated', value: 24 },
  { icon: 'fa-layer-group', cls: 'purple-icon', label: 'UI Layouts', value: 18 },
  { icon: 'fa-code', cls: 'green-icon', label: 'UML Class Diagrams', value: 12 },
  { icon: 'fa-shuffle', cls: 'pink-icon', label: 'DFD Data Flows', value: 8 },
]

const HISTORY = [
  { dot: 'blue-dot', text: 'E-Commerce Platform blueprint generated', time: '2 hours ago' },
  { dot: 'purple-dot', text: 'Task Manager Dashboard design completed', time: 'Yesterday' },
  { dot: 'green-dot', text: 'Realtime Chat Mobile App specs exported', time: '2 days ago' },
  { dot: 'pink-dot', text: 'Social Media REST API schema saved', time: '3 days ago' },
]

const QUEUE = [
  { title: '🖥️ Web Application Blueprint', payout: 'Free Tier', limit: 'Wireframe & architecture layers', difficulty: 'Easy' },
  { title: '📱 Mobile Chat App Spec', payout: 'Pro Tier', limit: 'UML class and DFD data flows', difficulty: 'Medium' },
  { title: '🛒 E-Commerce shopping platform', payout: 'Pro Tier', limit: 'Stripe gateway & database models', difficulty: 'Hard' },
  { title: '⚙️ Scalable Microservices API', payout: 'Premium Tier', limit: 'Backend gateways & logging workers', difficulty: 'Expert' },
]

function DashboardSkeleton() {
  return (
    <div className="skeleton-page">
      <div className="sk-header">
        <div className="sk-block w40 h32"></div>
        <div className="sk-block w20 h32"></div>
      </div>
      <div className="sk-stats-row">
        {[1,2,3,4].map(i => (
          <div className="sk-stat-card" key={i}>
            <div className="sk-block w60 h16 mb8"></div>
            <div className="sk-block w40 h28"></div>
          </div>
        ))}
      </div>
      <div className="sk-two-col">
        <div className="sk-card sk-tall">
          <div className="sk-block w50 h20 mb16"></div>
          <div className="sk-block w100 h180"></div>
        </div>
        <div className="sk-card">
          <div className="sk-block w50 h20 mb16"></div>
          <div className="sk-list">
            {[1,2,3,4].map(i => (
              <div className="sk-list-item" key={i}>
                <div className="sk-avatar"></div>
                <div className="sk-lines">
                  <div className="sk-block w70 h14 mb6"></div>
                  <div className="sk-block w50 h12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="page-wrapper">
      <aside className="sidebar">
        <div className="sidebar-section">
          <p className="sidebar-label">Main</p>
          <Link to="/dashboard" className="sidebar-item active"><i className="fas fa-th-large"></i> Overview</Link>
          <Link to="/#generate" className="sidebar-item"><i className="fas fa-wand-magic-sparkles"></i> Generate</Link>
          <a href="#" className="sidebar-item"><i className="fas fa-clock-rotate-left"></i> History</a>
        </div>
        <div className="sidebar-section">
          <p className="sidebar-label">Explore</p>
          <Link to="/features" className="sidebar-item"><i className="fas fa-layer-group"></i> Features</Link>
          <Link to="/pricing" className="sidebar-item"><i className="fas fa-tag"></i> Pricing</Link>
        </div>
      </aside>

      <main className="main-content">
        {!loaded ? <DashboardSkeleton /> : (
          <div className="real-content">
            <div className="content-header">
              <div>
                <h1>Analytics Dashboard 👋</h1>
                <p className="text-muted">Here's the design metrics and generations progress today.</p>
              </div>
              <button className="btn-primary" onClick={() => navigate('/#generate')}>
                <i className="fas fa-plus"></i> New Design
              </button>
            </div>

            <div className="stats-row">
              {STATS.map(s => (
                <div className="stat-card" key={s.label}>
                  <div className={`stat-icon ${s.cls}`}><i className={`fas ${s.icon}`}></i></div>
                  <div>
                    <p className="stat-label">{s.label}</p>
                    <h2>{s.value}</h2>
                  </div>
                </div>
              ))}
            </div>

            <div className="dash-two-col">
              {/* Task queue */}
              <div className="dash-card">
                <h3>Available Generator Templates</h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.2rem' }}>Acquire ready-made specifications to quick-start blueprints.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {QUEUE.map((q, idx) => (
                    <div key={idx} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white', marginBottom: '0.3rem' }}>{q.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginRight: '0.8rem' }}><i className="fas fa-tag"></i> {q.limit}</span>
                        <span style={{ fontSize: '0.72rem', color: q.difficulty === 'Expert' ? '#f43f5e' : q.difficulty === 'Hard' ? '#f97316' : '#10b981', background: '#1a1a26', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>{q.difficulty}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)' }}>{q.payout}</span>
                        <button className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', borderRadius: '6px', boxShadow: 'none' }} onClick={() => navigate('/#generate')}>Use</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* History list */}
              <div className="dash-card">
                <h3>Recent System Blueprints</h3>
                <div className="activity-list" style={{ marginTop: '0.5rem' }}>
                  {HISTORY.map((a, idx) => (
                    <div className="activity-item" key={idx}>
                      <div className={`activity-dot ${a.dot}`}></div>
                      <div>
                        <p>{a.text}</p>
                        <span>{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
