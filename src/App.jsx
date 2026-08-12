import { useState } from 'react';
import { Mail, Phone, MapPin, Globe, BriefcaseBusiness, GraduationCap, FileText, Award, ShieldCheck, Upload, X } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
   Palette: deep ink background, parchment ink, verdigris (patinated
   copper/teal) as the primary accent, aged gold as a secondary accent
   for credential stamps. Display face: Fraunces (a serif with real
   character, restrained). Body: Inter. Utility/meta: JetBrains Mono.
   Signature: publication status shown as rotated ink-stamp badges —
   echoes the subject's own research into credentials & verification.
──────────────────────────────────────────────────────────────────── */
const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .zhg-root, .zhg-root * { box-sizing: border-box; }
  .zhg-root {
    --bg:        #0b0f13;
    --panel:     #12181e;
    --panel-2:   #161d24;
    --ink:       #eae6da;
    --ink-dim:   #9aa19f;
    --ink-faint: #6b7370;
    --line:      rgba(234,230,218,0.10);
    --line-2:    rgba(234,230,218,0.18);
    --verdigris: #4f9d8f;
    --verdigris-dim: rgba(79,157,143,0.14);
    --gold:      #c9a15a;
    --gold-dim:  rgba(201,161,90,0.14);
    --rust:      #b3654a;

    --display: 'Fraunces', Georgia, serif;
    --body: 'Inter', ui-sans-serif, system-ui, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;

    background: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    line-height: 1.65;
    min-height: 100vh;
    padding-bottom: 4rem;
  }

  .zhg-root a { color: var(--verdigris); text-decoration: none; }
  .zhg-root a:hover { color: var(--gold); }

  .zhg-root ::selection { background: var(--verdigris-dim); color: var(--ink); }

  @keyframes zhgFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .zhg-fade { animation: zhgFadeUp 0.6s ease both; }

  .zhg-wrap { max-width: 880px; margin: 0 auto; padding: 0 1.5rem; }

  .zhg-eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--verdigris);
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .zhg-eyebrow::before {
    content: '';
    width: 18px; height: 1px;
    background: var(--verdigris);
    display: inline-block;
  }

  .zhg-h2 {
    font-family: var(--display);
    font-weight: 600;
    font-size: 1.7rem;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  .zhg-section {
    padding: 3.2rem 0;
    border-top: 1px solid var(--line);
  }

  .zhg-card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 1.4rem 1.5rem;
  }

  .zhg-entry + .zhg-entry { margin-top: 1.5rem; }

  .zhg-tag {
    display: inline-flex;
    align-items: center;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.03em;
    padding: 4px 10px;
    border-radius: 5px;
    border: 1px solid var(--line-2);
    color: var(--ink-dim);
    background: rgba(255,255,255,0.015);
  }

  /* the signature element: credential stamp for publication status */
  .zhg-stamp {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 9px 3px 8px;
    border-radius: 3px;
    border: 1px solid currentColor;
    transform: rotate(-2deg);
    white-space: nowrap;
  }
  .zhg-stamp--published   { color: var(--verdigris); }
  .zhg-stamp--forthcoming { color: var(--gold); }
  .zhg-stamp--submitted   { color: #7ea8c9; }
  .zhg-stamp--prep        { color: var(--ink-faint); }

  .zhg-upload {
    position: relative;
    border: 1.5px dashed var(--line-2);
    border-radius: 10px;
    background: rgba(255,255,255,0.012);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    overflow: hidden;
  }
  .zhg-upload:hover { border-color: var(--verdigris); background: var(--verdigris-dim); }
  .zhg-upload input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .zhg-upload img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .zhg-remove {
    position: absolute; top: 6px; right: 6px; z-index: 2;
    background: rgba(11,15,19,0.82);
    border: 1px solid var(--line-2);
    color: var(--ink);
    border-radius: 50%;
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }

  .zhg-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 12px; font-weight: 500;
    letter-spacing: 0.04em;
    padding: 9px 16px;
    border-radius: 7px;
    border: 1px solid var(--line-2);
    color: var(--ink);
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .zhg-btn:hover { border-color: var(--verdigris); color: var(--verdigris); background: var(--verdigris-dim); }
  .zhg-btn--solid {
    background: var(--verdigris); border-color: var(--verdigris); color: #08110f;
  }
  .zhg-btn--solid:hover { background: var(--gold); border-color: var(--gold); color: #1a1408; }

  .zhg-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .zhg-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.85rem; }

  @media (max-width: 640px) {
    .zhg-grid-2, .zhg-grid-3 { grid-template-columns: 1fr; }
  }
`;

/* ─── image upload primitive (in-memory only; no localStorage) ────── */
function PhotoSlot({ label, aspect = '4 / 3', circle = false }) {
  const [src, setSrc] = useState(null);
  
  const handle = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setSrc(ev.target.result);
    r.readAsDataURL(f);
  };

  return (
    <div>
      <div
        className="zhg-upload"
        style={{ aspectRatio: aspect, borderRadius: circle ? '50%' : 10 }}
      >
        {!circle && src && (
          <div className="zhg-remove" onClick={(e) => { e.stopPropagation(); setSrc(null); }}>
            <X size={13} />
          </div>
        )}
        {/* ADDED onClick handler to reset input value allowing re-upload of the same image */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handle} 
          onClick={(e) => { e.target.value = null; }} 
        />
        {src ? (
          <img src={src} alt={label} />
        ) : (
          <div style={{ textAlign: 'center', padding: '0.75rem', pointerEvents: 'none' }}>
            <Upload size={circle ? 22 : 18} color="var(--ink-faint)" style={{ marginBottom: 6 }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-dim)', letterSpacing: '0.04em' }}>
              {label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── stamp badge for publication status ───────────────────────────── */
function Stamp({ status }) {
  const map = {
    published:   { cls: 'zhg-stamp--published',  label: 'Published' },
    forthcoming: { cls: 'zhg-stamp--forthcoming', label: 'Forthcoming' },
    submitted:   { cls: 'zhg-stamp--submitted',   label: 'Submitted' },
    prep:        { cls: 'zhg-stamp--prep',        label: 'In Preparation' },
  };
  const s = map[status] || map.prep;
  return <span className={`zhg-stamp ${s.cls}`}>{s.label}</span>;
}

/* ─── section wrapper ──────────────────────────────────────────────── */
function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="zhg-section">
      <div className="zhg-wrap">
        <div className="zhg-eyebrow">{eyebrow}</div>
        <h2 className="zhg-h2" style={{ marginBottom: '1.6rem' }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

/* ─── CV-derived data ───────────────────────────────────────────────── */
const EDUCATION = [
  {
    degree: 'M.Sc. in Applied Cybersecurity',
    detail: 'CyberMACS — Erasmus Mundus Joint Master',
    school: 'Kadir Has University, Istanbul, Türkiye',
    date: 'Sep 2025 – Expected Sep 2027',
    note: 'Current CGPA: 3.3 / 4.0 (1st year)',
  },
  {
    degree: 'B.Sc. in Computer Science and Engineering',
    detail: 'GPA 3.5 / 4.0',
    school: 'Mekelle University, Mekelle, Ethiopia',
    date: 'Aug 2012 – Jul 2017',
    note: 'Thesis: "Malaria Disease Detection and Classification Using Image Processing"',
  },
];

const RESEARCH = [
  {
    role: 'University Research Assistant',
    org: 'Kadir Has University',
    loc: 'Istanbul, Türkiye',
    date: 'Feb 2026 – Present',
    bullets: [
      'Engineer and optimize machine learning models for image-processing and intrusion-detection applications.',
      'Contribute to Sky Innovators, a European Union Erasmus+-funded collaborative research and innovation project, applying machine learning methods within an international, cross-institutional team.',
      'Supervise undergraduate researchers on thesis design, methodology, and research milestones.',
      'Lead preparation and submission of manuscripts to peer-reviewed journals and conferences.',
    ],
  },
  {
    role: 'Data Scientist and Researcher (Part-time)',
    org: 'Ethiopian Artificial Intelligence Institute — AI/NLP Department',
    loc: 'Addis Ababa, Ethiopia',
    date: 'Jan 2023 – Present',
    bullets: [
      'Develop NLP models for data extraction and custom ML algorithms for prediction and classification.',
      'Lead speech-to-text and sentiment-analysis projects for Amharic-language communication tools.',
    ],
  },
  {
    role: 'Data Analyst',
    org: 'International Organization for Migration — Data and Research Unit',
    loc: 'Addis Ababa, Ethiopia',
    date: 'Oct 2017 – Jan 2018',
    bullets: [
      'Cleaned and analyzed migration datasets, informing evidence-based policy recommendations.',
    ],
  },
];

const TEACHING = {
  role: 'Assistant Lecturer, Computer Engineering',
  org: 'Dire Dawa University',
  loc: 'Dire Dawa, Ethiopia',
  date: 'Mar 2018 – May 2020',
  bullets: [
    'Taught AI & Expert Systems, Digital Signal Processing, Embedded Systems, and Microprocessors.',
    'Coordinator, Automation Research & Development Center; advised final-year student projects.',
  ],
};

const PUBLICATIONS = [
  {
    title: 'Private Sovereign Identity: Mitigating Metadata-Based Attacks on SSI and SD-JWT',
    venue: 'Target: peer-reviewed journal, 2026',
    status: 'prep',
    note: 'Examines metadata-based attacks on Self-Sovereign Identity (SSI) and SD-JWT credentials, proposing mitigations that strengthen the shift from centralized to decentralized, privacy-preserving identity — removing single points of failure.',
  },
  {
    title: 'Time-of-Day Context Augments IAT-Based Intrusion Detection Against Timing Evasion: A SHAP-Guided Adversarial Analysis',
    venue: 'CyberMACS Conference, June 2026',
    status: 'forthcoming',
    note: 'Strengthens IAT-based intrusion detection against timing-evasion attacks using time-of-day context and SHAP-guided adversarial analysis.',
  },
  {
    title: 'A Quantum-Resistant Remote E-Voting Protocol for Computationally Unbounded Adversary',
    venue: 'World Academy of Science, Engineering and Technology, 2024–2025',
    status: 'published',
    note: 'Proposes a quantum-resistant e-voting protocol outperforming the Helios system in ballot secrecy and dispute resolution.',
  },
  {
    title: 'Amharic Language Audio Data Search Engine: Combining Text-Based Spoken Term Detection with Deep Learning Models',
    venue: 'Springer Nature, 2023',
    status: 'published',
    note: 'Enables efficient spoken-term search across large Amharic audio archives, addressing NLP tooling gaps for low-resource languages.',
  },
  {
    title: "How War Shaped COVID-19's Social and Mortality Impact in Ethiopia",
    venue: 'COVID Information Commons Student Paper Challenge, 2025 — 3rd Place, Graduate Cohort',
    status: 'submitted',
    note: 'Analyzes compounding effects of armed conflict on pandemic-era health and mortality outcomes.',
  },
];

const CERTS = [
  { name: 'AI Security & Governance', issuer: 'Securiti', date: 'Jun 2026' },
  { name: 'Project Management Professional (PMP)', issuer: 'PMI, via Pearson VUE', date: 'Jun 2026' },
  { name: 'ISO/IEC 27701:2025 Lead Auditor', issuer: 'Mastermind Assurance', date: 'Jul 2026' },
  { name: 'IBM Cybersecurity Analyst', issuer: 'Coursera / IBM · 14 courses', date: 'Jul 2026' },
  { name: 'Google Cybersecurity', issuer: 'Coursera / Google · 9 courses', date: 'Jul 2026' },
  { name: 'Microsoft Azure Security Engineer Associate (AZ-500)', issuer: 'Coursera / Microsoft · 7 courses', date: 'Jul 2026' },
  { name: 'Cybersecurity in the AI Era', issuer: 'Coursera / University of Maryland · 3 courses', date: 'Jun 2026' },
  { name: 'Cloud Security on AWS', issuer: 'Coursera / Edureka', date: 'Jun 2026' },
  { name: 'Securing Hosts, Network, and Edge in AWS', issuer: 'Coursera / Packt', date: 'Jun 2026' },
  { name: 'Kifiya AI Mastery Training Program (with distinction)', issuer: 'Mastercard Foundation', date: 'Mar 2026' },
];

const HONORS = [
  { title: '3rd Place, Graduate Cohort', detail: 'COVID Information Commons (CIC) Student Paper Challenge, 2025 — USD 200 award' },
  { title: 'Gold Medalist', detail: 'Medal of Appreciation, Ayder Referral Hospital, for contributions to hospital research initiatives' },
];

const SKILLS = [
  'Python', 'MATLAB', 'SQL', 'Deep Learning', 'Reinforcement Learning', 'NLP',
  'Image Processing', 'AI / LLM Security', 'Cryptographic Protocol Design',
  'Decentralized Identity (SSI / SD-JWT)',
];

const MEMBERSHIPS = [
  'Ethiopian Software Developers Association',
  'Engineers Without Borders (EWB)',
  'Global Society of Tigrai Scholars and Professionals (GSTS)',
  'Araya Charity Club, Mekelle University',
  'Black in AI',
];

/* ─── HEADER ────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header style={{ borderBottom: '1px solid var(--line)', paddingTop: '3rem', paddingBottom: '2.4rem' }}>
      <div className="zhg-wrap" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="zhg-fade" style={{ flexShrink: 0, width: 128 }}>
          <PhotoSlot label="Profile photo" aspect="1 / 1" circle />
        </div>
        <div className="zhg-fade" style={{ flex: 1, minWidth: 260 }}>
          <div className="zhg-eyebrow">Cybersecurity Researcher · AI/ML</div>
          <h1 style={{
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
            letterSpacing: '-0.015em', lineHeight: 1.08, color: 'var(--ink)', marginBottom: '0.5rem',
          }}>
            Zemenfes Hailemariam Gebremedhin
          </h1>
          <p style={{ color: 'var(--ink-dim)', fontSize: 14.5, maxWidth: 520, marginBottom: '1.1rem' }}>
            M.Sc. candidate in Applied Cybersecurity, researching adversarial machine learning,
            decentralized identity, and privacy-preserving cryptography.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <a className="zhg-btn" href="mailto:zemenfeshailemariam@gmail.com"><Mail size={13}/> Email</a>
            <a className="zhg-btn" href="tel:+905316898573"><Phone size={13}/> +90 531 689 8573</a>
            {/* UPDATED: rel="noopener noreferrer" added to external links */}
            <a className="zhg-btn" href="https://www.linkedin.com/in/zemenhaile" target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={13}/> LinkedIn</a>
            <a className="zhg-btn" href="https://github.com/zemenfes-afk" target="_blank" rel="noopener noreferrer"><Globe size={13}/> GitHub</a>
            <span className="zhg-btn" style={{ cursor: 'default' }}><MapPin size={13}/> Istanbul, Türkiye</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────── */
function About() {
  return (
    <Section id="about" eyebrow="Profile" title="About">
      <div className="zhg-card zhg-fade">
        <p style={{ color: 'var(--ink)', fontSize: 14.5, lineHeight: 1.85 }}>
          Cybersecurity graduate researcher balancing full-time M.Sc. study with active research-assistant
          work, bridging machine learning, applied cryptography, and systems security. My work spans
          adversarial ML for intrusion detection, decentralized identity and privacy-preserving protocols,
          and applied deep learning for environmental and NLP problems. I am particularly drawn to the
          intersection of security and AI — building systems that are not only accurate, but robust,
          explainable, and trustworthy — and I am building toward a PhD focused on adversarial robustness,
          privacy-preserving machine learning, and quantum-resistant cryptography.
        </p>
      </div>
    </Section>
  );
}

/* ─── EDUCATION ─────────────────────────────────────────────────────── */
function Education() {
  return (
    <Section id="education" eyebrow="Credentials" title="Education">
      {EDUCATION.map((e, i) => (
        <div className="zhg-card zhg-entry zhg-fade" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <GraduationCap size={16} color="var(--verdigris)" />
              <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 16.5, color: 'var(--ink)' }}>{e.degree}</span>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-faint)' }}>{e.date}</span>
          </div>
          <div style={{ color: 'var(--ink-dim)', fontSize: 13.5, marginBottom: 3 }}>{e.detail}</div>
          <div style={{ color: 'var(--gold)', fontSize: 13, marginBottom: 6 }}>{e.school}</div>
          <div style={{ color: 'var(--ink-faint)', fontSize: 12.5, fontStyle: 'italic' }}>{e.note}</div>
        </div>
      ))}
    </Section>
  );
}

/* ─── RESEARCH & TEACHING ───────────────────────────────────────────── */
function ExperienceEntry({ e }) {
  return (
    <div className="zhg-card zhg-entry zhg-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{e.role}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-faint)' }}>{e.date}</span>
      </div>
      <div style={{ color: 'var(--gold)', fontSize: 13, marginBottom: 2 }}>{e.org}</div>
      <div style={{ color: 'var(--ink-faint)', fontSize: 12, marginBottom: 10 }}>{e.loc}</div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
        {e.bullets.map((b, i) => (
          <li key={i} style={{ color: 'var(--ink-dim)', fontSize: 13.5, lineHeight: 1.7 }}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Research() {
  return (
    <Section id="research" eyebrow="Appointments" title="Research Experience">
      {RESEARCH.map((e, i) => <ExperienceEntry e={e} key={i} />)}
    </Section>
  );
}

function Teaching() {
  return (
    <Section id="teaching" eyebrow="Instruction" title="Teaching Experience">
      <ExperienceEntry e={TEACHING} />
    </Section>
  );
}

/* ─── PUBLICATIONS ──────────────────────────────────────────────────── */
function Publications() {
  return (
    <Section id="publications" eyebrow="Bibliography" title="Publications & Conference Papers">
      {PUBLICATIONS.map((p, i) => (
        <div className="zhg-card zhg-entry zhg-fade" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
              <FileText size={15} color="var(--verdigris)" style={{ marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', lineHeight: 1.4 }}>
                {p.title}
              </span>
            </div>
            <Stamp status={p.status} />
          </div>
          <div style={{ color: 'var(--gold)', fontSize: 12.5, marginBottom: 8, marginLeft: 24 }}>{p.venue}</div>
          <p style={{ color: 'var(--ink-dim)', fontSize: 13, lineHeight: 1.75, marginLeft: 24 }}>{p.note}</p>
        </div>
      ))}
    </Section>
  );
}

/* ─── CERTIFICATIONS ────────────────────────────────────────────────── */
function Certifications() {
  return (
    <Section id="certifications" eyebrow="Training" title="Certifications & Professional Training">
      <div className="zhg-grid-2">
        {CERTS.map((c, i) => (
          <div className="zhg-card zhg-fade" key={i} style={{ padding: '1rem 1.15rem' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              <ShieldCheck size={14} color="var(--verdigris)" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{c.name}</span>
            </div>
            <div style={{ color: 'var(--ink-faint)', fontSize: 11.5, marginLeft: 22, fontFamily: 'var(--mono)' }}>
              {c.issuer} · {c.date}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── HONORS ────────────────────────────────────────────────────────── */
function Honors() {
  return (
    <Section id="honors" eyebrow="Recognition" title="Honors & Awards">
      <div className="zhg-grid-2">
        {HONORS.map((h, i) => (
          <div className="zhg-card zhg-fade" key={i}>
            <div style={{ display: 'flex', gap: 9, marginBottom: 4 }}>
              <Award size={15} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 14.5, color: 'var(--ink)' }}>{h.title}</span>
            </div>
            <div style={{ color: 'var(--ink-dim)', fontSize: 12.5, marginLeft: 24 }}>{h.detail}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── SKILLS & LANGUAGES ────────────────────────────────────────────── */
function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills & Languages">
      <div className="zhg-card zhg-fade">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.1rem' }}>
          {SKILLS.map((s, i) => <span className="zhg-tag" key={i}>{s}</span>)}
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.9rem', color: 'var(--ink-dim)', fontSize: 13 }}>
          <strong style={{ color: 'var(--ink)' }}>Languages:</strong> Tigrinya (native) · English — C1 (all skills)
        </div>
      </div>
    </Section>
  );
}

/* ─── MEMBERSHIPS ───────────────────────────────────────────────────── */
function Memberships() {
  return (
    <Section id="memberships" eyebrow="Affiliations" title="Professional Memberships">
      <div className="zhg-card zhg-fade">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {MEMBERSHIPS.map((m, i) => <span className="zhg-tag" key={i}>{m}</span>)}
        </div>
      </div>
    </Section>
  );
}

/* ─── PHOTO GALLERY (upload zones) ──────────────────────────────────── */
function Gallery() {
  const slots = [
    'Conference / presentation',
    'Campus or lab',
    'Award ceremony',
    'Research team',
    'Fieldwork',
    'Additional photo',
  ];
  return (
    <Section id="gallery" eyebrow="Media" title="Photos">
      <p style={{ color: 'var(--ink-faint)', fontSize: 12.5, marginBottom: '1rem', marginTop: '-0.8rem' }}>
        Click any tile to upload a photo. Images stay in this browser session only.
      </p>
      <div className="zhg-grid-3">
        {slots.map((label, i) => (
          <PhotoSlot label={label} key={i} aspect="4 / 3" />
        ))}
      </div>
    </Section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: '1rem', paddingTop: '2rem' }}>
      <div className="zhg-wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-faint)' }}>
          Zemenfes Hailemariam Gebremedhin · Istanbul, Türkiye
        </span>
        <div style={{ display: 'flex', gap: 14 }}>
          <a href="mailto:zemenfeshailemariam@gmail.com" style={{ fontSize: 12.5 }}>Email</a>
          {/* UPDATED: rel="noopener noreferrer" added to external links */}
          <a href="https://www.linkedin.com/in/zemenhaile" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5 }}>LinkedIn</a>
          <a href="https://github.com/zemenfes-afk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5 }}>GitHub</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <div className="zhg-root">
      <style>{TOKENS}</style>
      <Header />
      <main>
        <About />
        <Education />
        <Research />
        <Publications />
        <Teaching />
        <Certifications />
        <Honors />
        <Skills />
        <Memberships />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}