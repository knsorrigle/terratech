import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden min-h-screen flex flex-col">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-20 flex justify-between items-center px-6 md:px-20 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.05]">
        <span className="font-black text-xl tracking-[-0.03em] uppercase">TERRATECH</span>
        <span className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase text-white/30">APR 21 · 2026</span>
      </nav>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col items-center justify-center pt-20">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9px] font-mono font-bold tracking-[0.4em] uppercase text-amber-400/70 mb-10 md:mb-14"
        >
          Select Your Event
        </motion.p>

        {/* Cards */}
        <div className="w-full flex flex-col md:flex-row h-auto md:h-[72vh] max-w-[90vw] mx-auto border border-white/[0.06]">

          {/* LEFT — PROMPTHON */}
          <motion.button
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            onClick={() => navigate('/prompthon')}
            className="group relative flex-1 flex flex-col justify-between p-10 md:p-16 border-b md:border-b-0 md:border-r border-white/[0.06] bg-[#050505] hover:bg-white transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-left cursor-pointer overflow-hidden"
          >
            {/* hover bg fill */}
            <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

            <div className="relative z-10 flex flex-col gap-6 md:gap-10 h-full justify-between">
              {/* top */}
              <div className="flex flex-col gap-6">
                <span className="text-[9px] font-mono font-bold tracking-[0.4em] uppercase text-amber-400 group-hover:text-amber-600 transition-colors duration-500">
                  Intra-College · 5 Hours
                </span>
                <h2 className="font-black text-[13vw] md:text-[8vw] lg:text-[7vw] tracking-[-0.04em] leading-none uppercase text-white group-hover:text-black transition-colors duration-500">
                  PROMPTHON
                </h2>
                <p className="text-sm md:text-base font-light text-white/40 group-hover:text-black/50 transition-colors duration-500 leading-relaxed max-w-sm tracking-wide">
                  Build with AI only. No manual coding.<br />Prompts are your code.
                </p>
              </div>

              {/* bottom */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-[0.35em] uppercase text-white/25 group-hover:text-black/30 transition-colors duration-500">
                  Register →
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-black/20 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-black/30" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>

          {/* RIGHT — HACKLOOM 2.0 */}
          <motion.button
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            onClick={() => navigate('/hackloom')}
            className="group relative flex-1 flex flex-col justify-between p-10 md:p-16 bg-[#050505] hover:bg-white transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-left cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

            <div className="relative z-10 flex flex-col gap-6 md:gap-10 h-full justify-between">
              <div className="flex flex-col gap-6">
                <span className="text-[9px] font-mono font-bold tracking-[0.4em] uppercase text-amber-400 group-hover:text-amber-600 transition-colors duration-500">
                  Inter-College · 24 Hours
                </span>
                <h2 className="font-black text-[13vw] md:text-[8vw] lg:text-[7vw] tracking-[-0.04em] leading-none uppercase text-white group-hover:text-black transition-colors duration-500">
                  HACKLOOM<br />2.0
                </h2>
                <p className="text-sm md:text-base font-light text-white/40 group-hover:text-black/50 transition-colors duration-500 leading-relaxed max-w-sm tracking-wide">
                  All colleges welcome.<br />24 hours to build something real.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-[0.35em] uppercase text-white/25 group-hover:text-black/30 transition-colors duration-500">
                  Register →
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-black/20 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-black/30" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[90vw] mx-auto border-x border-b border-white/[0.06] flex items-center justify-between px-10 md:px-16 py-6"
        >
          <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-white/20">
            Two Events · One Day · Apr 21 2026
          </span>
          <div className="flex items-center gap-8 md:gap-12">
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-black text-lg md:text-2xl text-amber-400 tracking-tight leading-none">5 HRS</span>
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/20">Prompthon</span>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-black text-lg md:text-2xl text-amber-400 tracking-tight leading-none">24 HRS</span>
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/20">HackLoom</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
