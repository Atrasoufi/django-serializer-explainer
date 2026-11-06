import React from 'react';
import { motion } from 'motion/react';
import { Box, RefreshCw, FileCode, ArrowRight, Check, Zap, Cpu } from 'lucide-react';

interface SceneProps {
  progress: number; // 0 to 1 for Scene 3 (15s to 25s)
  time: number; // scene relative time in seconds (0 to 10)
}

export const Scene3Pipeline: React.FC<SceneProps> = ({ progress, time }) => {
  // Timing milestones:
  // 0-3s: Introduce flow: Python Object -> Serializer -> JSON
  // 3-7s: Reactor active, fields transforming (datetime to ISO string, nested author extraction)
  // 7-10s: Completed validated JSON ready for HTTP wire
  const stage = time < 3.0 ? 1 : time < 7.0 ? 2 : 3;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050816] flex flex-col justify-between p-5 text-slate-100">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/25 via-[#050816]/90 to-[#03050c]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300">
            <RefreshCw className={`w-4 h-4 ${stage === 2 ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase">
              Step 2: The Core Pipeline
            </div>
            <div className="text-[11px] text-slate-400">Transforming Data Types</div>
          </div>
        </div>
        <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
          Scene 03
        </span>
      </div>

      {/* Flow Architecture Diagram (Python Object -> Serializer -> JSON) */}
      <div className="relative z-10 my-auto flex flex-col gap-3.5 py-1">
        {/* Flow Header Badge Pills */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono">
          <span className="text-purple-300 font-medium">Python Object</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-cyan-300 font-bold bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800">
            Serializer
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-300 font-medium">JSON String</span>
        </div>

        {/* 1. Left / Top: Python Object Card */}
        <motion.div
          animate={{
            borderColor: stage === 1 ? 'rgba(168, 85, 247, 0.6)' : 'rgba(51, 65, 85, 0.6)',
            scale: stage === 1 ? 1.02 : 1,
          }}
          className="rounded-xl bg-slate-950/90 border border-slate-800 p-3 shadow-md relative"
        >
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="font-semibold text-purple-300 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-purple-400" />
              1. Python Model Object
            </span>
            <span className="text-[10px] font-mono text-slate-400">Complex Memory Instance</span>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-2 font-mono text-[10.5px] text-slate-300 leading-tight">
            <div>article.<span className="text-purple-400">title</span> = <span className="text-amber-200">&apos;Mastering DRF&apos;</span></div>
            <div>article.<span className="text-purple-400">created</span> = <span className="text-rose-300">datetime(2026, 4, 18)</span></div>
            <div>article.<span className="text-purple-400">author</span> = <span className="text-indigo-300">&lt;User: &apos;alex&apos;&gt;</span></div>
          </div>
        </motion.div>

        {/* 2. Middle: The Serializer Engine (Reactor) */}
        <motion.div
          animate={{
            boxShadow: stage >= 2 
              ? '0 0 25px -4px rgba(6, 182, 212, 0.35)' 
              : '0 0 0px 0px transparent',
          }}
          className="rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/50 p-3 shadow-lg relative overflow-hidden"
        >
          {/* Subtle animated scanline / pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />

          <div className="relative z-10 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">
                2. Django REST Serializer
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
              Active Transformer
            </span>
          </div>

          {/* Core Serializer Tasks */}
          <div className="relative z-10 grid grid-cols-2 gap-2 text-[10.5px]">
            <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-slate-300">
              <Check className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Extracts fields</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Coerces datetime to ISO</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-slate-300">
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Serializes nested FK</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-slate-300">
              <Check className="w-3 h-3 text-purple-400 shrink-0" />
              <span>Validates rules</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Right / Bottom: Ready JSON String */}
        <motion.div
          animate={{
            borderColor: stage === 3 ? 'rgba(52, 211, 153, 0.6)' : 'rgba(51, 65, 85, 0.6)',
            scale: stage === 3 ? 1.02 : 1,
          }}
          className="rounded-xl bg-slate-950/90 border border-slate-800 p-3 shadow-md relative"
        >
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              3. Serialized JSON Payload
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
              HTTP Standard
            </span>
          </div>

          <div className="bg-slate-900/90 rounded-lg p-2 font-mono text-[10.5px] leading-relaxed text-slate-300 border border-slate-800">
            <span className="text-slate-500">&#123;</span>
            <div className="pl-3">
              <div><span className="text-cyan-300">&quot;id&quot;</span>: <span className="text-purple-300">101</span>,</div>
              <div><span className="text-cyan-300">&quot;title&quot;</span>: <span className="text-amber-200">&quot;Mastering DRF&quot;</span>,</div>
              <div><span className="text-cyan-300">&quot;author&quot;</span>: <span className="text-amber-200">&quot;alex&quot;</span>,</div>
              <div><span className="text-cyan-300">&quot;created_at&quot;</span>: <span className="text-emerald-300">&quot;2026-04-18T12:00:00Z&quot;</span></div>
            </div>
            <span className="text-slate-500">&#125;</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Educational Callout */}
      <div className="relative z-10 pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-medium text-cyan-200">
            Python Dict ➔ Byte Stream ➔ HTTP Response
          </span>
        </div>
        <span className="font-mono text-slate-500">15s - 25s</span>
      </div>
    </div>
  );
};
