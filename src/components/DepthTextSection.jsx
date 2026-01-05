import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, Zap, Activity, Shield, Camera, Maximize } from "lucide-react";

const SuperchargedSection = () => {
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
  const scale = useTransform(
    smoothProgress,
    [0, 0.4, 0.9, 1],
    [0.8, 1.1, 1.1, 15]
  );
  const rotateY = useTransform(smoothProgress, [0, 1], [45, -45]);

  // Komponen melayang keluar secara radial (X dan Y)
  const screenY = useTransform(smoothProgress, [0.1, 0.4], [0, -350]);
  const batteryX = useTransform(smoothProgress, [0.1, 0.4], [0, -200]);
  const cameraX = useTransform(smoothProgress, [0.1, 0.4], [0, 200]);
  const frameOpacity = useTransform(smoothProgress, [0.3, 0.4], [1, 0.2]);

  // Efek Cahaya Inti
  const coreGlow = useTransform(
    smoothProgress,
    [0.4, 0.6],
    ["0px 0px 0px #3b82f6", "0px 0px 60px #3b82f6"]
  );

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* BACKGROUND DECORATION */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px]" />
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.2, 0.5], [0, 0.3]),
            }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
          />
        </div>

        {/* MAIN STAGE */}
        <motion.div
          style={{ scale, rotateY, perspective: 2000 }}
          className="relative w-80 h-[600px] z-20"
        >
          {/* LAYER: BACK CHASSIS */}
          <motion.div
            style={{ opacity: frameOpacity }}
            className="absolute inset-0 bg-zinc-900 rounded-[3.5rem] border border-white/10 shadow-2xl"
          />

          {/* LAYER: BATTERY (SLIDE LEFT) */}
          <motion.div
            style={{
              x: batteryX,
              opacity: useTransform(smoothProgress, [0.4, 0.5], [1, 0]),
            }}
            className="absolute top-20 left-4 w-32 h-3/4 bg-zinc-800 rounded-2xl border border-zinc-700 p-4"
          >
            <div className="h-full w-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg" />
          </motion.div>

          {/* LAYER: CAMERA MODULE (SLIDE RIGHT) */}
          <motion.div
            style={{
              x: cameraX,
              opacity: useTransform(smoothProgress, [0.4, 0.5], [1, 0]),
            }}
            className="absolute top-10 right-4 w-28 h-40 bg-zinc-800 rounded-3xl border border-zinc-700 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-black border-2 border-zinc-600" />
            <div className="w-8 h-8 rounded-full bg-black border-2 border-zinc-600" />
          </motion.div>

          {/* LAYER: THE CORE (A18 BIONIC) */}
          <motion.div
            style={{
              scale: useTransform(smoothProgress, [0.4, 0.7], [0.8, 1.5]),
              boxShadow: coreGlow,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black border border-blue-500/50 rounded-[2rem] flex flex-col items-center justify-center z-50 shadow-inner"
          >
            <Cpu className="text-blue-500 w-16 h-16 mb-2 animate-pulse" />
            <h3 className="text-blue-400 font-mono text-sm font-black uppercase tracking-[0.2em]">
              Xeron A18
            </h3>
            <div className="mt-2 flex gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
              <span className="text-[10px] text-zinc-500">SYSTEM ACTIVE</span>
            </div>
          </motion.div>

          {/* LAYER: FRONT SCREEN (SLIDE UP) */}
          <motion.div
            style={{
              y: screenY,
              opacity: useTransform(smoothProgress, [0.2, 0.4], [1, 0]),
            }}
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-[3.5rem] border border-white/20 z-[60]"
          />
        </motion.div>

        {/* SIDE CONTENT (REVEAL ON SCROLL) */}
        <div className="absolute inset-0 z-[70] pointer-events-none p-20 flex flex-col justify-between">
          <motion.div
            style={{
              x: useTransform(smoothProgress, [0.4, 0.6], [-100, 0]),
              opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 1]),
            }}
            className="max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10"
          >
            <Zap className="text-blue-500 mb-4" />
            <h2 className="text-white text-4xl font-black mb-2 leading-none uppercase tracking-tighter">
              Power Reimagined.
            </h2>
            <p className="text-zinc-400 text-lg">
              30% faster CPU, 40% more efficient GPU. The future is here.
            </p>
          </motion.div>

          <motion.div
            style={{
              x: useTransform(smoothProgress, [0.7, 0.9], [100, 0]),
              opacity: useTransform(smoothProgress, [0.7, 0.9], [0, 1]),
            }}
            className="max-w-md self-end bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-600/20"
          >
            <Activity className="text-white mb-4" />
            <h2 className="text-white text-4xl font-black mb-2 leading-none uppercase tracking-tighter">
              Neural Engine.
            </h2>
            <p className="text-white/80 text-lg">
              16-core architecture capable of 35 trillion operations per second.
            </p>
          </motion.div>
        </div>

        {/* PROGRESS NAVIGATION */}
        <div className="absolute right-12 h-1/3 w-[2px] bg-white/10">
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="w-full h-full bg-blue-500 origin-top"
          />
        </div>
      </div>
    </div>
  );
};

export default SuperchargedSection;
