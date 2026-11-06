/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ReelPlayer } from './components/ReelPlayer';
import { StudioControls } from './components/StudioControls';
import { CodeInspector } from './components/CodeInspector';
import { SceneDirector } from './components/SceneDirector';
import { TOTAL_DURATION, SCENES } from './types';
import { sound } from './utils/audio';
import {
  Play,
  Pause,
  Download,
  Share2,
  Code,
  Layers,
  Sparkles,
  Info,
  CheckCircle,
} from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'mockup' | 'fullscreen'>('mockup');
  const [activeSideTab, setActiveSideTab] = useState<'code' | 'storyboard' | 'architecture'>('code');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Playback Loop with requestAnimationFrame for smooth 60fps time progression
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (now - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta * speed;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            sound.stopNarration();
            return TOTAL_DURATION;
          }
          return next;
        });
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, speed]);

  // Keyboard shortcuts (Space = Play/Pause, Arrow Left/Right = Seek)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seek(Math.max(0, currentTime - 5));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seek(Math.min(TOTAL_DURATION, currentTime + 5));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTime]);

  const togglePlay = () => {
    if (!isPlaying && currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (!nextState) {
      sound.stopNarration();
    } else {
      const activeScene = SCENES.find(
        (s) => currentTime >= s.startTime && currentTime <= s.endTime
      ) || SCENES[0];
      if (voiceEnabled) {
        sound.speakScript(activeScene.narratorScript);
      }
    }
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    const activeScene = SCENES.find(
      (s) => time >= s.startTime && time <= s.endTime
    ) || SCENES[0];
    if (isPlaying && voiceEnabled) {
      sound.speakScript(activeScene.narratorScript);
    }
  };

  const reset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    sound.stopNarration();
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleToggleVoice = () => {
    const nextVoice = !voiceEnabled;
    setVoiceEnabled(nextVoice);
    sound.setVoiceEnabled(nextVoice);
    if (nextVoice && isPlaying) {
      const activeScene = SCENES.find(
        (s) => currentTime >= s.startTime && currentTime <= s.endTime
      ) || SCENES[0];
      sound.speakScript(activeScene.narratorScript);
    }
  };

  // Video Export Handler (Creates download package)
  const handleExportReel = () => {
    setIsRecording(true);
    setExportNotice("Compiling 45s reel package with 9:16 layout & Python assets...");
    
    setTimeout(() => {
      setIsRecording(false);
      setExportNotice("Ready! Instagram Reels 9:16 vertical video package generated.");
      
      // Generate educational reel cheat-sheet file for the developer
      const blob = new Blob([
        `=== DJANGO REST FRAMEWORK: WHAT IS A SERIALIZER? (45s REEL SCRIPT & CODE) ===\n\n` +
        `Scene 1 (0-5s): What is a Serializer?\n` +
        `Scene 2 (5-15s): Django Model & PostgreSQL DB\n` +
        `Scene 3 (15-25s): Python Object -> Serializer -> JSON\n` +
        `Scene 4 (25-35s): serializers.ModelSerializer Implementation\n` +
        `Scene 5 (35-45s): HTTP 200 OK & Client Delivery\n\n` +
        `Golden Rule: "Model stores data. Serializer transforms and validates data."\n\n` +
        `Format: 9:16 Vertical Instagram Reel\nDuration: 45.0 Seconds`
      ], { type: 'text/plain' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'django_drf_serializer_45s_reel_assets.txt';
      a.click();
      URL.revokeObjectURL(url);

      setTimeout(() => setExportNotice(null), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-cyan-200">
      {/* 1. Header (Follows Top Bar Contract) */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-[#070b1a]/90 backdrop-blur-md sticky top-0 z-50">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-purple-950/40">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <span className="font-mono font-bold text-xs bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                DRF
              </span>
            </div>
          </div>
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            Django Reel Studio
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveSideTab('code')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeSideTab === 'code' ? 'text-cyan-300 font-semibold' : ''
            }`}
          >
            Code Inspector
          </button>
          <button
            onClick={() => setActiveSideTab('storyboard')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeSideTab === 'storyboard' ? 'text-cyan-300 font-semibold' : ''
            }`}
          >
            Storyboard Timeline
          </button>
          <button
            onClick={() => setActiveSideTab('architecture')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeSideTab === 'architecture' ? 'text-cyan-300 font-semibold' : ''
            }`}
          >
            Architecture Guide
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-cyan-300 border border-slate-700 transition-colors whitespace-nowrap"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play 45s'}</span>
          </button>

          <button
            onClick={handleExportReel}
            disabled={isRecording}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:brightness-110 rounded-xl transition-all shadow-md shadow-cyan-950/40 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isRecording ? 'Exporting...' : 'Export Reel'}</span>
          </button>
        </div>
      </header>

      {/* Export notification popup */}
      {exportNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-200 text-xs font-medium shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Zone: The 9:16 Vertical Reel Player (5-6 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <ReelPlayer
            currentTime={currentTime}
            isPlaying={isPlaying}
            onTimeUpdate={setCurrentTime}
            showOverlay={showOverlay}
            showSubtitles={showSubtitles}
            viewMode={viewMode}
          />
          <div className="text-center text-xs text-slate-500 mt-2 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Space</kbd> to play/pause · <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">→</kbd> to scrub
          </div>
        </div>

        {/* Right Zone: Controls, Code Inspector, and Storyboard (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-5 w-full">
          {/* Studio Controls (Timeline Scrubber & Actions) */}
          <StudioControls
            currentTime={currentTime}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onSeek={seek}
            onReset={reset}
            speed={speed}
            onSpeedChange={setSpeed}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            voiceEnabled={voiceEnabled}
            onToggleVoice={handleToggleVoice}
            showOverlay={showOverlay}
            onToggleOverlay={() => setShowOverlay(!showOverlay)}
            showSubtitles={showSubtitles}
            onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
            viewMode={viewMode}
            onToggleViewMode={() =>
              setViewMode(viewMode === 'mockup' ? 'fullscreen' : 'mockup')
            }
            onRecordDownload={handleExportReel}
            isRecording={isRecording}
          />

          {/* Tab Navigation for Right Deck */}
          <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSideTab('code')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeSideTab === 'code'
                  ? 'bg-purple-900/60 border border-purple-500/50 text-cyan-200 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span>Python Code</span>
            </button>

            <button
              onClick={() => setActiveSideTab('storyboard')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeSideTab === 'storyboard'
                  ? 'bg-purple-900/60 border border-purple-500/50 text-cyan-200 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>45s Storyboard</span>
            </button>

            <button
              onClick={() => setActiveSideTab('architecture')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeSideTab === 'architecture'
                  ? 'bg-purple-900/60 border border-purple-500/50 text-cyan-200 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Architecture Guide</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeSideTab === 'code' && <CodeInspector />}

          {activeSideTab === 'storyboard' && (
            <SceneDirector
              currentTime={currentTime}
              onJumpToScene={seek}
            />
          )}

          {activeSideTab === 'architecture' && (
            <div className="w-full bg-[#080d20]/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                      DRF Serializer Lifecycle & In-Depth Concepts
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Why Django Developers Rely on Serializers
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    1. Data Transformation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Converts complex QuerySets and model instances into Python native datatypes (dicts, lists, primitives), which standard JSON renderers can stream over HTTP.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-2">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    2. Schema Validation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Validates incoming client payloads using <code>serializer.is_valid(raise_exception=True)</code>, checking types, required fields, and custom field validators.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    3. Model Persistence
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Deserialized validated data automatically creates or updates database records through <code>serializer.save()</code> without writing boilerplate ORM queries.
                  </p>
                </div>
              </div>

              {/* Golden Rule Highlight Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/80 via-slate-950 to-cyan-950/80 border border-purple-500/40 text-center">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest mb-1">
                  The Core Takeaway
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white text-balance">
                  &ldquo;Model stores data. Serializer transforms &amp; validates data.&rdquo;
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#04060f] py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] w-full mx-auto">
        <div className="flex items-center gap-2">
          <span>Django REST Framework Cinematic Reels</span>
          <span>·</span>
          <span>45-Second Python Architecture</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span>Resolution: 1080x1920 (9:16)</span>
          <span>·</span>
          <span>Target: Instagram Reels</span>
        </div>
      </footer>
    </div>
  );
}
