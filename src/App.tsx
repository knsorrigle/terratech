import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import RevealText from './components/RevealText.tsx';
import { FlipText } from './components/ui/flip-text';
import { MaskedAvatars } from './components/ui/masked-avatars';
import { CoordinatorWidget } from './components/CoordinatorWidget.tsx';

const RULES = [
  { id: '01', title: 'NO MANUAL CODING', desc: 'Every line must be AI-prompted. No exceptions.' },
  { id: '02', title: 'AI TOOLS ONLY', desc: 'ChatGPT, Claude, Gemini, Cursor, v0, Bolt — all allowed.' },
  { id: '03', title: 'RANDOM PROBLEM', desc: 'Assigned at start. No prior preparation allowed.' },
  { id: '04', title: 'SUBMIT BOTH', desc: 'Working product + 3 best prompts. Both required.' },
  { id: '05', title: 'ORIGINAL WORK', desc: 'No pre-built templates or existing codebases.' },
  { id: '06', title: 'TEAM SIZE', desc: '2 to 4 members per team.' },
  { id: '07', title: 'TIME LIMIT', desc: '5 hours from problem reveal to submission.' },
  { id: '08', title: 'ONSPOT REG', desc: 'Available April 22 at the venue.' }
];

const TERMS = [
  { title: 'ELIGIBILITY', text: 'Open to all students with valid student ID. Teams of 2 to 4 members only.' },
  { title: 'CONDUCT', text: 'Respectful conduct required at all times. Cheating results in immediate disqualification.' },
  { title: 'AI USAGE', text: 'Only AI chat tools permitted. Manual coding and templates are disallowed.' },
  { title: 'SUBMISSIONS', text: 'Submit product and 3 prompts before timer ends. Late submissions not accepted.' },
  { title: 'INTELLECTUAL PROPERTY', text: 'Work remains property of the team. TERRATECH may showcase submitted work.' },
  { title: 'PRIZES', text: 'Judge decisions are final. TERRATECH may modify prizes without prior notice.' },
  { title: 'LIABILITY', text: 'TERRATECH not responsible for loss or damage. Participation at your own risk.' },
  { title: 'PRIVACY', text: 'Registration data used only for event coordination. Never shared with third parties.' }
];

const TICKER_ITEMS = ['PROMPTHON', 'APR 22 2026', '5 HOURS', 'AI ONLY', 'TERRATECH', 'BUILD WITH WORDS', 'WIN WITH PRECISION', 'REGISTER NOW →'];

