import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreVertical, Music2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SCENES } from '../types';

interface InstagramOverlayProps {
  currentTime: number;
  showOverlay: boolean;
  showSubtitles: boolean;
  isPlaying: boolean;
}

export const InstagramOverlay: React.FC<InstagramOverlayProps> = ({
  currentTime,
  showOverlay,
  showSubtitles,
  isPlaying,
}) => {
  // Find current scene and active subtitle
  const currentScene = SCENES.find(
    (s) => currentTime >= s.startTime && currentTime <= s.endTime
  ) || SCENES[0];

  const currentSubtitle = currentScene.subtitles.find(
    (sub) => currentTime >= sub.start && currentTime <= sub.end
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between">
      {/* Top Status Bar (Mock Phone Notch & Reels Header) */}
      {showOverlay && (
        <div className="px-5 pt-3 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight">Reels</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="text-cyan-400">9:16</span>
            <span className="text-slate-400">·</span>
            <span>45s</span>
          </div>
        </div>
      )}

      {/* Center Subtitles (Instagram Reels Pop-Up Style) */}
      {showSubtitles && currentSubtitle && (
        <div className="my-auto px-6 text-center">
          <motion.div
            key={currentSubtitle.text}
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-block px-4 py-2 rounded-xl bg-black/80 border border-purple-500/40 backdrop-blur-md shadow-2xl"
          >
            <p className="text-base sm:text-lg font-black tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {currentSubtitle.text.split(' ').map((word, i) => {
                const isHighlight =
                  word.toLowerCase().includes('serializer') ||
                  word.toLowerCase().includes('json') ||
                  word.toLowerCase().includes('model') ||
                  word.toLowerCase().includes('python');
                return (
                  <span
                    key={i}
                    className={`inline-block mr-1.5 ${
                      isHighlight
                        ? 'text-cyan-300 font-extrabold text-glow-cyan'
                        : 'text-amber-200'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </motion.div>
        </div>
      )}

      {/* Bottom Area: Creator handle, caption, audio track & Right Action Rail */}
      {showOverlay && (
        <div className="p-4 flex items-end justify-between gap-3 text-white drop-shadow-md">
          {/* Left Info Column */}
          <div className="flex-1 space-y-2 max-w-[78%]">
            {/* Account badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-white">
                  DJ
                </div>
              </div>
              <span className="font-bold text-xs flex items-center gap-1">
                django.devs
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              </span>
              <button className="px-2.5 py-0.5 rounded-full border border-white/30 text-[11px] font-semibold backdrop-blur-sm">
                Follow
              </button>
            </div>

            {/* Caption */}
            <p className="text-xs text-slate-200 line-clamp-2 leading-snug">
              What is a Serializer in Django REST Framework? 🐍 Transforms Python objects into clean JSON for your API. #python #django #drf
            </p>

            {/* Audio Track Ticker */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <Music2 className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">Django REST Framework Masterclass · Original Audio</span>
            </div>
          </div>

          {/* Right Action Rail */}
          <div className="flex flex-col items-center gap-4 shrink-0 pb-1">
            {/* Like */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Heart className="w-5 h-5 text-white hover:text-rose-500 transition-colors" />
              </div>
              <span className="text-[10px] font-semibold">24.8K</span>
            </div>

            {/* Comment */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-semibold">418</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Send className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-semibold">1.2K</span>
            </div>

            {/* Bookmark */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Bookmark className="w-5 h-5 text-purple-300" />
              </div>
              <span className="text-[10px] font-semibold">Save</span>
            </div>

            {/* Audio Disc Spinning */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-slate-700 bg-slate-950 p-1 flex items-center justify-center shadow-lg"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
