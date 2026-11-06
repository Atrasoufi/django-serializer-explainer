import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Sparkles, Layers, Cpu } from 'lucide-react';

interface SceneProps {
  progress: number; // 0 to 1 for this scene
  time: number; // scene relative time in seconds (0 to 5)
}

export const Scene1Hook: React.FC<SceneProps> = ({ progress, time }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060813] flex flex-col justify-between p-6">
      {/* Background Image: Cinematic developer workspace with slow cinematic push-in */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.72] contrast-[1.15]"
        style={{
          backgroundImage: `url('/src/assets/images/workspace_cinematic_code_1793961963843.jpg')`,
        }}
        animate={{
          scale: [1.0, 1.08],
        }}
        transition={{
          duration: 5,
          ease: 'linear',
        }}
      />

      {/* Atmospheric Overlays: Deep navy vignette + purple/cyan neon lighting gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/75 to-[#080d24]/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060a1f]/40 to-[#030611]" />
      
      {/* Neon purple & cyan ambient backlights */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[110px] pointer-events-none" />

      {/* Top Header kicker & Series Tag */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-500/10"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-300">
            Django REST Framework
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-1.5 text-xs text-slate-400 font-mono"
        >
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>EPISODE 01</span>
        </motion.div>
      </div>

      {/* Center Hero: Dramatic "What is a Serializer?" reveal */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center px-2">
        {/* Floating holographic mini code preview badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mb-6 w-full max-w-[320px] rounded-xl bg-slate-950/85 border border-cyan-500/30 p-3.5 backdrop-blur-xl shadow-2xl shadow-cyan-950/50"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>serializers.py</span>
            </div>
          </div>
          
          <div className="text-left font-mono text-[11.5px] leading-relaxed text-slate-300">
            <span className="text-purple-400 font-medium">class</span>{' '}
            <span className="text-cyan-300 font-semibold">ArticleSerializer</span>
            <span className="text-slate-400">(</span>
            <span className="text-emerald-400">serializers.ModelSerializer</span>
            <span className="text-slate-400">):</span>
            <div className="pl-4 text-slate-400">
              <span className="text-indigo-400">fields</span> = [<span className="text-amber-300">&apos;id&apos;</span>, <span className="text-amber-300">&apos;title&apos;</span>, <span className="text-amber-300">&apos;slug&apos;</span>]
            </div>
          </div>
        </motion.div>

        {/* Primary Title with Glow and Kinetic Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>CORE BACKEND ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.08] text-balance">
            What is a{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent text-glow-cyan">
              Serializer
            </span>
            ?
          </h1>

          <p className="text-slate-300 text-sm md:text-base font-normal max-w-[320px] mx-auto text-balance leading-snug">
            The vital bridge between <span className="text-cyan-300 font-medium">Python Objects</span> and <span className="text-purple-300 font-medium">REST API JSON</span>.
          </p>
        </motion.div>
      </div>

      {/* Bottom Hook Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 w-full"
      >
        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">The 45s Breakdown</div>
              <div className="text-[11px] text-slate-400">Database ➔ ORM ➔ Serializer ➔ Client</div>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-cyan-400">
            01 / 05
          </div>
        </div>
      </motion.div>
    </div>
  );
};
