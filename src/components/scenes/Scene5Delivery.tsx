import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Globe, Bookmark, Heart, Share2, Sparkles, Database, RefreshCw } from 'lucide-react';

interface SceneProps {
  progress: number; // 0 to 1 for Scene 5 (35s to 45s)
  time: number; // scene relative time in seconds (0 to 10)
}

export const Scene5Delivery: React.FC<SceneProps> = ({ progress, time }) => {
  // Phase 1 (0 to 4s): API 200 OK + Mobile App receives & renders JSON
  // Phase 2 (4 to 10s): Grand Golden Rule punchline + Follow/Save outro
  const isPunchline = time >= 4.0;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#040612] flex flex-col justify-between p-5 text-slate-100">
      {/* Background neon flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase">
              Step 4: Client Delivery
            </div>
            <div className="text-[11px] text-slate-400">HTTP 200 OK ➔ UI Render</div>
          </div>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
          Scene 05
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2 w-full">
        {!isPunchline ? (
          /* Sub-scene A: API Response & Mobile Client UI */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-3"
          >
            {/* HTTP Request Header Badge */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-cyan-500 text-slate-950 px-2 py-0.5 rounded">
                    GET
                  </span>
                  <span className="text-slate-300">/api/v1/articles/101/</span>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  200 OK
                </span>
              </div>
            </div>

            {/* Mobile Client App Interface */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 p-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                  <span>iOS / Web Client</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">JSON Parsed</span>
              </div>

              {/* Rendered Article Card inside the client app */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                    Django API
                  </span>
                  <span className="text-[10px] text-slate-500">Just now</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Mastering DRF API
                </h3>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-900 text-xs text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-300 text-[10px] font-bold">
                    A
                  </div>
                  <span>By alex</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Valid JSON Payload</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Sub-scene B: The Grand Golden Rule Punchline */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center space-y-5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE GOLDEN RULE</span>
            </div>

            {/* The Final Punchline Box */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0a0d24] to-slate-950 border border-purple-500/40 p-5 shadow-2xl relative">
              <div className="space-y-4">
                {/* Rule Part 1: Model */}
                <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-mono text-cyan-400 font-bold">Model</div>
                    <div className="text-sm font-semibold text-white">Stores data in database</div>
                  </div>
                </div>

                {/* Rule Part 2: Serializer */}
                <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-slate-950/70 border border-purple-500/30">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-mono text-purple-400 font-bold">Serializer</div>
                    <div className="text-sm font-semibold text-white">Transforms and validates data</div>
                  </div>
                </div>
              </div>

              {/* Bold Quotation Punchline */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-slate-300 text-balance">
                &ldquo;Model stores data. Serializer transforms &amp; validates data.&rdquo;
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-300">
                <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                <span>Save Reel</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-300">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Like & Share</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Django REST Framework Essentials</span>
        <span className="font-mono text-cyan-400">35s - 45s</span>
      </div>
    </div>
  );
};