const AccordionItem: React.FC<{ title: string; text: string }> = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-none" style={{ width: '100%', textAlign: 'center' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex flex-col items-center justify-center py-7 text-center group hover:text-amber-400 transition-colors duration-300 gap-3"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <span className="font-bold uppercase tracking-[0.25em] text-xs md:text-sm" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="material-symbols-outlined text-lg shrink-0">
          expand_more
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden" style={{ textAlign: 'center', width: '100%' }}
          >
            <p className="pb-6 text-sm font-light text-white/55 leading-loose tracking-wide text-center" style={{ textAlign: 'center', width: '100%' }}>{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── scroll-linked parallax wrapper ── */
function Para({ children, speed = 0.2 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [`${-speed * 50}%`, `${speed * 50}%`]);
  const y = useSpring(raw, { stiffness: 50, damping: 18, mass: 0.8 });
  return <div ref={ref} style={{ width: '100%', textAlign: 'center' }}><motion.div style={{ y, textAlign: 'center', width: '100%' }}>{children}</motion.div></div>;
}

/* ── fade + slide in on scroll ── */
const inView = (delay = 0, dir: 'up' | 'left' | 'right' = 'up') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -50 : dir === 'right' ? 50 : 0, y: dir === 'up' ? 32 : 0 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] } }
});

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroP, [0, 1], ['0%', '30%']);
  const heroOp = useTransform(heroP, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden relative">

      {/* ── Very subtle ambient orbs (Nathan Smith-style edge glow) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div animate={{ x: [0, 50, -40, 0], y: [0, -50, 40, 0] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/3 -left-1/4 w-[55vw] h-[55vw] rounded-full bg-amber-500/[0.03] blur-[160px]" />
        <motion.div animate={{ x: [0, -40, 50, 0], y: [0, 50, -40, 0] }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-amber-600/[0.03] blur-[180px]" />
        {/* Nathan Smith edge vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-24 flex justify-between items-center px-4 md:px-20 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <span className="font-black text-xl md:text-2xl tracking-[-0.03em] uppercase">PROMPTHON</span>
        <div className="flex items-center gap-10">
          <span className="hidden md:block text-[11px] font-mono font-bold tracking-[0.5em] uppercase text-white/30">APR 22 · 2026</span>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#F59E0B', color: '#000' }} whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-10 md:h-12 px-6 md:px-10 rounded-xl bg-white text-black text-sm md:text-base font-black tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            Register
          </motion.button>
        </div>
      </nav>

      {/* ──────────────── TICKER ──────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl overflow-hidden py-2.5">
        <div className="animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 mx-6 text-[10px] font-mono font-bold tracking-[0.35em] uppercase text-white/30 whitespace-nowrap">
              {item}
              <span className="w-1 h-1 rounded-full bg-amber-400/50 inline-block" />
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 pb-12 text-center">

        {/* ═══════════════════════════════════ HERO ═══════════════════════════════════ */}
        <section ref={heroRef} className="min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 md:px-16 pt-24 pb-20 relative overflow-hidden">

          <motion.div style={{ y: heroY, opacity: heroOp }} className="flex flex-col items-center w-full gap-10">
            {/* pill */}
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}
              className="inline-flex items-center gap-3 bg-white/[0.06] border border-white/[0.1] rounded-lg px-5 py-3"
            >
              <motion.div animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span className="text-xs md:text-sm font-mono font-bold tracking-[0.2em] uppercase text-amber-400">Registrations Open</span>
            </motion.div>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-[13vw] sm:text-[10.5vw] md:text-[9vw] uppercase tracking-[-0.03em] leading-[1.0] w-full max-w-6xl"
            >
              <span className="block">BUILD WITH</span>
              <span className="block">WORDS.</span>
              <span className="block text-amber-400">WIN WITH</span>
              <span className="block text-amber-400">PRECISION.</span>
            </motion.h1>

            {/* meta row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono font-bold tracking-[0.35em] uppercase text-white/35"
            >
              <span>5 HOURS</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>APR 22 2026</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>AI ONLY</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>TERRATECH</span>
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.9 }}
              whileHover={{ scale: 1.05, backgroundColor: '#F59E0B', color: '#000' }} whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#f5f5f5] text-[#0c1012] font-black text-sm md:text-2xl tracking-[0.15em] uppercase px-10 py-4 md:py-8 md:px-20 rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] w-full max-w-xs md:max-w-none md:w-auto"
            >
              REGISTER NOW →
            </motion.button>
          </motion.div>

          {/* Coordinator widget — bottom-center on mobile, top-right on desktop */}
          <CoordinatorWidget className="absolute bottom-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-24 md:right-16 z-10 flex flex-col items-center md:items-end gap-2" />

          {/* scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <div className="w-px h-12 bg-white/20 relative overflow-hidden rounded-full">
              <motion.div animate={{ y: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-full h-5 bg-white absolute" />
            </div>
          </motion.div>
        </section>

        {/* ════════ 1px BORDER ROW — basement grid ════════ */}
        <div className="flex justify-center gap-24 md:gap-40 border-t border-white/[0.06] w-full max-w-4xl mx-auto text-center" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
          {[{ v: 'APR 22', l: 'DATE' }, { v: '5 HRS', l: 'DURATION' }, { v: '2–4', l: 'TEAM SIZE' }].map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`flex flex-col items-center justify-center text-center [text-align:center] gap-2 py-12 md:py-20 ${i < 2 ? 'border-r border-white/[0.06]' : ''}`}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <span className="font-black text-2xl sm:text-4xl md:text-6xl tracking-tight" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{s.v}</span>
              <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.45em] uppercase text-white/30" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{s.l}</span>
            </motion.div>
          ))}
        </div>

        {/* ════════ THE EVENT ════════ */}
        <section className="border-t border-white/[0.06] px-6 md:px-20 py-32 md:py-56 w-full overflow-hidden text-center flex flex-col items-center" style={{ textAlign: 'center' }}>
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16 md:gap-28" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            {/* title */}
            <div className="w-full flex justify-center items-center text-center min-h-[30vh] md:min-h-0 mb-4 md:mb-16" style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <h2 className="font-black text-5xl md:text-8xl lg:text-9xl tracking-[-0.04em] uppercase leading-none text-center" style={{ textAlign: 'center', width: '100%' }}>
                <RevealText text="THE EVENT." />
              </h2>
            </div>
            {/* content */}
            <div className="flex flex-col items-center gap-16 max-w-4xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
              <Para speed={0.15}>
                <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white/55 leading-relaxed tracking-tight text-center" style={{ textAlign: 'center', width: '100%' }}>
                  PROMPTHON is a 5-hour hackathon where your prompts are your code. No manual coding. No templates. Just you, your team, and AI.
                </p>
              </Para>
              <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 text-sm md:text-base font-mono font-bold tracking-[0.45em] uppercase" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
                <span className="text-white/40" style={{ textAlign: 'center' }}>Venue — TBA</span>
                <span className="text-white/40" style={{ textAlign: 'center' }}>April 22, 2026</span>
                <span className="text-white/40" style={{ textAlign: 'center' }}>Onspot reg available</span>
                <span className="text-amber-500" style={{ textAlign: 'center' }}>By TERRATECH</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ HOW IT WORKS ════════ */}
        <section className="border-t border-white/[0.06] px-6 md:px-16 py-20 md:py-40 w-full text-center flex flex-col items-center" style={{ textAlign: 'center' }}>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-14 md:gap-24 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <div className="w-full flex justify-center items-center text-center min-h-[30vh] md:min-h-0 mb-4 md:mb-16" style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <h2 className="font-black text-4xl md:text-8xl tracking-[-0.03em] uppercase leading-none text-center" style={{ textAlign: 'center', width: '100%' }}>
                <RevealText text="HOW IT WORKS." />
              </h2>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto justify-items-center text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
              {[
                { num: '01', title: 'GET YOUR PROBLEM', desc: 'A random statement revealed at the start. No prior preparation allowed.' },
                { num: '02', title: 'BUILD WITH AI ONLY', desc: 'Use any AI tool. Zero manual coding. Everything must be prompted.' },
                { num: '03', title: 'SUBMIT', desc: 'Working product plus your 3 best prompts. Judges score both.' }
              ].map((step, i) => (
                <motion.div key={step.num}
                  variants={inView(i * 0.1, 'up')} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -6 }}
                  className="grid-border bg-white/[0.02] backdrop-blur-md rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center gap-8 text-center [text-align:center] group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 w-full"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
                >
                  <span className="font-black text-5xl md:text-7xl text-amber-500 leading-none font-mono" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{step.num}</span>
                  <div className="flex flex-col items-center gap-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                    <h3 className="font-black text-xl md:text-3xl tracking-[0.14em] uppercase group-hover:text-amber-500 transition-colors duration-300" style={{ textAlign: 'center', width: '100%' }}>{step.title}</h3>
                    <p className="text-base md:text-lg font-light text-white/50 leading-relaxed max-w-2xl" style={{ textAlign: 'center', width: '100%' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ HOW YOU WIN ════════ */}
        <section className="border-t border-white/[0.06] px-6 md:px-16 py-20 md:py-40 w-full text-center flex flex-col items-center" style={{ textAlign: 'center' }}>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-14 md:gap-24 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <div className="w-full flex justify-center items-center text-center min-h-[30vh] md:min-h-0 mb-4 md:mb-16" style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <h2 className="font-black text-4xl md:text-8xl tracking-[-0.03em] uppercase leading-none text-center" style={{ textAlign: 'center', width: '100%' }}>
                <RevealText text="HOW YOU WIN." />
              </h2>
            </div>

            {/* score bars */}
            <div className="flex flex-col gap-14 w-full max-w-2xl mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
              {[
                { label: 'PRODUCT FUNCTIONALITY', pct: 60 },
                { label: 'PROMPT QUALITY + CREATIVITY', pct: 40 }
              ].map((bar, i) => (
                <div key={bar.label} className="w-full flex flex-col items-center gap-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                  <div className="flex flex-col md:flex-row items-center text-center md:text-center gap-4 text-[11px] md:text-sm font-mono font-bold tracking-[0.35em] uppercase" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                    <span className="text-white/60" style={{ textAlign: 'center' }}>{bar.label}</span>
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.1 }} className="text-amber-500 md:ml-4" style={{ textAlign: 'center' }}>{bar.pct}%</motion.span>
                  </div>
                  <div className="w-full h-px bg-white/10 relative overflow-hidden">
                    <motion.div initial={{ width: 0, x: '-100%' }} whileInView={{ width: `${bar.pct}%`, x: '0%' }} viewport={{ once: true }}
                      transition={{ duration: 2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-0 left-0 right-0 mx-auto h-px bg-amber-500"
                      style={{ left: `${(100 - bar.pct) / 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 1px border grid — basement.studio style */}
            <div className="w-full border-t border-white/[0.06]" style={{ width: '100%' }}>
              <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-4xl mx-auto text-center" style={{ textAlign: 'center' }}>
                {[
                  { id: '01', title: 'FUNCTIONALITY', desc: 'Does it work and solve the problem?' },
                  { id: '02', title: 'PROMPT CRAFT', desc: 'Precise, creative, iterative instructions.' },
                  { id: '03', title: 'INNOVATION', desc: 'Did you push AI past the obvious answer?' }
                ].map((step, i) => (
                  <motion.div key={step.id}
                    variants={inView(i * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="grid-border bg-white/[0.015] backdrop-blur-xl rounded-3xl p-8 md:p-12 flex flex-col items-center text-center [text-align:center] gap-6 border border-white/[0.06] hover:bg-white/[0.03] transition-colors duration-500"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                  >
                    <span className="font-mono font-black text-sm md:text-base tracking-[0.4em] text-amber-500/60 uppercase" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{step.id}</span>
                    <h3 className="font-black text-2xl md:text-4xl tracking-tight uppercase leading-none" style={{ textAlign: 'center', width: '100%' }}>{step.title}</h3>
                    <p className="text-sm md:text-lg font-light text-white/40 leading-relaxed max-w-sm" style={{ textAlign: 'center', width: '100%' }}>{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ RULES ════════ */}
        <section className="border-t border-white/[0.06] px-6 md:px-16 py-24 md:py-48 w-full text-center flex flex-col items-center" style={{ textAlign: 'center' }}>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-14 md:gap-24 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <div className="w-full flex justify-center items-center text-center min-h-[30vh] md:min-h-0 mb-4 md:mb-16" style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <h2 className="font-black text-4xl md:text-8xl tracking-[-0.03em] uppercase leading-none text-center" style={{ textAlign: 'center', width: '100%' }}>
                <RevealText text="THE RULES." />
              </h2>
            </div>
            {/* basement.studio 1px border rows */}
            <div className="w-full max-w-4xl mx-auto border-t border-white/[0.06] justify-items-center text-center" style={{ width: '100%', textAlign: 'center' }}>
              {RULES.map((rule, i) => (
                <motion.div key={rule.id}
                   variants={inView(i * 0.06)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
                   className="flex flex-col items-center text-center [text-align:center] gap-6 py-10 md:py-14 border-b border-white/[0.06] group hover:bg-white/[0.02] transition-all duration-300 px-6"
                   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
                >
                  <span className="font-mono font-black text-sm md:text-base tracking-[0.4em] text-amber-500/50 group-hover:text-amber-500 transition-colors uppercase" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{rule.id}</span>
                  <span className="font-black text-2xl md:text-5xl tracking-tight uppercase group-hover:text-amber-500 transition-colors duration-300 leading-none" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{rule.title}</span>
                  <span className="text-sm md:text-xl font-light text-white/40 leading-relaxed max-w-2xl text-center" style={{ textAlign: 'center', display: 'block', width: '100%' }}>{rule.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ TERMS ════════ */}
        <section className="border-t border-white/[0.06] px-6 md:px-16 py-24 md:py-48 w-full text-center flex flex-col items-center" style={{ textAlign: 'center' }}>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-14 md:gap-20 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <div className="w-full flex justify-center items-center text-center min-h-[30vh] md:min-h-0 mb-4 md:mb-16" style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <h2 className="font-black text-4xl md:text-7xl tracking-[-0.03em] uppercase leading-none text-center" style={{ textAlign: 'center', width: '100%' }}>
                <RevealText text="TERMS & CONDITIONS." />
              </h2>
            </div>
            <motion.div variants={inView()} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid-border bg-white/[0.015] backdrop-blur-xl rounded-[2.5rem] px-8 py-10 md:px-16 md:py-14 w-full max-w-4xl mx-auto text-center [text-align:center] border border-white/[0.06]"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            >
              <div className="flex flex-col gap-2 text-center mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                {TERMS.map(t => <AccordionItem key={t.title} title={t.title} text={t.text} />)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════ REGISTER ════════ */}
        <section id="register" className="border-t border-white/[0.06] min-h-[95dvh] px-6 md:px-20 py-24 flex flex-col justify-center items-center text-center gap-0 relative overflow-hidden text-center">
          {/* READY? — massive parallax headline */}
          <FlipText
            className="font-black text-[30vw] sm:text-[26vw] md:text-[22vw] lg:text-[20vw] uppercase tracking-[-0.04em] leading-[0.7] text-amber-400 select-none mb-4 md:mb-6 w-full"
            duration={0.6}
            loop={true}
            delayBetweenWords={0.09}
          >
            READY?
          </FlipText>

          <motion.div variants={inView(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col items-center mx-auto text-center [text-align:center] gap-8 w-full max-w-2xl"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
          >
            <p className="text-sm md:text-xl font-light text-white/55 leading-loose tracking-widest uppercase max-w-md text-center md:text-center" style={{ textAlign: 'center', width: '100%' }}>
              Join PROMPTHON 2026. Build with AI. Win with precision.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#F59E0B', color: '#000' }} whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://forms.google.com/placeholder', '_blank')}
              className="bg-white text-[#0c1012] w-auto py-5 md:py-9 px-14 md:px-28 rounded-xl font-black tracking-[0.2em] text-base md:text-3xl uppercase shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              REGISTER YOUR TEAM →
            </motion.button>

            <p className="text-[10px] text-white/25 tracking-[0.35em] uppercase font-mono text-center md:text-center" style={{ textAlign: 'center', width: '100%' }}>
              Onspot registration available on the day
            </p>
          </motion.div>

          <footer className="absolute bottom-16 w-full px-6 flex flex-col items-center text-center md:text-center gap-1.5 opacity-20 text-[9px] font-mono tracking-[0.35em] font-bold uppercase" style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ textAlign: 'center', display: 'block', width: '100%' }}>© 2026 PROMPTHON — ORGANIZED BY TERRATECH</span>
          </footer>
        </section>

      </main>
    </div>
  );
}
