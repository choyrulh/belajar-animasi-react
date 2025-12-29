import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, Play, SkipForward, SkipBack, Bell } from "lucide-react";

const DynamicIslandSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiction: 100,
    damping: 30,
  });

  // --- TRANSFORMS ---

  // 1. Morphing Island (Width & Height)
  // Fase: Idle (0-0.2) -> Music (0.3-0.5) -> Call (0.6-0.8) -> Full Reveal (0.9-1)
  const width = useTransform(
    smoothProgress,
    [0, 0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1],
    ["120px", "120px", "320px", "320px", "340px", "340px", "100%", "100%"]
  );

  const height = useTransform(
    smoothProgress,
    [0, 0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1],
    ["35px", "35px", "180px", "180px", "80px", "80px", "100%", "100%"]
  );

  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.85, 0.95],
    ["22px", "40px", "0px"]
  );

  const top = useTransform(smoothProgress, [0.85, 1], ["20px", "0px"]);

  // 2. Content Opacity per Phase
  const musicOpacity = useTransform(
    smoothProgress,
    [0.25, 0.35, 0.45, 0.55],
    [0, 1, 1, 0]
  );
  const callOpacity = useTransform(
    smoothProgress,
    [0.55, 0.65, 0.75, 0.85],
    [0, 1, 1, 0]
  );
  const revealOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-zinc-50">
      {/* STICKY PHONE FRAME */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* PHONE MOCKUP */}
        <div className="relative w-[380px] h-[780px] bg-white border-[14px] border-zinc-900 rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* Wallpaper / Background Screen */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />

          {/* Content on Screen (Background) */}
          <div className="mt-48 px-10">
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.8, 0.9], [1, 0]),
              }}
            >
              <p className="text-zinc-400 font-medium">Monday, June 10</p>
              <h2 className="text-4xl font-bold text-zinc-900 leading-tight">
                Focus on what matters.
              </h2>
              <div className="mt-8 space-y-4">
                <div className="w-full h-32 bg-zinc-100 rounded-3xl" />
                <div className="w-2/3 h-4 bg-zinc-100 rounded-full" />
                <div className="w-full h-4 bg-zinc-100 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* THE DYNAMIC ISLAND */}
          <motion.div
            style={{ width, height, borderRadius, top, x: "-50%" }}
            className="absolute left-1/2 bg-black z-50 flex flex-col items-center justify-center overflow-hidden shadow-2xl"
          >
            {/* PHASE 1: MUSIC PLAYER */}
            <motion.div
              style={{ opacity: musicOpacity }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl shadow-lg flex items-center justify-center">
                  <Play fill="white" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg">Acid Rain</h4>
                  <p className="text-zinc-500 text-sm">Lorn — Vessel</p>
                </div>
                <div className="flex gap-1 h-4 items-end">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 16, 8, 14, 4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.2,
                      }}
                      className="w-1 bg-rose-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center px-4 mb-2">
                <SkipBack className="text-zinc-400" fill="currentColor" />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-sm" />
                </div>
                <SkipForward className="text-zinc-400" fill="currentColor" />
              </div>
            </motion.div>

            {/* PHASE 2: INCOMING CALL */}
            <motion.div
              style={{ opacity: callOpacity }}
              className="absolute inset-0 px-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Phone size={18} fill="white" className="text-white" />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                    Mobile
                  </p>
                  <h4 className="text-white font-medium">Studio Zenith</h4>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-full">
                  Decline
                </div>
                <div className="px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-full">
                  Accept
                </div>
              </div>
            </motion.div>

            {/* PHASE 3: FULL REVEAL (THE FEATURE) */}
            <motion.div
              style={{ opacity: revealOpacity }}
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
            >
              <Bell className="text-blue-500 mb-6" size={60} />
              <h1 className="text-white text-5xl font-black italic tracking-tighter mb-4">
                ADAPTIVE UI.
              </h1>
              <p className="text-zinc-400 text-lg max-w-xs">
                Dynamic Island transforms seamlessly to give you the right info
                at the right time.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-10 bg-white text-black px-8 py-4 rounded-full font-bold text-lg"
              >
                Discover More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Labels Outside Phone */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.1, 0.3], [0, 1]) }}
          className="absolute left-[10%] top-1/4 max-w-[200px]"
        >
          <h3 className="text-2xl font-bold">Bubble up.</h3>
          <p className="text-zinc-500">
            Music, timers, and alerts surface without distracting you.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicIslandSection;
