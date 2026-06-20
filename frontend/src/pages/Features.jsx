import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const FEATURES = [
  { icon: 'fa-layer-group', cls: 'blue-icon', title: 'UI Layout Generation', desc: 'Automatically generate wireframe-style UI layouts based on your project description and user flow requirements.' },
  { icon: 'fa-sitemap', cls: 'purple-icon', title: 'System Architecture', desc: 'Get a structured overview of your system\'s components, modules, and how they interact with each other.' },
  { icon: 'fa-lightbulb', cls: 'green-icon', title: 'Design Suggestions', desc: 'Receive intelligent design recommendations tailored to your project type, tech stack, and target audience.' },
  { icon: 'fa-bolt', cls: 'orange-icon', title: 'Instant Results', desc: 'No waiting. Get your design outputs in seconds, not hours. Perfect for rapid prototyping and ideation.' },
  { icon: 'fa-users', cls: 'pink-icon', title: 'Beginner Friendly', desc: 'No deep technical knowledge required. Just describe your idea in plain English and let AI do the rest.' },
  { icon: 'fa-download', cls: 'teal-icon', title: 'Export Ready', desc: 'Copy or export your generated designs to use in your documentation, presentations, or development workflow.' },
  { icon: 'fa-code', cls: 'blue-icon', title: 'UML Class Diagrams', desc: 'Instantly generate detailed class diagrams listing parameters, variables, data types, and method signatures.' },
  { icon: 'fa-shuffle', cls: 'purple-icon', title: 'Data Flow Diagrams (DFD)', desc: 'Generate DFDs mapping how information transfers between client entities, process steps, and datastores.' },
  { icon: 'fa-share-nodes', cls: 'green-icon', title: 'GitHub Collaboration', desc: 'Sync and share your generated system designs directly to your public or private repositories.' },
]

function FeaturesSkeleton() {
  return (
    <div className="skeleton-page">
      <div className="sk-header center">
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.6rem',width:'100%'}}>
          <div className="sk-block w20 h14"></div>
          <div className="sk-block w50 h36"></div>
          <div className="sk-block w35 h16"></div>
        </div>
      </div>
      <div className="sk-grid-3">
        {[1,2,3,4,5,6].map(i => (
          <div className="sk-card" key={i} style={{padding:'1.5rem'}}>
            <div className="sk-icon mb12"></div>
            <div className="sk-block w60 h18 mb10"></div>
            <div className="sk-block w100 h12 mb6"></div>
            <div className="sk-block w80 h12"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Features() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="inner-page">
      {!loaded ? <FeaturesSkeleton /> : (
        <div className="real-content">
          <div className="inner-hero">
            <div className="badge"><i className="fas fa-layer-group"></i> Features</div>
            <h1>Designed for <span className="gradient-text">Developers & Architects</span></h1>
            <p>Skip the blank-page problem. Turn your software ideas into visual blueprints in seconds.</p>
          </div>

          <div className="features-grid" style={{maxWidth:'1100px',margin:'0 auto'}}>
            {FEATURES.map(f => (
              <div className="feature-card" key={f.title}>
                <div className={`feature-icon ${f.cls}`}><i className={`fas ${f.icon}`}></i></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-banner">
            <h2>Ready to design your next project?</h2>
            <p>Describe your app concept and get complete blueprints in under 30 seconds.</p>
            <button className="btn-primary" onClick={() => navigate('/#generate')}>
              <i className="fas fa-wand-magic-sparkles"></i> Try DesignAI Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

