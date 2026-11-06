import React from 'react';
import { motion } from 'motion/react';
import { Database, ArrowDown, AlertTriangle, CheckCircle2, Box, Sparkles } from 'lucide-react';

interface SceneProps {
  progress: number; // 0 to 1 for Scene 2 (5s to 15s)
  time: number; // scene relative time in seconds (0 to 10)
}

export const Scene2Database: React.FC<SceneProps> = ({ progress, time }) => {
  // Step triggers based on time:
  // 0-3s: DB & Model setup
  // 3-6s: Query execution and data retrieval
  // 6-10s: Python object created + "Why can't we send it directly?" tension
  const showQuery = time >= 2.0;
  const showObject = time >= 4.5;
  const showFriction = time >= 7.5;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060919] flex flex-col justify-between p-5 text-slate-100">
      {/* Background Server/Data Center image softened */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[2px]"
        style={{ backgroundImage: `url('/src/assets/images/server_database_matrix_1793961963901.jpg')` }}
      />
      {/* Dark gradient & atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060919]/90 via-[#070b1e]/95 to-[#04060e]" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase">
              Step 1: The Database & ORM
            </div>
            <div className="text-[11px] text-slate-400">PostgreSQL ➔ Django Model</div>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
          Scene 02
        </span>
      </div>

      {/* Main Flow Canvas */}
      <div className="relative z-10 my-auto flex flex-col gap-3 py-2">
        {/* 1. Database Layer: Relational PostgreSQL Table */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-slate-950/80 border border-slate-800 p-3 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>PostgreSQL Database</span>
              <span className="text-[10px] text-slate-500 font-mono">(&quot;articles&quot; table)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </span>
          </div>

          {/* Mini Data Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-slate-900/60 text-[10.5px] font-mono">
            <div className="grid grid-cols-4 bg-slate-800/60 p-1.5 text-slate-400 font-medium border-b border-slate-800">
              <div>id</div>
              <div className="col-span-2">title</div>
              <div>author_id</div>
            </div>
            <motion.div 
              className={`grid grid-cols-4 p-1.5 transition-colors duration-500 ${
                showQuery ? 'bg-cyan-500/20 text-cyan-200 font-medium' : 'text-slate-300'
              }`}
            >
              <div>101</div>
              <div className="col-span-2 truncate">Mastering DRF API</div>
              <div>42</div>
            </motion.div>
          </div>
        </motion.div>

        {/* 2. Django ORM Query Beam Animation */}
        <div className="flex flex-col items-center justify-center my-1 relative">
          <motion.div
            animate={{
              y: showQuery ? [0, 8, 0] : 0,
              opacity: showQuery ? 1 : 0.4,
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-1 text-[11px] font-mono font-medium text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/40 shadow-sm shadow-purple-500/20"
          >
            <span>Article.objects.get(id=101)</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>

          {/* Particle data pulse traveling down */}
          {showQuery && (
            <motion.div
              initial={{ top: -4, opacity: 0 }}
              animate={{ top: 28, opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeIn' }}
              className="absolute w-2 h-2 rounded-full bg-cyan-400 blur-[1px] shadow-[0_0_10px_#22d3ee]"
            />
          )}
        </div>

        {/* 3. In-Memory Python Object */}
        {showObject ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-xl bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border border-purple-500/40 p-3.5 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
                <Box className="w-4 h-4 text-purple-400" />
                <span>Python Model Instance</span>
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-900/40 px-2 py-0.5 rounded border border-purple-700/50">
                In-Memory RAM
              </span>
            </div>

            <div className="bg-slate-950/90 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 space-y-1 border border-purple-900/30">
              <div className="text-slate-400">
                &lt;<span className="text-purple-300 font-semibold">Article</span> object at <span className="text-slate-500">0x7f9a2b</span>&gt;
              </div>
              <div className="pl-2 border-l border-purple-500/30 space-y-0.5 text-[10.5px]">
                <div>• id: <span className="text-cyan-300">101</span></div>
                <div>• title: <span className="text-amber-200">&apos;Mastering DRF API&apos;</span></div>
                <div>• date: <span className="text-emerald-300">datetime.datetime(...)</span></div>
                <div>• author: <span className="text-indigo-300">&lt;User: &apos;alex&apos;&gt;</span></div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-28 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-500 font-mono">
            Fetching model instance...
          </div>
        )}

        {/* 4. The Critical Problem Callout (Appears at 7.5s) */}
        {showFriction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 backdrop-blur-md"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-rose-200">The HTTP Problem</div>
                <div className="text-[11px] text-rose-300/90 leading-tight mt-0.5">
                  Web browsers & mobile apps <span className="font-semibold underline">cannot</span> read raw Python memory objects!
                </div>
                <div className="mt-1.5 font-mono text-[10px] text-rose-400 bg-rose-950/80 px-2 py-1 rounded border border-rose-800/40">
                  TypeError: Article is not JSON serializable
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="relative z-10 pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Django ORM retrieves data as Python objects</span>
        </div>
        <span className="font-mono text-slate-500">5s - 15s</span>
      </div>
    </div>
  );
};
