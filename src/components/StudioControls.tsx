import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Captions,
  Smartphone,
  Eye,
  SkipBack,
  SkipForward,
  Download,
  Sparkles,
} from 'lucide-react';
import { SCENES, TOTAL_DURATION } from '../types';

interface StudioControlsProps {
  currentTime: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  showOverlay: boolean;
  onToggleOverlay: () => void;
  showSubtitles: boolean;
  onToggleSubtitles: () => void;
  viewMode: 'mockup' | 'fullscreen';
  onToggleViewMode: () => void;
  onRecordDownload?: () => void;
  isRecording?: boolean;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  currentTime,
  isPlaying,
  onTogglePlay,
  onSeek,
  onReset,
  speed,
  onSpeedChange,
  isMuted,
  onToggleMute,
  voiceEnabled,
  onToggleVoice,
  showOverlay,
  onToggleOverlay,
  showSubtitles,
  onToggleSubtitles,
  viewMode,
  onToggleViewMode,
  onRecordDownload,
  isRecording = false,
}) => {
  // Format seconds to mm:ss.f
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
  };

  const currentScene =
    SCENES.find((s) => currentTime >= s.startTime && currentTime <= s.endTime) ||
    SCENES[0];

  return (
    <div className="w-full bg-[#080d20]/90 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
      {/* 1. Timeline Scrubber & Scene Markers */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-bold">
              {formatTime(currentTime)}
            </span>
            <span className="text-slate-500">/</span>
            <span className="font-mono text-slate-400">
              {formatTime(TOTAL_DURATION)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-300">
              {currentScene.name}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60">
              Scene 0{currentScene.id}
            </span>
          </div>
        </div>

        {/* Interactive Scrub Range */}
        <div className="relative py-2">
          {/* Visual Scene Blocks on Timeline Track */}
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-2 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800">
            {SCENES.map((scene) => {
              const width =
                ((scene.endTime - scene.startTime) / TOTAL_DURATION) * 100;
              const isPast = currentTime >= scene.endTime;
              const isCurrent =
                currentTime >= scene.startTime && currentTime < scene.endTime;

              return (
                <div
                  key={scene.id}
                  style={{ width: `${width}%` }}
                  className={`h-full border-r border-slate-800/80 transition-colors ${
                    isCurrent
                      ? 'bg-purple-900/60'
                      : isPast
                      ? 'bg-slate-800/80'
                      : 'bg-slate-950/80'
                  }`}
                  title={`${scene.name} (${scene.startTime}s - ${scene.endTime}s)`}
                />
              );
            })}
          </div>

          {/* Active progress fill */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />

          {/* Actual slider input */}
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION}
            step={0.05}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="relative z-10 w-full h-4 opacity-0 cursor-pointer"
          />
        </div>

        {/* Scene Jump Pills */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {SCENES.map((scene) => {
            const isActive =
              currentTime >= scene.startTime && currentTime <= scene.endTime;
            return (
              <button
                key={scene.id}
                onClick={() => onSeek(scene.startTime)}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-mono transition-all text-center truncate ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-200 font-bold shadow-sm'
                    : 'bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                0{scene.id} · {scene.startTime}s
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Playback Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
        {/* Play/Pause/Skip Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            title="Restart video"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            title="Back 5s"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-950/50'
                : 'bg-gradient-to-r from-cyan-400 to-purple-500 hover:brightness-110 text-slate-950 shadow-cyan-950/60'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Reel</span>
              </>
            )}
          </button>

          <button
            onClick={() => onSeek(Math.min(TOTAL_DURATION, currentTime + 5))}
            title="Forward 5s"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {[0.5, 0.75, 1, 1.25].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
                speed === s
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Audio & Visual Toggles */}
        <div className="flex items-center gap-1.5">
          {/* Mute Audio SFX */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className={`p-2 rounded-xl border transition-colors ${
              !isMuted
                ? 'bg-purple-950/80 border-purple-500/40 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Voice Narration */}
          <button
            onClick={onToggleVoice}
            title={voiceEnabled ? 'Disable Voiceover' : 'Enable Voiceover'}
            className={`p-2 rounded-xl border transition-colors ${
              voiceEnabled
                ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Subtitles */}
          <button
            onClick={onToggleSubtitles}
            title="Toggle Instagram Pop-up Captions"
            className={`p-2 rounded-xl border transition-colors ${
              showSubtitles
                ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <Captions className="w-4 h-4" />
          </button>

          {/* Instagram UI Overlay */}
          <button
            onClick={onToggleOverlay}
            title="Toggle Instagram App UI Overlay"
            className={`p-2 rounded-xl border transition-colors ${
              showOverlay
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Phone Mockup vs Raw Frame */}
          <button
            onClick={onToggleViewMode}
            title="Toggle Smartphone Mockup Bezel"
            className={`p-2 rounded-xl border transition-colors ${
              viewMode === 'mockup'
                ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Export / Record Action */}
          {onRecordDownload && (
            <button
              onClick={onRecordDownload}
              disabled={isRecording}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRecording ? 'Capturing...' : 'Download'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
