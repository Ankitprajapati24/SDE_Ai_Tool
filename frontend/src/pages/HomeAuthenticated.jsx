import { useState, useEffect } from 'react'

const PROJECTS_DATA = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Web Application',
    stack: 'React / Node.js',
    payout: '$12/mo plan',
    difficulty: 'Medium',
    progress: 80,
    status: 'active',
    duration: 'Generated 2 hours ago',
    description: 'Detailed e-commerce software design including product lists, shopping carts, checkout forms, and secure transactions.',
    ui: [
      { title: '🖥️ Header / Navigation', items: ['Logo (DesignAI brain)', 'Nav Links (Home, Cart, Settings)', 'Search Bar', 'Auth Indicators'] },
      { title: '🏠 Product Showcase Grid', items: ['Banner Slider', 'Featured Products list', 'Filter Sidebar (price, category)', 'Stats Overview'] },
      { title: '📋 Checkout & Transaction Forms', items: ['Shopping Cart slide-out', 'Address details input form', 'Stripe credit card payment block', 'Success indicator page'] }
    ],
    arch: [
      { title: 'Frontend Layer', desc: 'React Client Web App', tags: ['React.js / Next.js', 'Tailwind CSS', 'Redux State', 'Axios Client'] },
      { title: 'Backend Layer', desc: 'Express REST API Server', tags: ['Node.js / Express', 'JWT Auth Middleware', 'Stripe Integration API', 'Input Sanitizer'] },
      { title: 'Database Store', desc: 'Relational Database systems', tags: ['PostgreSQL Database', 'Prisma ORM', 'Redis Session Cache', 'Database migrations'] }
    ],
    uml: [
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
    ],
    dfd: [
      { entity: 'User Client', direction: 'down', process: '1.0 Capture Item Checkout', datastore: 'Temp Cart Cache' },
      { entity: 'User Client', direction: 'right', process: '2.0 Charge Cards via Stripe', datastore: 'Transactions DB' }
    ],
    suggestions: [
      { icon: '🎨', title: 'Consistent UI Theme', text: 'Apply a structured theme using custom CSS variables or Tailwind. Leverage grid frameworks for product layouts.' },
      { icon: '⚡', title: 'Lazy Load Products', text: 'Implement infinite scroll or pagination with lazy-loaded image lists to maintain load speeds under 2 seconds.' },
      { icon: '🔐', title: 'Stripe Compliance', text: 'Secure card details. Never collect card numbers in plain text; use tokenized frames via Stripe elements.' }
    ],
    connectedRepo: null
  },
  {
    id: 'chat-app',
    title: 'Realtime Chat Mobile App',
    stack: 'React Native / Go',
    payout: '$49/mo plan',
    difficulty: 'Hard',
    progress: 100,
    status: 'completed',
    duration: 'Generated 1 day ago',
    description: 'Architecture and data models for high-concurrency instant messaging client with session persistence.',
    ui: [
      { title: '🖥️ Main Client Screen', items: ['Drawer navigation menu', 'Active Conversations list', 'Global Search bar', 'Settings Link'] },
      { title: '💬 Active Chat Room', items: ['Header (avatar, active status)', 'Scrollable Messages body', 'Input footer (text input, file attach, send button)'] }
    ],
    arch: [
      { title: 'Mobile Frontend', desc: 'Native Hybrid app Client', tags: ['React Native', 'Expo', 'WebSocket client', 'SQLite local cache'] },
      { title: 'High Concurrency API Gateway', desc: 'WebSocket and Session Manager', tags: ['Go / Gin Web Framework', 'Gorilla WebSockets', 'Authentication middlewares', 'JSON converters'] },
      { title: 'Realtime Session Cache', desc: 'Active connections & messaging store', tags: ['Redis Pub/Sub', 'MongoDB Chat Store', 'GridFS (file uploads)'] }
    ],
    uml: [
      {
        name: 'User',
        attributes: ['+ id: int', '+ username: string', '+ isOnline: bool', '+ avatarUrl: string'],
        methods: ['+ connect()', '+ disconnect()', '+ updateStatus()']
      },
      {
        name: 'Message',
        attributes: ['+ id: string', '+ roomId: string', '+ senderId: int', '+ content: string', '+ timestamp: int'],
        methods: ['+ send()', '+ delete()', '+ markRead()']
      },
      {
        name: 'Room',
        attributes: ['+ id: string', '+ name: string', '+ memberList: List', '+ type: enum'],
        methods: ['+ addMember()', '+ removeMember()', '+ getHistory()']
      }
    ],
    dfd: [
      { entity: 'Mobile App client', direction: 'down', process: '1.0 Handshake Request', datastore: 'Active Socket Pool' },
      { entity: 'Mobile App client', direction: 'right', process: '2.0 Dispatch Chat Event', datastore: 'Chats DB' }
    ],
    suggestions: [
      { icon: '🎨', title: 'Dynamic Layout sizing', text: 'Adapt inputs and keyboard offsets to prevent overlays in native mobile wrappers.' },
      { icon: '⚡', title: 'Local SQLite Sync', text: 'Store active thread text locally in SQLite to enable instant loading and offline capability.' },
      { icon: '🔐', title: 'Socket Authentication', text: 'Enforce handshake validation tokens to prevent unauthorized socket streams.' }
    ],
    connectedRepo: 'https://github.com/MinishaDev/chat-app-design-spec'
  },
  {
    id: 'task-manager',
    title: 'Task Manager Dashboard',
    stack: 'React / Python',
    payout: 'Starter plan',
    difficulty: 'Easy',
    progress: 40,
    status: 'active',
    duration: 'Generated 3 days ago',
    description: 'System designs for a general workspace management layout, boards, checklists, and timelines.',
    ui: [
      { title: '🖥️ Layout & Sidebar', items: ['Main Sidebar (overview, active boards, calendar, settings)', 'Header (search, alerts, workspace profile)'] },
      { title: '🏠 Kanban Board Panel', items: ['Status columns (Backlog, Todo, Doing, Done)', 'Draggable Task Card items', 'Add Column button', 'Filters row'] }
    ],
    arch: [
      { title: 'Frontend SPA Client', desc: 'Task Planner frontend', tags: ['React.js / Next.js', 'Draggable libraries', 'Redux state', 'Tailwind stylesheet'] },
      { title: 'Service Gateway API', desc: 'Backend core endpoints routing', tags: ['Python / FastAPI', 'SQLAlchemy ORM', 'JWT authentication', 'PDF generator library'] },
      { title: 'Relational Schema storage', desc: 'Application data persistent schema', tags: ['PostgreSQL DB', 'Alembic Migrations', 'Redis temporary queues'] }
    ],
    uml: [
      {
        name: 'Project',
        attributes: ['+ id: int', '+ name: string', '+ ownerId: int', '+ created: Date'],
        methods: ['+ addTeammate()', '+ deleteProject()', '+ archive()']
      },
      {
        name: 'Task',
        attributes: ['+ id: int', '+ title: string', '+ status: enum', '+ priority: enum', '+ assigneeId: int'],
        methods: ['+ assign()', '+ changeStatus()', '+ addChecklist()']
      },
      {
        name: 'User',
        attributes: ['+ id: int', '+ name: string', '+ email: string'],
        methods: ['+ login()', '+ getTasks()']
      }
    ],
    dfd: [
      { entity: 'Web client', direction: 'down', process: '1.0 Fetch Kanban View', datastore: 'Workspace Store' },
      { entity: 'Web client', direction: 'right', process: '2.0 Create Checklist Task', datastore: 'Tasks database' }
    ],
    suggestions: [
      { icon: '🎨', title: 'Aesthetic Dashboards', text: 'Maintain grid systems and use consistent badge colors for status items.' },
      { icon: '⚡', title: 'HMR updates', text: 'Configure realtime listener subscriptions to keep Kanban boards updated across different clients.' },
      { icon: '🔐', title: 'Auth guidelines', text: 'Implement route protections to ensure users cannot view projects they do not own.' }
    ],
    connectedRepo: null
  }
]

