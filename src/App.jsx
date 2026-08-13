import React, { useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Upload, X, ArrowUpRight, ShieldCheck, Award, Home, User, Book, Calendar } from 'lucide-react';
import samplePhoto from './Pictures/WhatsApp Image 2025-09-11 at 15.23.16_71615e55.jpg';

/* ────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
   Deep ink ground, parchment ink, verdigris (patinated copper/teal)
   as primary accent, aged gold as secondary. Fraunces for display,
   Inter for body, JetBrains Mono for meta/labels.

   SIGNATURE: a hero-scale "identity graph" SVG — nodes and edges
   forming a decentralized network. It's literal: this is what his
   own research (SSI / decentralized identity, adversarial ML on
   networks) looks like as a diagram, not a borrowed flourish.
──────────────────────────────────────────────────────────────────── */
const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .zhg-root, .zhg-root * { box-sizing: border-box; }
  .zhg-root {
    --bg:        #0a0e12;
    --bg-2:      #0d1216;
    --panel:     #12181d;
    --ink:       #ece7d9;
    --ink-dim:   #98a19c;
    --ink-faint: #62706a;
    --line:      rgba(236,231,217,0.09);
    --line-2:    rgba(236,231,217,0.16);
    --verdigris: #57a596;
    --verdigris-soft: rgba(87,165,150,0.13);
    --gold:      #cda568;
    --gold-soft: rgba(205,165,104,0.13);

    --display: 'Fraunces', Georgia, serif;
    --body: 'Inter', ui-sans-serif, system-ui, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;

    background: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    line-height: 1.6;
    min-height: 100vh;
  }

  .zhg-root a { color: var(--verdigris); text-decoration: none; }
  .zhg-root a:hover { color: var(--gold); }
  .zhg-root ::selection { background: var(--verdigris-soft); color: var(--ink); }

  @keyframes zhgFadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes zhgDrift  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes zhgPulse  { 0%,100% { opacity:0.35; } 50% { opacity:0.9; } }
  .zhg-fade { animation: zhgFadeUp 0.7s ease both; }

  .zhg-wrap    { max-width: 980px; margin: 0 auto; padding: 0 1.6rem; }
  .zhg-wrap-lg { max-width: 1180px; margin: 0 auto; padding: 0 1.6rem; }

  .zhg-eyebrow {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--verdigris);
    display: flex; align-items: center; gap: 9px; margin-bottom: 0.9rem;
  }
  .zhg-eyebrow::before { content:''; width:20px; height:1px; background: var(--verdigris); }

  .zhg-display {
    font-family: var(--display); color: var(--ink); letter-spacing: -0.015em;
  }

  /* ── HERO ─────────────────────────────────────────────────────── */
  .zhg-hero {
    position: relative;
    min-height: 86vh;
    display: flex; align-items: center;
    overflow: hidden;
    background:
      radial-gradient(ellipse 900px 500px at 78% 12%, rgba(87,165,150,0.14), transparent 60%),
      radial-gradient(ellipse 700px 500px at 8% 90%, rgba(205,165,104,0.09), transparent 60%),
      var(--bg);
  }
  .zhg-hero-grid {
    position: absolute; inset: 0; opacity: 0.5; pointer-events: none;
    background-image:
      linear-gradient(rgba(236,231,217,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(236,231,217,0.035) 1px, transparent 1px);
    background-size: 46px 46px;
    mask-image: radial-gradient(ellipse 80% 60% at 60% 30%, black, transparent 80%);
  }
  .zhg-hero-inner {
    position: relative; z-index: 2; width: 100%;
    display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 3rem; align-items: center;
    padding: 6rem 0 4rem;
  }
  @media (max-width: 880px) { .zhg-hero-inner { grid-template-columns: 1fr; padding-top: 5rem; } }

  .zhg-kicker-pill {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--line-2); border-radius: 100px;
    padding: 6px 14px; margin-bottom: 1.6rem;
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em;
    color: var(--ink-dim); background: rgba(255,255,255,0.02);
  }
  .zhg-kicker-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--verdigris);
    animation: zhgPulse 2.2s infinite;
  }

  .zhg-hero h1 {
    font-weight: 600; font-size: clamp(2.6rem, 5.6vw, 4.4rem);
    line-height: 0.98; margin: 0 0 1.3rem;
  }
  .zhg-hero-lede {
    color: var(--ink-dim); font-size: 16px; line-height: 1.75; max-width: 480px; margin-bottom: 2rem;
  }
  .zhg-hero-lede em { color: var(--verdigris); font-style: normal; }
  .zhg-hero-lede strong { color: var(--gold); font-weight: 600; }

  .zhg-stat-row { display: flex; gap: 1.8rem; flex-wrap: wrap; margin-bottom: 2.1rem; }
  .zhg-stat-num {
    font-family: var(--display); font-weight: 600; font-size: 1.7rem; color: var(--ink); line-height: 1;
  }
  .zhg-stat-lbl {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-faint);
    text-transform: uppercase; margin-top: 4px;
  }

  .zhg-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.03em;
    padding: 10px 17px; border-radius: 8px; border: 1px solid var(--line-2); color: var(--ink);
    transition: border-color .2s, color .2s, background .2s, transform .2s;
  }
  .zhg-btn:hover { border-color: var(--verdigris); color: var(--verdigris); background: var(--verdigris-soft); transform: translateY(-1px); }
  .zhg-btn--solid { background: var(--verdigris); border-color: var(--verdigris); color: #06110d; }
  .zhg-btn--solid:hover { background: var(--gold); border-color: var(--gold); color: #1a1408; }

  /* ── identity graph svg wrap ──────────────────────────────────── */
  .zhg-graph-wrap { display: flex; justify-content: center; animation: zhgDrift 7s ease-in-out infinite; }

  /* ── section shell ────────────────────────────────────────────── */
  .zhg-section { padding: 5rem 0; }
  .zhg-section--alt { background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .zhg-section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2.6rem; }
  .zhg-section-head h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); font-weight: 600; margin: 0; }
  .zhg-section-note { color: var(--ink-faint); font-size: 13px; max-width: 320px; text-align: right; }
  @media (max-width: 640px) { .zhg-section-note { text-align: left; } }

  /* ── focus pillars ─────────────────────────────────────────────── */
  .zhg-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  @media (max-width: 900px) { .zhg-pillars { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 520px) { .zhg-pillars { grid-template-columns: 1fr; } }
  .zhg-pillar {
    border: 1px solid var(--line); border-radius: 12px; padding: 1.4rem 1.3rem;
    background: linear-gradient(160deg, rgba(255,255,255,0.02), transparent);
    transition: border-color .2s, transform .2s;
  }
  .zhg-pillar:hover { border-color: var(--verdigris); transform: translateY(-3px); }
  .zhg-pillar-num { font-family: var(--mono); font-size: 11px; color: var(--ink-faint); margin-bottom: 0.9rem; }
  .zhg-pillar h3 { font-family: var(--display); font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem; color: var(--ink); }
  .zhg-pillar p { color: var(--ink-dim); font-size: 12.5px; line-height: 1.6; margin: 0; }

  /* ── featured publication ─────────────────────────────────────── */
  .zhg-featured {
    border: 1px solid var(--line-2); border-radius: 16px; padding: 2.2rem;
    background: linear-gradient(135deg, var(--verdigris-soft), transparent 60%), var(--panel);
    position: relative; overflow: hidden; margin-bottom: 1.4rem;
  }
  .zhg-featured::before {
    content: 'IN PROGRESS'; position: absolute; top: 1.6rem; right: -2.8rem;
    transform: rotate(40deg); background: var(--gold); color: #1a1408;
    font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    padding: 4px 3.2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
  .zhg-featured-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; color: var(--gold); margin-bottom: 0.9rem; text-transform: uppercase; }
  .zhg-featured h3 { font-family: var(--display); font-size: 1.5rem; font-weight: 600; max-width: 640px; line-height: 1.28; margin: 0 0 0.9rem; color: var(--ink); }
  .zhg-featured p { color: var(--ink-dim); font-size: 14px; line-height: 1.8; max-width: 640px; margin: 0 0 1rem; }
  .zhg-featured-venue { font-family: var(--mono); font-size: 12px; color: var(--verdigris); }

  /* ── publication rows ─────────────────────────────────────────── */
  .zhg-pub-row {
    display: grid; grid-template-columns: 1fr auto; gap: 1rem;
    padding: 1.35rem 0; border-top: 1px solid var(--line); align-items: flex-start;
  }
  .zhg-pub-title { font-family: var(--display); font-weight: 600; font-size: 15.5px; color: var(--ink); line-height: 1.4; margin-bottom: 5px; }
  .zhg-pub-venue { color: var(--ink-faint); font-size: 12.5px; font-family: var(--mono); }
  .zhg-stamp {
    font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.09em;
    text-transform: uppercase; padding: 4px 10px; border-radius: 4px; border: 1px solid currentColor;
    white-space: nowrap; height: fit-content;
  }
  .zhg-stamp--published { color: var(--verdigris); }
  .zhg-stamp--submitted { color: #82aed0; }

  /* ── timeline ──────────────────────────────────────────────────── */
  .zhg-timeline { position: relative; padding-left: 28px; }
  .zhg-timeline::before {
    content: ''; position: absolute; left: 6px; top: 6px; bottom: 6px; width: 1px;
    background: linear-gradient(var(--verdigris), var(--line) 90%);
  }
  .zhg-tl-item { position: relative; padding-bottom: 2.4rem; }
  .zhg-tl-item:last-child { padding-bottom: 0; }
  .zhg-tl-dot {
    position: absolute; left: -28px; top: 4px; width: 13px; height: 13px; border-radius: 50%;
    background: var(--bg); border: 2px solid var(--verdigris);
  }
  .zhg-tl-date { font-family: var(--mono); font-size: 11px; color: var(--ink-faint); letter-spacing: 0.05em; margin-bottom: 5px; }
  .zhg-tl-role { font-family: var(--display); font-weight: 600; font-size: 16.5px; color: var(--ink); margin-bottom: 2px; }
  .zhg-tl-org { color: var(--gold); font-size: 13px; margin-bottom: 10px; }
  .zhg-tl-item ul { margin: 0; padding-left: 17px; display: grid; gap: 5px; }
  .zhg-tl-item li { color: var(--ink-dim); font-size: 13px; line-height: 1.65; }

  /* ── credential wall ───────────────────────────────────────────── */
  .zhg-wall { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
  @media (max-width: 780px) { .zhg-wall { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 480px) { .zhg-wall { grid-template-columns: 1fr; } }
  .zhg-cred {
    border: 1px solid var(--line); border-radius: 9px; padding: 0.9rem 1rem;
    display: flex; gap: 9px; align-items: flex-start;
    transition: border-color .2s, background .2s;
  }
  .zhg-cred:hover { border-color: var(--verdigris); background: var(--verdigris-soft); }
  .zhg-cred-name { font-size: 12.5px; font-weight: 600; color: var(--ink); line-height: 1.35; }
  .zhg-cred-meta { font-family: var(--mono); font-size: 10px; color: var(--ink-faint); margin-top: 3px; }

  /* ── skills cloud ──────────────────────────────────────────────── */
  .zhg-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
  .zhg-chip {
    font-family: var(--mono); font-size: 11.5px; padding: 6px 13px; border-radius: 100px;
    border: 1px solid var(--line-2); color: var(--ink-dim);
  }

  /* ── gallery ───────────────────────────────────────────────────── */
  .zhg-masonry { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 130px; gap: 0.7rem; }
  .zhg-masonry > div:nth-child(1) { grid-column: span 2; grid-row: span 2; }
  .zhg-masonry > div:nth-child(4) { grid-row: span 2; }
  @media (max-width: 780px) { .zhg-masonry { grid-template-columns: repeat(2,1fr); } .zhg-masonry > div:nth-child(1) { grid-column: span 2; grid-row: span 1; } .zhg-masonry > div:nth-child(4) { grid-row: span 1; } }

  .zhg-upload {
    position: relative; height: 100%; border: 1.5px dashed var(--line-2); border-radius: 10px;
    background: rgba(255,255,255,0.012); display: flex; align-items: center; justify-content: center;
    cursor: pointer; overflow: hidden; transition: border-color .2s, background .2s;
  }
  .zhg-upload:hover { border-color: var(--verdigris); background: var(--verdigris-soft); }
  .zhg-upload input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .zhg-upload img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .zhg-remove {
    position: absolute; top: 6px; right: 6px; z-index: 2; background: rgba(10,14,18,0.85);
    border: 1px solid var(--line-2); color: var(--ink); border-radius: 50%; width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
  }

  .zhg-footer { border-top: 1px solid var(--line); padding: 2.4rem 0 3rem; }
`;

/* ─── identity graph SVG (hero signature element) ──────────────────── */
function IdentityGraph() {
  const nodes = [
    [180, 40], [300, 90], [60, 110], [230, 190], [90, 230],
    [320, 230], [180, 300], [40, 300], [270, 330],
  ];
  const edges = [[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[3,6],[4,6],[4,7],[5,8],[6,8],[6,7]];
  return (
    <svg viewBox="0 0 360 360" width="100%" height="100%" style={{ maxWidth: 400 }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="rgba(87,165,150,0.35)" strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 6 ? 8 : 5} fill={i === 6 ? '#cda568' : '#57a596'} opacity={i === 6 ? 1 : 0.85} />
          <circle cx={x} cy={y} r={i === 6 ? 15 : 10} fill="none" stroke={i === 6 ? '#cda568' : '#57a596'} strokeWidth="1" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

/* ─── image upload primitive (in-memory only) ──────────────────────── */
function PhotoSlot({ label, aspect = '4 / 3', circle = false, height, storageKey, defaultSrc }) {
  // storageKey: optional localStorage key to persist the image (e.g. 'profileImage')
  const [src, setSrc] = useState(() => {
    try {
      if (storageKey) {
        const v = localStorage.getItem(storageKey);
        if (v) return v;
      }
    } catch (e) { /* ignore */ }
    return defaultSrc || null;
  });

  const persist = (dataUrl) => {
    setSrc(dataUrl);
    if (!storageKey) return;
    try { localStorage.setItem(storageKey, dataUrl); } catch (e) { /* ignore */ }
  };

  const handle = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      // Crop to square and resize to 400x400 for a formal profile picture
      const img = new Image();
      img.onload = () => {
        const size = 400;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
        persist(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = ev.target.result;
    };
    r.readAsDataURL(f);
  };

  const remove = (e) => {
    e.stopPropagation();
    setSrc(null);
    if (storageKey) {
      try { localStorage.removeItem(storageKey); } catch (e) { /* ignore */ }
    }
  };

  return (
    <div className="zhg-upload" style={{ aspectRatio: height ? undefined : aspect, height, width: height || undefined, borderRadius: circle ? '50%' : 10, overflow: 'hidden' }}>
      {src && (
        <div className="zhg-remove" onClick={remove}>
          <X size={12} />
        </div>
      )}
      <input type="file" accept="image/*" onChange={handle} />
      {src ? (
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: circle ? '50%' : 10 }} />
      ) : (
        <div style={{ textAlign: 'center', padding: '0.6rem', pointerEvents: 'none' }}>
          <Upload size={circle ? 22 : 16} color="var(--ink-faint)" style={{ marginBottom: 5 }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--ink-dim)', letterSpacing: '0.03em' }}>{label}</div>
        </div>
      )}
    </div>
  );
}

/* ─── data ──────────────────────────────────────────────────────────── */
const PILLARS = [
  { title: 'Adversarial ML', desc: 'Attacks and defenses for intrusion detection and security-critical models.' },
  { title: 'Decentralized Identity', desc: 'Privacy-preserving protocols — SSI, SD-JWT, metadata-attack mitigation.' },
  { title: 'Quantum-Resistant Crypto', desc: 'Post-quantum protocol design for secure remote systems.' },
  { title: 'Explainable AI', desc: 'SHAP-based interpretability for trustworthy security systems.' },
];

const PUBLICATIONS = [
  {
    title: 'Time-of-Day Context Augments IAT-Based Intrusion Detection Against Timing Evasion: A SHAP-Guided Adversarial Analysis',
    venue: 'CyberMACS Conference · June 2026',
    status: 'Forthcoming',
    cls: 'zhg-stamp--published',
  },
  {
    title: 'A Quantum-Resistant Remote E-Voting Protocol for Computationally Unbounded Adversary',
    venue: 'World Academy of Science, Engineering and Technology · 2024–2025',
    status: 'Published',
    cls: 'zhg-stamp--published',
  },
  {
    title: 'Amharic Language Audio Data Search Engine: Combining Text-Based Spoken Term Detection with Deep Learning Models',
    venue: 'Springer Nature · 2023',
    status: 'Published',
    cls: 'zhg-stamp--published',
  },
  {
    title: "How War Shaped COVID-19's Social and Mortality Impact in Ethiopia",
    venue: 'COVID Information Commons Student Paper Challenge · 2025 — 3rd Place, Graduate Cohort',
    status: 'Submitted',
    cls: 'zhg-stamp--submitted',
  },
];

const TIMELINE = [
  {
    date: 'Feb 2026 – Present', role: 'University Research Assistant', org: 'Kadir Has University, Istanbul',
    items: [
      'Engineer ML models for image-processing and intrusion-detection applications.',
      'Contribute to Sky Innovators, an Erasmus+-funded EU research and innovation project.',
      'Supervise undergraduate researchers; lead manuscript preparation for journals and conferences.',
    ],
  },
  {
    date: 'Jan 2023 – Present', role: 'Data Scientist & Researcher (Part-time)', org: 'Ethiopian Artificial Intelligence Institute, AI/NLP Dept.',
    items: [
      'Develop NLP models for data extraction and custom ML classification algorithms.',
      'Lead speech-to-text and sentiment-analysis projects for Amharic-language tools.',
    ],
  },
  {
    date: 'Mar 2018 – May 2020', role: 'Assistant Lecturer, Computer Engineering', org: 'Dire Dawa University, Ethiopia',
    items: [
      'Taught AI & Expert Systems, Digital Signal Processing, Embedded Systems, Microprocessors.',
      'Coordinated the Automation Research & Development Center.',
    ],
  },
  {
    date: 'Oct 2017 – Jan 2018', role: 'Data Analyst', org: 'International Organization for Migration, Addis Ababa',
    items: ['Cleaned and analyzed migration datasets to inform evidence-based policy recommendations.'],
  },
];

const CERTS = [
  { name: 'AI Security & Governance', meta: 'Securiti · Jun 2026' },
  { name: 'ISO/IEC 27701:2025 Lead Auditor', meta: 'Mastermind Assurance · Jul 2026' },
  { name: 'IBM Cybersecurity Analyst', meta: 'Coursera/IBM · 14 courses' },
  { name: 'Google Cybersecurity', meta: 'Coursera/Google · 9 courses' },
  { name: 'Microsoft Azure Security Engineer (AZ-500)', meta: 'Coursera/Microsoft · 7 courses' },
  { name: 'Cybersecurity in the AI Era', meta: 'Coursera/U. of Maryland · 3 courses' },
  { name: 'Cloud Security on AWS', meta: 'Coursera/Edureka' },
  { name: 'Securing Hosts, Network & Edge in AWS', meta: 'Coursera/Packt' },
  { name: 'Project Management Professional (PMP)', meta: 'PMI, via Pearson VUE' },
  { name: 'Kifiya AI Mastery (with distinction)', meta: 'Mastercard Foundation · Mar 2026' },
];

const SKILLS = ['Python', 'MATLAB', 'SQL', 'Deep Learning', 'Reinforcement Learning', 'NLP',
  'Image Processing', 'AI/LLM Security', 'Cryptographic Protocol Design', 'SSI / SD-JWT', 'Tigrinya (native)', 'English — C1'];

/* ─── HERO ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="zhg-hero">
      <div className="zhg-hero-grid" />
      <div className="zhg-wrap-lg">
        <div className="zhg-hero-inner">
          <div className="zhg-fade">
            <div className="zhg-kicker-pill"><span className="zhg-kicker-dot" /> M.Sc. CyberMACS · Kadir Has University</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <PhotoSlot label="Profile picture" height={140} defaultSrc={samplePhoto} circle={true} />
              <div>
                <h1 className="zhg-display">Zemenfes<br/>Hailemariam<br/>Gebremedhin</h1>
                <p className="zhg-hero-lede">
                  Researching <em>adversarial machine learning</em> and <em>decentralized identity</em> —
                  building security systems that are accurate, explainable, and resistant to the adversaries
                  of tomorrow, including <strong>quantum-capable</strong> ones.
                </p>
              </div>
            </div>
            <div className="zhg-stat-row">
              <div><div className="zhg-stat-num">4</div><div className="zhg-stat-lbl">Publications</div></div>
              <div><div className="zhg-stat-num">3</div><div className="zhg-stat-lbl">Research Roles</div></div>
              <div><div className="zhg-stat-num">10</div><div className="zhg-stat-lbl">Certifications</div></div>
             
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <a className="zhg-btn zhg-btn--solid" href="mailto:zemenfeshailemariam@gmail.com"><Mail size={13}/> Get in touch</a>
              <a className="zhg-btn" href="https://www.linkedin.com/in/zemenhaile" target="_blank" rel="noopener"><ExternalLink size={13}/> LinkedIn</a>
              <a className="zhg-btn" href="https://github.com/zemenfes-afk" target="_blank" rel="noopener"><ExternalLink size={13}/> GitHub</a>
            </div>
          </div>
          <div className="zhg-fade zhg-graph-wrap" style={{ animationDelay: '0.15s' }}>
            <IdentityGraph />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOCUS PILLARS ─────────────────────────────────────────────────── */
function Focus() {
  return (
    <section className="zhg-section">
      <div className="zhg-wrap-lg">
        <div className="zhg-eyebrow">Research Focus</div>
        <div className="zhg-section-head"><h2 className="zhg-display">Where I work</h2></div>
        <div className="zhg-pillars">
          {PILLARS.map((p, i) => (
            <div className="zhg-pillar" key={i}>
              <div className="zhg-pillar-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT (pull-quote style) ──────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="zhg-section zhg-section--alt">
      <div className="zhg-wrap">
        <div className="zhg-eyebrow">Profile</div>
        <p className="zhg-display" style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', fontWeight: 500, lineHeight: 1.5, maxWidth: 780 }}>
          Balancing full-time graduate study with active research work, bridging{' '}
          <span style={{ color: 'var(--verdigris)' }}>machine learning</span>, applied{' '}
          <span style={{ color: 'var(--gold)' }}>cryptography</span>, and systems security —
          building toward doctoral research in adversarial robustness, privacy-preserving ML,
          and quantum-resistant cryptography.
        </p>
      </div>
    </section>
  );
}

/* ─── PUBLICATIONS ──────────────────────────────────────────────────── */
function Publications() {
  return (
    <section id="publications" className="zhg-section">
      <div className="zhg-wrap">
        <div className="zhg-eyebrow">Bibliography</div>
        <div className="zhg-section-head">
          <h2 className="zhg-display">Publications</h2>
          <div className="zhg-section-note">Peer-reviewed and conference research, most recent work first.</div>
        </div>

        <div className="zhg-featured">
          <div className="zhg-featured-label">Featured — Journal Manuscript</div>
          <h3>Private Sovereign Identity: Mitigating Metadata-Based Attacks on SSI and SD-JWT</h3>
          <p>
            Examines metadata-based attacks on Self-Sovereign Identity (SSI) and SD-JWT credentials,
            proposing mitigations that strengthen the shift from centralized to decentralized,
            privacy-preserving identity — removing single points of failure.
          </p>
          <span className="zhg-featured-venue">Target: peer-reviewed journal, 2026</span>
        </div>

        <div>
          {PUBLICATIONS.map((p, i) => (
            <div className="zhg-pub-row" key={i}>
              <div>
                <div className="zhg-pub-title">{p.title}</div>
                <div className="zhg-pub-venue">{p.venue}</div>
              </div>
              <span className={`zhg-stamp ${p.cls}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TIMELINE (research + teaching combined) ───────────────────────── */
function Timeline() {
  return (
    <section id="timeline" className="zhg-section zhg-section--alt">
      <div className="zhg-wrap">
        <div className="zhg-eyebrow">Appointments</div>
        <div className="zhg-section-head"><h2 className="zhg-display">Research & Teaching</h2></div>
        <div className="zhg-timeline">
          {TIMELINE.map((t, i) => (
            <div className="zhg-tl-item" key={i}>
              <div className="zhg-tl-dot" />
              <div className="zhg-tl-date">{t.date}</div>
              <div className="zhg-tl-role">{t.role}</div>
              <div className="zhg-tl-org">{t.org}</div>
              <ul>{t.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION strip ────────────────────────────────────────────────── */
function Education() {
  return (
    <section id="education" className="zhg-section">
      <div className="zhg-wrap">
        <div className="zhg-eyebrow">Credentials</div>
        <div className="zhg-section-head"><h2 className="zhg-display">Education</h2></div>
        <div style={{ display: 'grid', gap: '1.1rem' }}>
          <div style={{ borderLeft: '2px solid var(--verdigris)', paddingLeft: '1.2rem' }}>
            <div className="zhg-tl-date">Sep 2025 – Expected Sep 2027</div>
            <div className="zhg-tl-role">M.Sc. in Applied Cybersecurity — CyberMACS (Erasmus Mundus)</div>
            <div className="zhg-tl-org">Kadir Has University, Istanbul, Türkiye</div>
            
          </div>
          <div style={{ borderLeft: '2px solid var(--line-2)', paddingLeft: '1.2rem' }}>
            <div className="zhg-tl-date">Aug 2012 – Jul 2017</div>
            <div className="zhg-tl-role">B.Sc. in Computer Science and Engineering</div>
            <div className="zhg-tl-org">Mekelle University, Mekelle, Ethiopia</div>
            <div style={{ color: 'var(--ink-faint)', fontSize: 12.5, fontStyle: 'italic', marginTop: 4 }}>Thesis: "Malaria Disease Detection and Classification Using Image Processing"</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CREDENTIAL WALL ───────────────────────────────────────────────── */
function CredentialWall() {
  return (
    <section className="zhg-section zhg-section--alt">
      <div className="zhg-wrap-lg">
        <div className="zhg-eyebrow">Training</div>
        <div className="zhg-section-head"><h2 className="zhg-display">Certifications</h2></div>
        <div className="zhg-wall">
          {CERTS.map((c, i) => (
            <div className="zhg-cred" key={i}>
              <ShieldCheck size={14} color="var(--verdigris)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div><div className="zhg-cred-name">{c.name}</div><div className="zhg-cred-meta">{c.meta}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HONORS + SKILLS ────────────────────────────────────────────────── */
function HonorsSkills() {
  return (
    <section className="zhg-section">
      <div className="zhg-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <div className="zhg-eyebrow">Recognition</div>
          <h2 className="zhg-display" style={{ fontSize: '1.5rem', marginBottom: '1.4rem' }}>Honors</h2>
          <div style={{ display: 'grid', gap: '1.1rem' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <Award size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 14.5 }}>3rd Place, Graduate Cohort</div>
                <div style={{ color: 'var(--ink-dim)', fontSize: 12.5 }}>COVID Information Commons Student Paper Challenge, 2025 — USD 200 award</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Award size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 14.5 }}>Gold Medalist</div>
                <div style={{ color: 'var(--ink-dim)', fontSize: 12.5 }}>Medal of Appreciation, Ayder Referral Hospital</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="zhg-eyebrow">Capabilities</div>
          <h2 className="zhg-display" style={{ fontSize: '1.5rem', marginBottom: '1.4rem' }}>Skills</h2>
          <div className="zhg-cloud">{SKILLS.map((s, i) => <span className="zhg-chip" key={i}>{s}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY (masonry upload) ──────────────────────────────────────── */
function Gallery() {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    // Import static images from src/Pictures at build time
    const modules = import.meta.glob('/src/Pictures/*', { eager: true });
    const entries = Object.keys(modules)
      .filter((p) => /\.(png|jpe?g|webp|gif)$/i.test(p))
      .map((p) => ({ name: p.split('/').pop(), url: modules[p].default || modules[p] }));

    // Load up to two user-uploaded images from localStorage
    const userImages = [];
    try {
      const a = localStorage.getItem('userPhoto1'); if (a) userImages.push({ name: 'You (1)', url: a, user: true });
      const b = localStorage.getItem('userPhoto2'); if (b) userImages.push({ name: 'You (2)', url: b, user: true });
    } catch (e) { /* ignore */ }

    setImages([...userImages, ...entries]);
  }, []);

  return (
    <section className="zhg-section zhg-section--alt">
      <div className="zhg-wrap-lg">
        <div className="zhg-eyebrow">Media</div>
        <div className="zhg-section-head">
          <h2 className="zhg-display">Photos</h2>
          <div className="zhg-section-note">Thumbnails are shown at a uniform 4:3 ratio. You can add up to two personal photos below.</div>
        </div>

        {images.length === 0 ? (
          <div style={{ color: 'var(--ink-faint)' }}>No images found in <strong>src/Pictures</strong>. Add personal photos using the two upload tiles below.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 18 }}>
            {images.map((im, i) => (
              <div key={i} style={{ borderRadius: 8, overflow: 'hidden', background: 'var(--panel)' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}>
                  <img src={im.url} alt={im.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: 8, fontSize: 12, color: 'var(--ink-dim)' }}>
                  <span>{im.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <PhotoSlot label="Add profile/gallery photo 1" height="160px" storageKey="userPhoto1" />
          </div>
          <div style={{ flex: 1 }}>
            <PhotoSlot label="Add profile/gallery photo 2" height="160px" storageKey="userPhoto2" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" className="zhg-footer">
      <div className="zhg-wrap-lg" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-faint)' }}>
          Zemenfes Hailemariam Gebremedhin · Istanbul, Türkiye
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="mailto:zemenfeshailemariam@gmail.com" style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 5 }}>Email <ArrowUpRight size={12}/></a>
          <a href="https://www.linkedin.com/in/zemenhaile" target="_blank" rel="noopener" style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 5 }}>LinkedIn <ArrowUpRight size={12}/></a>
          <a href="https://github.com/zemenfes-afk" target="_blank" rel="noopener" style={{ fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 5 }}>GitHub <ArrowUpRight size={12}/></a>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────────── */
function TopTabs() {
  return (
    <nav style={{ position: 'sticky', top: 0, display: 'flex', gap: 12, padding: '8px 12px', justifyContent: 'center', background: 'rgba(10,14,18,0.85)', zIndex: 120 }}>
      <a href="#home" style={{ color: 'var(--ink)', opacity: 0.9 }} title="Home"><Home size={18} /></a>
      <a href="#about" style={{ color: 'var(--ink)', opacity: 0.9 }} title="About"><User size={18} /></a>
      <a href="#publications" style={{ color: 'var(--ink)', opacity: 0.9 }} title="Publications"><Book size={18} /></a>
      <a href="#timeline" style={{ color: 'var(--ink)', opacity: 0.9 }} title="Timeline"><Calendar size={18} /></a>
      <a href="#contact" style={{ color: 'var(--ink)', opacity: 0.9 }} title="Contact"><Mail size={18} /></a>
    </nav>
  );
}
export default function Portfolio() {
  return (
    <div className="zhg-root">
      <style>{TOKENS}</style>
      <TopTabs />
      <Hero />
      <Focus />
      <About />
      <Publications />
      <Timeline />
      <Education />
      <CredentialWall />
      <HonorsSkills />
      <Gallery />
      <Footer />
    </div>
  );
}