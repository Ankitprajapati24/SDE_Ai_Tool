import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FEATURES } from './Features'

// Helper to generate dynamic UI layouts based on requirements
function generateUILayout(name, type, requirements) {
  const req = requirements.toLowerCase()
  return [
    {
      title: '🖥️ Header / Navigation',
      items: ['Logo (DesignAI brain)', 'Nav Links (Home, Dashboard, Settings)', 'Search Bar', 'User Auth Profile Avatar']
    },
    {
      title: '🏠 Main Dashboard Workspace',
      items: [
        `${name || 'Workspace'} Main Header`,
        req.includes('task') || req.includes('board') ? 'Kanban Task Board Grid' : 'Main Content / Entity Overview Feed',
        req.includes('chart') || req.includes('analytic') ? 'Analytics Charts & Metrics Widget' : 'Quick Statistics Cards',
        'Recent Activity Stream'
      ]
    },
    {
      title: '📋 Primary Interaction Screen',
      items: [
        req.includes('auth') || req.includes('login') ? 'Authentication Sign In/Sign Up Box' : 'Dynamic Item Detail View Card',
        req.includes('form') || req.includes('create') ? 'Asset Creation Form with inputs' : 'Search & Filters Panel',
        req.includes('payment') || req.includes('cart') ? 'Checkout / Payment Form' : 'General Configuration Settings'
      ]
    },
    {
      title: '🔻 Footer',
      items: ['Secondary Links', 'Social Icons', 'Copyright notices']
    }
  ]
}

// Helper to generate dynamic architectures based on requirements
function generateArchitecture(name, type, requirements) {
  const req = requirements.toLowerCase()
  return [
    {
      title: 'Frontend Client Layer',
      desc: `Visual interface for the ${name || 'Application'}`,
      tags: [type === 'mobile' ? 'React Native / Flutter' : 'React.js / Next.js', 'CSS Variables / Tailwind', 'Client State Management', 'API Client (Axios)']
    },
    {
      title: 'API Gateway / Backend Layer',
      desc: 'Business logic controller and endpoints routing',
      tags: ['Node.js / Express', 'RESTful API controller', req.includes('auth') ? 'JWT Token Auth' : 'Session Validation', 'Input Sanitizer Middlewares']
    },
    {
      title: 'Database & Caching Layer',
      desc: 'Primary data stores and cache layers',
      tags: [req.includes('realtime') || req.includes('chat') ? 'MongoDB / Firebase' : 'PostgreSQL database', 'Prisma ORM migrations', 'Redis session cache']
    },
    {
      title: 'Integrations & External Workers',
      desc: 'Third-party integrations and background tasks',
      tags: [
        req.includes('email') || req.includes('notif') ? 'SES Email Transport' : 'Notification Dispatcher',
        req.includes('payment') ? 'Stripe Gateway' : 'S3 Asset Store',
        'Sentry Logger', 'GitHub Actions CI/CD'
      ]
    }
  ]
}