export default function HomeAuthenticated() {
  const [projects, setProjects] = useState(PROJECTS_DATA)
  const [activeId, setActiveId] = useState(PROJECTS_DATA[0].id)
  const [activeTab, setActiveTab] = useState('ui')
  const [username, setUsername] = useState('')
  
  // GitHub sharing states
  const [showModal, setShowModal] = useState(false)
  const [repoName, setRepoName] = useState('')
  const [repoDesc, setRepoDesc] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [branch, setBranch] = useState('main')
  const [commitMsg, setCommitMsg] = useState('')
  
  const [syncing, setSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncStep, setSyncStep] = useState(0) // 0: Init, 1: Repo, 2: Commit, 3: Push, 4: Done
  const [createdUrl, setCreatedUrl] = useState('')
  
  const [toastMsg, setToastMsg] = useState('')
  
  const activeProj = projects.find(p => p.id === activeId) || projects[0]

  useEffect(() => {
    setActiveTab('ui')
    const storedUsername = localStorage.getItem('design_username') || 'Developer'
    setUsername(storedUsername)
  }, [activeId])

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => {
      setToastMsg('')
    }, 3500)
  }

  const openGitHubModal = () => {
    setRepoName(activeProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    setRepoDesc(activeProj.description)
    setCommitMsg(`feat: generate software design blueprint docs for ${activeProj.title}`)
    setSyncStep(0)
    setSyncProgress(0)
    setSyncing(false)
    setShowModal(true)
  }

  const handleShareToGitHub = (e) => {
    e.preventDefault()
    if (!repoName.trim()) return

    setSyncing(true)
    setSyncProgress(10)
    setSyncStep(0)

    // Phase 1: Initialize connection
    setTimeout(() => {
      setSyncProgress(35)
      setSyncStep(1)
      
      // Phase 2: Create repository
      setTimeout(() => {
        setSyncProgress(65)
        setSyncStep(2)
        
        // Phase 3: Commit files
        setTimeout(() => {
          setSyncProgress(90)
          setSyncStep(3)
          
          // Phase 4: Push code
          setTimeout(() => {
            const finalUrl = `https://github.com/MinishaDev/${repoName}`
            setSyncProgress(100)
            setSyncStep(4)
            setCreatedUrl(finalUrl)
            
            // Update project status in local state
            setProjects(prev => prev.map(p => {
              if (p.id === activeId) {
                return { ...p, connectedRepo: finalUrl, progress: 100 }
              }
              return p
            }))

            triggerToast(`Repository created successfully: ${repoName}`)
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  }

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(createdUrl).then(() => {
      triggerToast('GitHub URL copied to clipboard!')
    })
  }

  const handleCopyDesign = () => {
    const text = document.getElementById(`content-${activeTab}`)?.innerText || ''
    navigator.clipboard.writeText(text).then(() => {
      triggerToast('Design content copied to clipboard!')
    })
  }

  return (
    <div className="auth-workspace">
      {/* Left Sidebar */}
      <aside className="sidebar" style={{ width: '260px' }}>
        <div className="sidebar-section">
          <p className="sidebar-label">WORKSPACE</p>
          <a href="#/home" className="sidebar-item active"><i className="fas fa-desktop"></i> Design Arena</a>
          <a href="#/pricing" className="sidebar-item"><i className="fas fa-tag"></i> Pricing Tiers</a>
        </div>

        {/* Active Projects List in Sidebar */}
        <div className="sidebar-project-section">
          <p className="sidebar-label">ACTIVE PROJECTS</p>
          <div style={{ marginTop: '0.6rem' }}>
            {projects.map(p => (
              <div 
                key={p.id} 
                className={`sidebar-project-item${p.id === activeId ? ' active' : ''}`}
                onClick={() => setActiveId(p.id)}
              >
                <div className="sidebar-project-title">{p.title}</div>
                <div className="sidebar-project-meta">
                  <span className="sidebar-project-payout" style={{ fontSize: '0.7rem' }}>{p.payout}</span>
                  <span className={`sidebar-project-badge${p.status === 'completed' ? ' completed' : ''}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details Widget in Sidebar */}
        <div className="sidebar-details-widget">
          <div className="sidebar-details-title">
            <i className="fas fa-circle-info"></i> Design details
          </div>
          <div className="sidebar-details-row">
            <span className="sidebar-details-label">Stack</span>
            <span className="sidebar-details-value">{activeProj.stack}</span>
          </div>
          <div className="sidebar-details-row">
            <span className="sidebar-details-label">UML Classes</span>
            <span className="sidebar-details-value">{activeProj.uml.length} classes</span>
          </div>
          <div className="sidebar-details-row">
            <span className="sidebar-details-label">DFD Processes</span>
            <span className="sidebar-details-value">{activeProj.dfd.length} flows</span>
          </div>
          <div className="sidebar-details-row" style={{ flexDirection: 'column', gap: '0.4rem', borderBottom: 'none', paddingBottom: 0 }}>
            <span className="sidebar-details-label" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Completion</span>
              <span className="sidebar-details-value">{activeProj.progress}%</span>
            </span>
            <div style={{ height: '4px', background: '#22222a', borderRadius: '2px', overflow: 'hidden', width: '100%' }}>
              <div style={{ height: '100%', background: 'var(--primary)', width: `${activeProj.progress}%`, transition: 'width 0.3s' }}></div>
            </div>
          </div>
          <div className="sidebar-details-row" style={{ marginTop: '0.8rem', borderBottom: 'none', paddingBottom: 0 }}>
            <span className="sidebar-details-label">Git Sync</span>
            <span className="sidebar-details-value" style={{ color: activeProj.connectedRepo ? '#10b981' : '#ff8533' }}>
              <i className={activeProj.connectedRepo ? 'fab fa-github' : 'fas fa-unlink'}></i> {activeProj.connectedRepo ? 'Synced' : 'Not Connected'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main content workspace */}
      <main className="main-content" style={{ padding: '2rem' }}>
        <div className="workspace-container">
          
          {/* Left panel - Sandbox output viewer */}
          <div>
            <div className="workspace-header">
              <div className="workspace-title-section">
                <div className="greeting-badge" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="wave-hand">👋</span> Hi, {username}!
                </div>
                <h2>{activeProj.title}</h2>
                <p>{activeProj.description}</p>
                <div className="workspace-badges">
                  <span className="badge" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                    <i className="fas fa-clock"></i> {activeProj.duration}
                  </span>
                  <span className="badge" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border)' }}>
                    {activeProj.stack}
                  </span>
                </div>
              </div>
            </div>

            {/* Design card with Tabs */}
            <div className="sandbox-card">
              <div className="sandbox-header" style={{ padding: '0.6rem 1.2rem' }}>
                <div className="sandbox-tabs">
                  <button className={`sandbox-tab${activeTab === 'ui' ? ' active' : ''}`} onClick={() => setActiveTab('ui')}><i className="fas fa-layer-group"></i> UI Wireframe</button>
                  <button className={`sandbox-tab${activeTab === 'arch' ? ' active' : ''}`} onClick={() => setActiveTab('arch')}><i className="fas fa-sitemap"></i> Architecture</button>
                  <button className={`sandbox-tab${activeTab === 'uml' ? ' active' : ''}`} onClick={() => setActiveTab('uml')}><i className="fas fa-code"></i> UML Diagram</button>
                  <button className={`sandbox-tab${activeTab === 'dfd' ? ' active' : ''}`} onClick={() => setActiveTab('dfd')}><i className="fas fa-shuffle"></i> DFD Flow</button>
                  <button className={`sandbox-tab${activeTab === 'suggestions' ? ' active' : ''}`} onClick={() => setActiveTab('suggestions')}><i className="fas fa-lightbulb"></i> Suggestions</button>
                </div>
                <button className="copy-btn" onClick={handleCopyDesign}>
                  <i className="fas fa-copy"></i> Copy Content
                </button>
              </div>
              
              <div style={{ padding: '1.5rem', backgroundColor: '#09090b', minHeight: '320px' }}>
                {/* UI Wireframe View */}
                {activeTab === 'ui' && (
                  <div className="ui-layout" id="content-ui">
                    {activeProj.ui.map((s, idx) => (
                      <div className="ui-section" key={idx}>
                        <div className="ui-section-title">{s.title}</div>
                        <ul>{s.items.map((i, idy) => <li key={idy}>{i}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* System Architecture View */}
                {activeTab === 'arch' && (
                  <div className="arch-layout" id="content-arch">
                    {activeProj.arch.map((l, idx) => (
                      <div className="arch-layer" key={idx}>
                        <div className="arch-layer-title">{l.title}</div>
                        <p>{l.desc}</p>
                        <div className="arch-components">{l.tags.map(t => <span className="arch-tag" key={t}>{t}</span>)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* UML Class Diagram View */}
                {activeTab === 'uml' && (
                  <div className="uml-container" id="content-uml">
                    {activeProj.uml.map((cls, idx) => (
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
                )}

                {/* DFD Flow Diagram View */}
                {activeTab === 'dfd' && (
                  <div className="dfd-container" id="content-dfd">
                    {activeProj.dfd.map((flow, idx) => (
                      <div key={idx} style={{ width: '100%' }}>
                        <div className="dfd-row">
                          <div className="dfd-shape dfd-entity"><i className="fas fa-user-gear" style={{ marginRight: '6px' }}></i> {flow.entity}</div>
                          <div className="dfd-arrow"><i className="fas fa-arrow-right"></i>Input</div>
                          <div className="dfd-shape dfd-process"><i className="fas fa-rotate" style={{ marginRight: '6px' }}></i> {flow.process}</div>
                          <div className="dfd-arrow"><i className="fas fa-arrow-right"></i>Flow</div>
                          <div className="dfd-shape dfd-store"><i className="fas fa-database" style={{ marginRight: '6px' }}></i> {flow.datastore}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions View */}
                {activeTab === 'suggestions' && (
                  <div className="suggestions-layout" id="content-suggestions">
                    {activeProj.suggestions.map((s, idx) => (
                      <div className="suggestion-item" key={idx}>
                        <div className="suggestion-icon">{s.icon}</div>
                        <div className="suggestion-text"><strong>{s.title}</strong><p>{s.text}</p></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel - Integrations & Sharing */}
          <div>
            {/* GitHub Widget */}
            <div className={`github-share-card${activeProj.connectedRepo ? ' synced' : ''}`}>
              <div className="github-share-info">
                <div className="github-share-icon">
                  <i className="fab fa-github"></i>
                </div>
                <div>
                  <h4>{activeProj.connectedRepo ? 'Design Synced' : 'Export to GitHub'}</h4>
                  <p>
                    {activeProj.connectedRepo 
                      ? `Sync complete. Design config blueprints pushed to collaborator repository.` 
                      : 'Push generated diagrams, UI structures, and architecture specifications straight to your GitHub repository.'}
                  </p>
                </div>
              </div>

              {activeProj.connectedRepo ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div className="github-success-link" style={{ marginBottom: 0 }}>
                    <span>{activeProj.connectedRepo.replace('https://', '')}</span>
                    <a href={activeProj.connectedRepo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                  <button 
                    className="btn-secondary" 
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.02)' }}
                    onClick={openGitHubModal}
                  >
                    <i className="fas fa-rotate"></i> Re-Sync Specification
                  </button>
                </div>
              ) : (
                <button className="btn-primary" style={{ width: '100%' }} onClick={openGitHubModal}>
                  <i className="fab fa-github"></i> Export to GitHub
                </button>
              )}
            </div>

            {/* Design specs instructions */}
            <div className="dash-card">
              <h3>Design Documentation</h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <li style={{ marginBottom: '0.5rem' }}>Wireframe sections outline visual component priorities.</li>
                <li style={{ marginBottom: '0.5rem' }}>System architecture maps api endpoints, gateways, databases, and dependencies.</li>
                <li style={{ marginBottom: '0.5rem' }}>UML Class Diagram lists class inheritance, properties, and methods.</li>
                <li style={{ marginBottom: '0.5rem' }}>DFD maps how data flow transfers between interfaces and databases.</li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      {/* GitHub Sharing Modal */}
      {showModal && (
        <div className="github-modal-overlay">
          <div className="github-modal">
            <button className="github-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            
            {!syncing ? (
              <>
                <h3><i className="fab fa-github"></i> Push Specs to GitHub</h3>
                <p>Create a collaborate repo for this software design blueprint.</p>
                
                <form onSubmit={handleShareToGitHub}>
                  <div className="form-group">
                    <label>GitHub Account Workspace</label>
                    <select disabled>
                      <option>MinishaDev (Personal Profile)</option>
                      <option>SDEFend-Collab (Collaborator Team)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Repository Name</label>
                    <input 
                      type="text" 
                      value={repoName}
                      onChange={e => setRepoName(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                      placeholder="e.g. ecommerce-design-spec"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      rows="3"
                      value={repoDesc}
                      onChange={e => setRepoDesc(e.target.value)}
                      placeholder="Repository description..."
                    />
                  </div>

                  <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Visibility</label>
                      <select value={visibility} onChange={e => setVisibility(e.target.value)}>
                        <option value="public">Public Repo</option>
                        <option value="private">Private Repo</option>
                      </select>
                    </div>
                    <div>
                      <label>Default Branch</label>
                      <input 
                        type="text" 
                        value={branch}
                        onChange={e => setBranch(e.target.value)}
                        placeholder="main"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Commit Message</label>
                    <input 
                      type="text" 
                      value={commitMsg}
                      onChange={e => setCommitMsg(e.target.value)}
                      placeholder="e.g. feat: push designs"
                      required
                    />
                  </div>

                  <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <i className="fas fa-cloud-arrow-up"></i> Export Specifications
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <h3>
                  {syncStep === 4 ? (
                    <span style={{ color: '#10b981' }}><i className="fas fa-circle-check"></i> Export Complete</span>
                  ) : (
                    <span><i className="fas fa-sync fa-spin"></i> Pushing Specification...</span>
                  )}
                </h3>
                <p>Transferring blueprints to GitHub repository</p>

                <div className="github-progress-container">
                  <div className="github-progress-bar">
                    <div className="github-progress-fill" style={{ width: `${syncProgress}%` }}></div>
                  </div>
                  
                  <div className="github-steps">
                    <div className={`github-step-item${syncStep >= 1 ? ' completed' : syncStep === 0 ? ' active' : ''}`}>
                      <span className="github-step-icon">
                        {syncStep >= 1 ? '✓' : '1'}
                      </span>
                      <span>Initializing handshake credentials...</span>
                    </div>

                    <div className={`github-step-item${syncStep >= 2 ? ' completed' : syncStep === 1 ? ' active' : ''}`}>
                      <span className="github-step-icon">
                        {syncStep >= 2 ? '✓' : '2'}
                      </span>
                      <span>Creating repository <code>MinishaDev/{repoName}</code>...</span>
                    </div>

                    <div className={`github-step-item${syncStep >= 3 ? ' completed' : syncStep === 2 ? ' active' : ''}`}>
                      <span className="github-step-icon">
                        {syncStep >= 3 ? '✓' : '3'}
                      </span>
                      <span>Bundling blueprint markdown and schema structures...</span>
                    </div>

                    <div className={`github-step-item${syncStep >= 4 ? ' completed' : syncStep === 3 ? ' active' : ''}`}>
                      <span className="github-step-icon">
                        {syncStep >= 4 ? '✓' : '4'}
                      </span>
                      <span>Pushing refs to <code>origin/{branch}</code>...</span>
                    </div>
                  </div>
                </div>

                {syncStep === 4 && (
                  <div>
                    <div className="github-success-link">
                      <span>{createdUrl.replace('https://', '')}</span>
                      <button onClick={copyUrlToClipboard} title="Copy URL">
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <a 
                        href={createdUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary" 
                        style={{ flex: 1, textDecoration: 'none', textAlign: 'center', justifyContent: 'center' }}
                      >
                        <i className="fas fa-external-link-alt"></i> View Repository
                      </a>
                      <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 0.8 }}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="toast-notification">
          <i className="fas fa-circle-check" style={{ color: '#10b981', fontSize: '1.1rem' }}></i>
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  )
}
