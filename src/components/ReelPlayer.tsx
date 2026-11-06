import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Database } from './scenes/Scene2Database';
import { Scene3Pipeline } from './scenes/Scene3Pipeline';
import { Scene4CodeEditor } from './scenes/Scene4CodeEditor';
import { Scene5Delivery } from './scenes/Scene5Delivery';
import { InstagramOverlay } from './InstagramOverlay';
import { SCENES, TOTAL_DURATION } from '../types';
import { sound } from '../utils/audio';

interface ReelPlayerProps {
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  showOverlay: boolean;
  showSubtitles: boolean;
  viewMode: 'mockup' | 'fullscreen';
}

export const ReelPlayer: React.FC<ReelPlayerProps> = ({
  currentTime,
  isPlaying,
  onTimeUpdate,
  showOverlay,
  showSubtitles,
  viewMode,
}) => {
  const lastSceneIdRef = useRef<number>(1);
  const playerRef = useRef<HTMLDivElement>(null);

  // Identify current scene
  const currentSceneIndex = SCENES.findIndex(
    (s) => currentTime >= s.startTime && currentTime <= s.endTime
  );
  const activeIndex = currentSceneIndex === -1 ? 0 : currentSceneIndex;
  const currentScene = SCENES[activeIndex];
  const sceneProgress =
    (currentTime - currentScene.startTime) /
    (currentScene.endTime - currentScene.startTime);
  const sceneRelativeTime = currentTime - currentScene.startTime;

  // Sound & Voice synchronization on scene change
  useEffect(() => {
    if (isPlaying && currentScene.id !== lastSceneIdRef.current) {
      sound.playWhoosh();
      sound.speakScript(currentScene.narratorScript);
      lastSceneIdRef.current = currentScene.id;
    }
  }, [currentScene.id, isPlaying, currentScene.narratorScript]);

  // Click on the reel to toggle play/pause
  const handleReelClick = () => {
    // Parent handles play/pause or triggers
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-2">
      {/* 9:16 Vertical Container (iPhone Bezel or Raw Frame) */}
      <div
        ref={playerRef}
        id="reel-viewport"
        className={`relative overflow-hidden transition-all duration-300 select-none ${
          viewMode === 'mockup'
            ? 'w-[360px] sm:w-[380px] h-[640px] sm:h-[675px] rounded-[38px] border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-slate-700/60'
            : 'w-[360px] sm:w-[400px] h-[640px] sm:h-[711px] rounded-2xl border border-slate-800 shadow-2xl'
        }`}
      >
        {/* Dynamic Island / Speaker Notch for Phone Mockup */}
        {viewMode === 'mockup' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-slate-900 border border-slate-800/80 z-40 flex items-center justify-end px-2 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-cyan-900/60" />
          </div>
        )}

        {/* Top Story/Reels Progress Bars (5 segments for 5 scenes) */}
        <div className="absolute top-2.5 inset-x-3 z-40 flex gap-1 pointer-events-none">
          {SCENES.map((scene, idx) => {
            const isCompleted = currentTime >= scene.endTime;
            const isCurrent =
              currentTime >= scene.startTime && currentTime < scene.endTime;
            const segmentProgress = isCompleted
              ? 1
              : isCurrent
              ? (currentTime - scene.startTime) /
                (scene.endTime - scene.startTime)
              : 0;

            return (
              <div
                key={scene.id}
                className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm"
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-75"
                  style={{ width: `${Math.min(100, segmentProgress * 100)}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Scene Switcher with Smooth AnimatePresence */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {currentScene.id === 1 && (
              <motion.div
                key="scene1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Scene1Hook progress={sceneProgress} time={sceneRelativeTime} />
              </motion.div>
            )}

            {currentScene.id === 2 && (
              <motion.div
                key="scene2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Scene2Database
                  progress={sceneProgress}
                  time={sceneRelativeTime}
                />
              </motion.div>
            )}

            {currentScene.id === 3 && (
              <motion.div
                key="scene3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Scene3Pipeline
                  progress={sceneProgress}
                  time={sceneRelativeTime}
                />
              </motion.div>
            )}

            {currentScene.id === 4 && (
              <motion.div
                key="scene4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Scene4CodeEditor
                  progress={sceneProgress}
                  time={sceneRelativeTime}
                />
              </motion.div>
            )}

            {currentScene.id === 5 && (
              <motion.div
                key="scene5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Scene5Delivery
                  progress={sceneProgress}
                  time={sceneRelativeTime}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scanlines / Retro CRT Tech Sheen */}
        <div className="absolute inset-0 screen-scanlines opacity-25 pointer-events-none z-20" />

        {/* Instagram Interface Layer */}
        <InstagramOverlay
          currentTime={currentTime}
          showOverlay={showOverlay}
          showSubtitles={showSubtitles}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
};