// Helper to generate dynamic UML class diagrams based on requirements
function generateUML(requirements) {
  const req = requirements.toLowerCase()
  if (req.includes('task') || req.includes('project') || req.includes('todo')) {
    return [
      {
        name: 'Project',
        attributes: ['+ id: int', '+ name: string', '+ createdBy: int', '+ status: string'],
        methods: ['+ addMember(userId)', '+ getTasks(): List', '+ archive()']
      },
      {
        name: 'Task',
        attributes: ['+ id: int', '+ projectId: int', '+ title: string', '+ priority: enum', '+ assigneeId: int'],
        methods: ['+ assign(userId)', '+ updateStatus(status)', '+ getComments(): List']
      },
      {
        name: 'User',
        attributes: ['+ id: int', '+ name: string', '+ email: string', '+ role: string'],
        methods: ['+ login()', '+ getProjects(): List']
      }
    ]
  } else if (req.includes('auth') || req.includes('user') || req.includes('login')) {
    return [
      {
        name: 'User',
        attributes: ['+ id: int', '+ email: string', '+ passwordHash: string', '+ isVerified: bool'],
        methods: ['+ register()', '+ verifyEmail()', '+ requestPasswordReset()']
      },
      {
        name: 'Session',
        attributes: ['+ sessionId: string', '+ userId: int', '+ ipAddress: string', '+ expiresAt: DateTime'],
        methods: ['+ create()', '+ invalidate()', '+ validateToken()']
      },
      {
        name: 'Profile',
        attributes: ['+ id: int', '+ userId: int', '+ avatarUrl: string', '+ bio: string'],
        methods: ['+ updateProfile()', '+ getDetails()']
      }
    ]
  } else {
    // E-Commerce / Generic fallback
    return [
      {
        name: 'Product',
        attributes: ['+ id: int', '+ name: string', '+ price: decimal', '+ stockQty: int'],
        methods: ['+ checkAvailability(): bool', '+ deductStock(qty)', '+ updatePrice(newPrice)']
      },
      {
        name: 'Cart',
        attributes: ['+ id: int', '+ userId: int', '+ totalAmount: decimal', '+ items: List'],
        methods: ['+ addItem(productId, qty)', '+ removeItem(productId)', '+ checkout()']
      },
      {
        name: 'Order',
        attributes: ['+ id: int', '+ userId: int', '+ orderDate: Date', '+ paymentStatus: enum'],
        methods: ['+ processPayment()', '+ shipItems()', '+ cancelOrder()']
      }
    ]
  }
}

// Helper to generate dynamic Data Flow Diagrams (DFDs) based on requirements
function generateDFD(requirements) {
  const req = requirements.toLowerCase()
  const flows = [
    { entity: 'User Client', direction: 'down', process: '1.0 Capture Input', datastore: 'Temp Cache' }
  ]
  if (req.includes('payment')) {
    flows.push({ entity: 'Process Request', direction: 'right', process: '2.0 Charge Gateway', datastore: 'Transactions DB' })
  } else if (req.includes('task') || req.includes('project')) {
    flows.push({ entity: 'User Client', direction: 'right', process: '2.0 Validate Task Data', datastore: 'Tasks Data Store' })
  } else {
    flows.push({ entity: 'User Client', direction: 'right', process: '2.0 Process Checkout', datastore: 'Inventory Database' })
  }
  return flows
}

// Helper to generate suggestions
function generateSuggestions(requirements) {
  const req = requirements.toLowerCase()
  return [
    { icon: '🎨', title: 'Design System Guidelines', text: 'Define consistent padding variables, typography headings scale, and color system. We recommend Tailwind CSS or shadcn/ui.' },
    { icon: '⚡', title: 'Performance Audits', text: 'Implement image lazy-loading, code-splitting routes, and dynamic bundle loading to maintain page render speeds under 1.5 seconds.' },
    { icon: req.includes('auth') ? '🔐' : '♿', title: req.includes('auth') ? 'Security Credentials' : 'Accessibility (WCAG)', text: req.includes('auth') ? 'Restrict passwords to min 12 chars, lock database parameters, hash sessions via JWT, and implement rate limits.' : 'Follow WCAG rules: ensure contrast parameters, semantic tags, and full keyboard-accessible controls.' }
  ]
}

