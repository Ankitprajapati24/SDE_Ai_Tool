import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PLANS = [
  {
    tier: 'Starter', price: 'Free', period: '', desc: 'Perfect for students, individuals, and personal projects',
    features: [
      { text: '5 designs per month', ok: true },
      { text: 'UI Layout generation', ok: true },
      { text: 'Basic system architecture', ok: true },
      { text: 'UML & DFD diagram snippets', ok: true },
      { text: 'Copy to clipboard', ok: true },
      { text: 'Design history & exports', ok: false },
    ],
    btnLabel: 'Get Started Free', btnCls: 'outline', featured: false,
  },
  {
    tier: 'Pro', price: '$12', period: '/ month', desc: 'Best for professional developers, architects, and growing teams',
    features: [
      { text: 'Unlimited design generations', ok: true },
      { text: 'All design views (UI, DFD, UML, Arch)', ok: true },
      { text: 'Full SVG diagram layout exports', ok: true },
      { text: 'Personal design history & tracking', ok: true },
      { text: 'Export to PDF / Markdown / GitHub', ok: true },
      { text: 'Priority customer support', ok: true },
    ],
    btnLabel: 'Start Pro Trial', btnCls: 'filled', featured: true,
  },
  {
    tier: 'Premium', price: '$49', period: '/ month', desc: 'For teams, startups, and agencies building software at scale',
    features: [
      { text: 'Everything included in Pro plan', ok: true },
      { text: 'Team sharing & collaboration workspace', ok: true },
      { text: 'Custom layout guidelines & templates', ok: true },
      { text: 'Direct REST API generation access', ok: true },
      { text: 'White-label PDF exports', ok: true },
      { text: 'Dedicated 24/7 account support', ok: true },
    ],
    btnLabel: 'Contact Sales', btnCls: 'outline', featured: false,
  },
]

function PricingSkeleton() {
  return (
    <div className="skeleton-page">
      <div className="sk-header center">
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.6rem',width:'100%'}}>
          <div className="sk-block w20 h14"></div>
          <div className="sk-block w45 h36"></div>
          <div className="sk-block w30 h16"></div>
        </div>
      </div>
      <div className="sk-pricing-row">
        {[1,2,3].map(i => (
          <div className={`sk-pricing-card ${i === 2 ? 'featured' : ''}`} key={i}>
            <div className="sk-block w50 h20 mb10"></div>
            <div className="sk-block w40 h40 mb16"></div>
            {[1,2,3,4].map(j => <div className="sk-block w100 h12 mb8" key={j}></div>)}
            <div className="sk-block w100 h40"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Pricing() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="inner-page">
      {!loaded ? <PricingSkeleton /> : (
        <div className="real-content">
          <div className="inner-hero">
            <div className="badge"><i className="fas fa-tag"></i> Pricing</div>
            <h1>Simple, <span class="gradient-text">Transparent Pricing</span></h1>
            <p>Start free, upgrade when you need more. Cancel anytime.</p>
          </div>

          <div className="pricing-grid">
            {PLANS.map(plan => (
              <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={plan.tier}>
                {plan.featured && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-tier">{plan.tier}</div>
                <div className="pricing-price">
                  <span className="price-amount">{plan.price}</span>
                  {plan.period && <span className="price-period">{plan.period}</span>}
                </div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map(f => (
                    <li key={f.text} className={f.ok ? '' : 'disabled'}>
                      <i className={`fas ${f.ok ? 'fa-check' : 'fa-xmark'}`}></i> {f.text}
                    </li>
                  ))}
                </ul>
                <button className={`pricing-btn ${plan.btnCls}`} onClick={() => navigate('/#generate')}>
                  {plan.btnLabel}
                </button>
              </div>
            ))}
          </div>

          <div className="pricing-note">
            <i className="fas fa-shield-halved"></i>
            All plans include a 14-day free trial. No credit card required to start.
          </div>
        </div>
      )}
    </div>
  )
}

