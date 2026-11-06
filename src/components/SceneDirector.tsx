import React from 'react';
import { SCENES } from '../types';
import { Play, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface SceneDirectorProps {
  currentTime: number;
  onJumpToScene: (time: number) => void;
}

export const SceneDirector: React.FC<SceneDirectorProps> = ({
  currentTime,
  onJumpToScene,
}) => {
  return (
    <div className="w-full bg-[#080d20]/90 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-col gap-3">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide uppercase">
              Reel Director & Storyboard
            </div>
            <div className="text-[11px] text-slate-400">45-Second Timeline Architecture</div>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
          5 Scenes · 9:16
        </span>
      </div>

      {/* Scene Cards List */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {SCENES.map((scene) => {
          const isActive =
            currentTime >= scene.startTime && currentTime < scene.endTime;
          const isCompleted = currentTime >= scene.endTime;

          return (
            <div
              key={scene.id}
              onClick={() => onJumpToScene(scene.startTime)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border-purple-500/60 shadow-lg ring-1 ring-purple-500/40'
                  : isCompleted
                  ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 opacity-80'
                  : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{scene.id}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {scene.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-mono text-slate-400">
                    {scene.startTime}s - {scene.endTime}s
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      LIVE
                    </span>
                  )}
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
              </div>

              {/* Tagline */}
              <div className="text-xs text-cyan-200/90 font-medium pl-7">
                {scene.tagline}
              </div>

              {/* Narration Script */}
              <div className="text-[11px] text-slate-400 pl-7 mt-1 italic leading-relaxed border-l border-slate-800 ml-2">
                &ldquo;{scene.narratorScript}&rdquo;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