export default function Home() {
  const navigate = useNavigate()
  const generateRef = useRef(null)

  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('se_auth')
    setIsLoggedIn(!!auth)
    const storedUsername = localStorage.getItem('design_username') || 'Developer'
    setUsername(storedUsername)
  }, [])

  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [requirements, setRequirements] = useState('')
  
  const [genUI, setGenUI] = useState(true)
  const [genArch, setGenArch] = useState(true)
  const [genUml, setGenUml] = useState(true)
  const [genDfd, setGenDfd] = useState(true)
  const [genSugg, setGenSugg] = useState(true)

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('ui')
  const [copied, setCopied] = useState(false)

  const scrollToGenerate = () => generateRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleGenerate = () => {
    if (!requirements.trim()) { alert('Please enter your project requirements.'); return }
    setLoading(true)
    setResults(null)
    setTimeout(() => {
      setResults({
        ui: generateUILayout(projectName, projectType, requirements),
        arch: generateArchitecture(projectName, projectType, requirements),
        uml: generateUML(requirements),
        dfd: generateDFD(requirements),
        suggestions: generateSuggestions(requirements)
      })
      
      // Select first generated tab
      if (genUI) setActiveTab('ui')
      else if (genArch) setActiveTab('arch')
      else if (genUml) setActiveTab('uml')
      else if (genDfd) setActiveTab('dfd')
      else setActiveTab('suggestions')
      
      setLoading(false)
    }, 1500)
  }

  const handleCopy = (tab) => {
    const el = document.getElementById(`content-${tab}`)
    if (el) {
      navigator.clipboard.writeText(el.innerText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>
        <div className="hero-content">
          <div className="badge"><i className="fas fa-sparkles"></i> {isLoggedIn ? `Hi, ${username}! Welcome back to DesignAI` : 'Introducing DesignAI'}</div>
          <h1>Turn Ideas Into <span className="gradient-text">Software Designs</span> Instantly</h1>
          <p>Describe your project in plain text and let AI generate wireframe layout designs, layered system architectures, interactive UML class diagrams, and DFD data flows in seconds.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToGenerate}><i className="fas fa-wand-magic-sparkles"></i> Start Designing</button>
            <button className="btn-secondary" onClick={() => navigate('/features')}><i className="fas fa-play-circle"></i> See Features</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span>10x</span><p>Faster Prototyping</p></div>
            <div className="stat-divider"></div>
            <div className="stat"><span>UML & DFD</span><p>Supported</p></div>
            <div className="stat-divider"></div>
            <div className="stat"><span>Free</span><p>To Use</p></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="mockup-card" style={{ width: '100%', maxWidth: '460px' }}>
            <div className="mockup-header">
              <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
              <span className="mockup-title">DesignAI — UML Diagram Renderer</span>
            </div>
            <div className="mockup-body" style={{ padding: '1.2rem', backgroundColor: '#09090b' }}>
              <div className="uml-class-card" style={{ width: '100%', borderStyle: 'dashed' }}>
                <div className="uml-class-header">
                  <i className="fas fa-cubes"></i> Class User
                </div>
                <div className="uml-class-section">
                  <div style={{ color: '#818cf8' }}>+ id: int</div>
                  <div style={{ color: '#818cf8' }}>+ email: string</div>
                  <div style={{ color: '#818cf8' }}>+ passwordHash: string</div>
                </div>
                <div className="uml-class-section">
                  <div style={{ color: '#f97316' }}>+ login(): bool</div>
                  <div style={{ color: '#f97316' }}>+ register(): void</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features" id="features">
        <div className="section-header">
          <div className="badge">Features</div>
          <h2>Everything You Need to <span className="gradient-text">Design Faster</span></h2>
          <p>From plaintext requirements to complete class architectures and data flows in one click.</p>
        </div>
        <div className="features-grid">
          {FEATURES.slice(0, 6).map(f => (
            <div className="feature-card" key={f.title}>
              <div className={`feature-icon ${f.cls}`}><i className={`fas ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="section-header">
          <div className="badge">Process</div>
          <h2>How It <span className="gradient-text">Works</span></h2>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Write Concept</h3>
              <p>Describe your software, database fields, or platform operations in plain text.</p>
            </div>
          </div>
          <div className="step-arrow"><i className="fas fa-arrow-right"></i></div>
          <div className="step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>AI Generates Diagrams</h3>
              <p>DesignAI processes variables, creates class mappings, and structures DFD entities.</p>
            </div>
          </div>
          <div className="step-arrow"><i className="fas fa-arrow-right"></i></div>
          <div className="step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Export and Sync</h3>
              <p>Review UML models, UI structures, and push designs directly to your codebase on GitHub.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="generate-section" id="generate" ref={generateRef}>
        <div className="section-header">
          <div className="badge">Generator</div>
          <h2>Generate Your <span className="gradient-text">Software Design</span></h2>
          <p>Provide your app details below to generate wireframes, architectures, and diagrams.</p>
        </div>

        <div className="generate-container">
          <div className="input-panel">
            <div className="input-group">
              <label>Project Name</label>
              <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="e.g. Task Manager, E-Commerce App..." />
            </div>

            <div className="input-group">
              <label>Project Type</label>
              <select value={projectType} onChange={e => setProjectType(e.target.value)}>
                <option value="">Select project type...</option>
                <option value="web">Web Application</option>
                <option value="mobile">Mobile Application</option>
                <option value="desktop">Desktop Application</option>
                <option value="api">API / Backend Service</option>
              </select>
            </div>

            <div className="input-group">
              <label>Project Requirements (Describe in detail)</label>
              <textarea rows="6" value={requirements} onChange={e => setRequirements(e.target.value.slice(0, 1000))} placeholder="Describe user actions, authentication requirements, database tables, or payment setups..."></textarea>
              <div className="char-count"><span>{requirements.length}</span> / 1000</div>
            </div>

            <div className="input-group">
              <label>Generate Diagrams</label>
              <div className="checkbox-group">
                <label className="checkbox-item"><input type="checkbox" checked={genUI} onChange={e => setGenUI(e.target.checked)} /><span className="checkmark"></span><i className="fas fa-layer-group"></i> UI Wireframe Structure</label>
                <label className="checkbox-item"><input type="checkbox" checked={genArch} onChange={e => setGenArch(e.target.checked)} /><span className="checkmark"></span><i className="fas fa-sitemap"></i> System Architecture</label>
                <label className="checkbox-item"><input type="checkbox" checked={genUml} onChange={e => setGenUml(e.target.checked)} /><span className="checkmark"></span><i className="fas fa-code"></i> UML Class Diagrams</label>
                <label className="checkbox-item"><input type="checkbox" checked={genDfd} onChange={e => setGenDfd(e.target.checked)} /><span className="checkmark"></span><i className="fas fa-shuffle"></i> Data Flow Diagrams (DFD)</label>
                <label className="checkbox-item"><input type="checkbox" checked={genSugg} onChange={e => setGenSugg(e.target.checked)} /><span className="checkmark"></span><i className="fas fa-lightbulb"></i> Design Recommendations</label>
              </div>
            </div>

            <button className="btn-generate" onClick={handleGenerate} disabled={loading}>
              {loading ? <><div className="spinner" style={{width:'20px',height:'20px',borderWidth:'2px',margin:0}}></div> Generating...</> : <><i className="fas fa-wand-magic-sparkles"></i> Generate Design</>}
            </button>
          </div>

          {/* Outputs */}
          <div className="output-panel">
            {!loading && !results && (
              <div className="output-placeholder">
                <i className="fas fa-wand-magic-sparkles"></i>
                <h3>Your software blueprints will appear here</h3>
                <p>Provide project requirements and click Generate Design</p>
              </div>
            )}

            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Analyzing requirements and drafting diagrams...</p>
              </div>
            )}

            {results && !loading && (
              <div className="output-results">
                <div className="output-tabs">
                  {genUI && <button className={`tab-btn ${activeTab === 'ui' ? 'active' : ''}`} onClick={() => setActiveTab('ui')}><i className="fas fa-layer-group"></i> UI Layout</button>}
                  {genArch && <button className={`tab-btn ${activeTab === 'arch' ? 'active' : ''}`} onClick={() => setActiveTab('arch')}><i className="fas fa-sitemap"></i> Architecture</button>}
                  {genUml && <button className={`tab-btn ${activeTab === 'uml' ? 'active' : ''}`} onClick={() => setActiveTab('uml')}><i className="fas fa-code"></i> UML Class</button>}
                  {genDfd && <button className={`tab-btn ${activeTab === 'dfd' ? 'active' : ''}`} onClick={() => setActiveTab('dfd')}><i className="fas fa-shuffle"></i> DFD Flow</button>}
                  {genSugg && <button className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`} onClick={() => setActiveTab('suggestions')}><i className="fas fa-lightbulb"></i> Suggestions</button>}
                </div>

                {/* UI Wireframe Tab */}
                {activeTab === 'ui' && genUI && (
                  <div className="tab-content active">
                    <div className="tab-header">
                      <h3>Generated UI Wireframe Layout</h3>
                      <button className="copy-btn" onClick={() => handleCopy('ui')}><i className="fas fa-copy"></i> {copied ? 'Copied!' : 'Copy'}</button>
                    </div>
                    <div className="ui-layout" id="content-ui">
                      {results.ui.map((s, idx) => (
                        <div className="ui-section" key={idx}>
                          <div className="ui-section-title">{s.title}</div>
                          <ul>{s.items.map((i, idy) => <li key={idy}>{i}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* System Architecture Tab */}
                {activeTab === 'arch' && genArch && (
                  <div className="tab-content active">
                    <div className="tab-header">
                      <h3>Layered System Architecture</h3>
                      <button className="copy-btn" onClick={() => handleCopy('arch')}><i className="fas fa-copy"></i> {copied ? 'Copied!' : 'Copy'}</button>
                    </div>
                    <div className="arch-layout" id="content-arch">
                      {results.arch.map((l, idx) => (
                        <div className="arch-layer" key={idx}>
                          <div className="arch-layer-title">{l.title}</div>
                          <p>{l.desc}</p>
                          <div className="arch-components">{l.tags.map(t => <span className="arch-tag" key={t}>{t}</span>)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* UML Class Diagram Tab */}
                {activeTab === 'uml' && genUml && (
                  <div className="tab-content active">
                    <div className="tab-header">
                      <h3>UML Class Schema Nodes</h3>
                      <button className="copy-btn" onClick={() => handleCopy('uml')}><i className="fas fa-copy"></i> {copied ? 'Copied!' : 'Copy'}</button>
                    </div>
                    <div className="uml-container" id="content-uml">
                      {results.uml.map((cls, idx) => (
                        <div className="uml-class-card" key={idx}>
                          <div className="uml-class-header"><i className="fas fa-cubes"></i> {cls.name}</div>
                          <div className="uml-class-section">
                            {cls.attributes.map((attr, i) => <div className="uml-class-item" key={i}>{attr}</div>)}
                          </div>
                          <div className="uml-class-section">
                            {cls.methods.map((method, i) => <div className="uml-class-item" key={i} style={{ color: 'var(--accent)' }}>{method}</div>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DFD Flow Diagram Tab */}
                {activeTab === 'dfd' && genDfd && (
                  <div className="tab-content active">
                    <div className="tab-header">
                      <h3>Data Flow Diagram (DFD Level 1)</h3>
                      <button className="copy-btn" onClick={() => handleCopy('dfd')}><i className="fas fa-copy"></i> {copied ? 'Copied!' : 'Copy'}</button>
                    </div>
                    <div className="dfd-container" id="content-dfd">
                      {results.dfd.map((flow, idx) => (
                        <div key={idx} style={{ width: '100%' }}>
                          <div className="dfd-row">
                            <div className="dfd-shape dfd-entity"><i className="fas fa-user-gear" style={{ marginRight: '6px' }}></i> {flow.entity}</div>
                            <div className="dfd-arrow"><i className="fas fa-arrow-right"></i>Data Input</div>
                            <div className="dfd-shape dfd-process"><i className="fas fa-rotate" style={{ marginRight: '6px' }}></i> {flow.process}</div>
                            <div className="dfd-arrow"><i className="fas fa-arrow-right"></i>Store Flow</div>
                            <div className="dfd-shape dfd-store"><i className="fas fa-database" style={{ marginRight: '6px' }}></i> {flow.datastore}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions Tab */}
                {activeTab === 'suggestions' && genSugg && (
                  <div className="tab-content active">
                    <div className="tab-header">
                      <h3>Best Practice Recommendations</h3>
                      <button className="copy-btn" onClick={() => handleCopy('suggestions')}><i className="fas fa-copy"></i> {copied ? 'Copied!' : 'Copy'}</button>
                    </div>
                    <div className="suggestions-layout" id="content-suggestions">
                      {results.suggestions.map((s, idx) => (
                        <div className="suggestion-item" key={idx}>
                          <div className="suggestion-icon">{s.icon}</div>
                          <div className="suggestion-text"><strong>{s.title}</strong><p>{s.text}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
