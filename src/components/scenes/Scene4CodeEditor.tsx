import React from 'react';
import { motion } from 'motion/react';
import { Code2, Terminal, Check, Sparkles } from 'lucide-react';

interface SceneProps {
  progress: number; // 0 to 1 for Scene 4 (25s to 35s)
  time: number; // scene relative time in seconds (0 to 10)
}

export const Scene4CodeEditor: React.FC<SceneProps> = ({ progress, time }) => {
  // Focus highlights based on time:
  // 0-3s: ModelSerializer inheritance
  // 3-6s: Custom field serialization (author_name)
  // 6-10s: Meta class configuration + serializer output
  const activeSection = time < 3.2 ? 'class' : time < 6.8 ? 'field' : 'meta';

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060918] flex flex-col justify-between p-4 text-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-16 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-16 w-80 h-80 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase">
              Step 3: The Python Code
            </div>
            <div className="text-[11px] text-slate-400">serializers.ModelSerializer</div>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
          Scene 04
        </span>
      </div>

      {/* Realistic VS Code Window */}
      <div className="relative z-10 my-auto rounded-xl bg-[#090d1f] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col">
        {/* Editor Top Bar & Tabs */}
        <div className="bg-[#0b1129] px-3 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[11px] text-slate-500 font-mono">articles/</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090d1f] border-t-2 border-t-cyan-400 border-x border-slate-800 text-[11px] font-mono text-cyan-300">
              <span className="text-purple-400">py</span>
              <span>serializers.py</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">models.py</span>
          </div>
        </div>

        {/* Code Body with Line Numbers & Real Syntax Highlighting */}
        <div className="p-3 font-mono text-[11.5px] leading-relaxed text-slate-300 overflow-x-auto">
          {/* Line 1 */}
          <div className="flex items-start">
            <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">1</span>
            <div>
              <span className="text-purple-400">from</span> rest_framework <span className="text-purple-400">import</span> serializers
            </div>
          </div>

          {/* Line 2 */}
          <div className="flex items-start">
            <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">2</span>
            <div>
              <span className="text-purple-400">from</span> .models <span className="text-purple-400">import</span> Article
            </div>
          </div>

          {/* Line 3 (Empty) */}
          <div className="flex items-start">
            <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">3</span>
            <div>&nbsp;</div>
          </div>

          {/* Line 4-6: Class declaration */}
          <motion.div 
            animate={{
              backgroundColor: activeSection === 'class' ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
            }}
            className="rounded px-1 -mx-1"
          >
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">4</span>
              <div>
                <span className="text-purple-400 font-bold">class</span>{' '}
                <span className="text-cyan-300 font-bold">ArticleSerializer</span>
                <span className="text-slate-400">(</span>
                <span className="text-emerald-300">serializers.ModelSerializer</span>
                <span className="text-slate-400">):</span>
              </div>
            </div>
          </motion.div>

          {/* Line 5-7: Custom Field */}
          <motion.div 
            animate={{
              backgroundColor: activeSection === 'field' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
            }}
            className="rounded px-1 -mx-1 my-0.5"
          >
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">5</span>
              <div className="pl-4">
                <span className="text-amber-200">author_name</span> = serializers.ReadOnlyField(
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">6</span>
              <div className="pl-8">
                source=<span className="text-emerald-300">&apos;author.username&apos;</span>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">7</span>
              <div className="pl-4">)</div>
            </div>
          </motion.div>

          {/* Line 8-15: Meta Class */}
          <motion.div 
            animate={{
              backgroundColor: activeSection === 'meta' ? 'rgba(52, 211, 153, 0.12)' : 'transparent',
            }}
            className="rounded px-1 -mx-1"
          >
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">8</span>
              <div className="pl-4">
                <span className="text-purple-400 font-bold">class</span>{' '}
                <span className="text-amber-300 font-semibold">Meta</span>:
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">9</span>
              <div className="pl-8">
                model = <span className="text-cyan-300">Article</span>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 text-slate-600 select-none text-right pr-3 text-[10px]">10</span>
              <div className="pl-8">
                fields = [<span className="text-emerald-300">&apos;id&apos;</span>, <span className="text-emerald-300">&apos;title&apos;</span>, <span className="text-emerald-300">&apos;author_name&apos;</span>]
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Context Explanation Card */}
        <div className="bg-[#070b1a] px-3.5 py-2 border-t border-slate-800 text-xs">
          {activeSection === 'class' && (
            <div className="flex items-center gap-2 text-cyan-300">
              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span><strong>ModelSerializer:</strong> Automatically inspects Django model schema</span>
            </div>
          )}
          {activeSection === 'field' && (
            <div className="flex items-center gap-2 text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span><strong>ReadOnlyField:</strong> Flattens nested user data directly to JSON</span>
            </div>
          )}
          {activeSection === 'meta' && (
            <div className="flex items-center gap-2 text-emerald-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>Meta Configuration:</strong> Declares model & whitelisted fields</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini Interactive REPL Bar */}
      <div className="relative z-10 rounded-xl bg-slate-950 border border-slate-800 p-2.5 font-mono text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5 text-slate-500 mb-1 text-[10px]">
          <Terminal className="w-3 h-3 text-purple-400" />
          <span>Django Shell Output</span>
        </div>
        <div className="text-cyan-300">
          &gt;&gt;&gt; serializer = ArticleSerializer(article)
        </div>
        <div className="text-emerald-400 flex items-center justify-between">
          <span>&gt;&gt;&gt; serializer.data</span>
          <span className="text-[10px] text-slate-500">dict ➔ JSON ready</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
        <span>Clean code, zero manual dictionary parsing</span>
        <span className="font-mono text-slate-500">25s - 35s</span>
      </div>
    </div>
  );
};
