import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Aperture, Zap, ScanEye } from "lucide-react";

const CameraSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Menggunakan spring agar gerakan terasa lebih "berat" dan premium
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // --- TRANSFORMATION LOGIC ---

  // 1. Rotasi 3D: Miring dari 60 derajat ke 0 (posisi datar)
  const rotateX = useTransform(smoothProgress, [0.2, 0.6], [60, 0]);

  // 2. Scale: Zoom in perlahan
  const scale = useTransform(smoothProgress, [0.2, 0.6], [0.8, 1.2]);

  // 3. Glare Effect: Kilatan cahaya bergerak melintasi kamera saat berputar
  const glareOpacity = useTransform(
    smoothProgress,
    [0.2, 0.4, 0.6],
    [0, 0.6, 0],
  );
  const glarePos = useTransform(smoothProgress, [0.2, 0.6], ["-100%", "200%"]);

  // 4. Parallax Lensa: Bagian dalam lensa bergerak sedikit untuk efek kedalaman
  const lensParallax = useTransform(smoothProgress, [0.2, 0.6], [10, 0]);

  // Tekstur Metal untuk Body Kamera
  const metalTexture =
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop";

  return (
    <section
      ref={containerRef}
      className="h-[150vh] bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden z-10"
    >
      {/* Background Ambient Light */}
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,40,1),transparent_70%)]" />

      <div className="perspective-[1200px] flex flex-col items-center relative z-20">
        {/* --- CAMERA MODULE --- */}
        <motion.div
          style={{ rotateX, scale }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] flex items-center justify-center preserve-3d group"
        >
          {/* Base Plate with Texture */}
          <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden bg-[#1a1a1a] border border-white/10">
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url(${metalTexture})` }}
            />
            {/* Inner Shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Dynamic Glare Reflection (The Shiny Effect) */}
          <motion.div
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.1) 50%, transparent 54%)",
              opacity: glareOpacity,
              x: glarePos,
            }}
            className="absolute inset-0 z-30 pointer-events-none rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem]"
          />

          {/* --- LENSES GRID --- */}
          <div className="relative z-20 grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6">
            {/* Lens 1: Main Wide */}
            <LensCircle size="large" parallax={lensParallax} label="WIDE" />

            {/* Lens 2: Ultra Wide */}
            <LensCircle size="large" parallax={lensParallax} label="ULTRA" />

            {/* Lens 3: Telephoto (Centered bellow) */}
            <div className="col-span-2 flex justify-center items-center gap-4 sm:gap-5 md:gap-6 mt-1 sm:mt-2">
              <LensCircle size="large" parallax={lensParallax} label="TELE" />

              {/* Flash & Sensor Cluster */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-100 shadow-[0_0_10px_rgba(255,255,0,0.5)] border border-gray-600 flex items-center justify-center">
                  <div className="w-full h-full bg-white/50 rounded-full animate-pulse" />
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border border-gray-700 flex items-center justify-center">
                  <ScanEye size={10} className="text-gray-600 sm:w-3 sm:h-3" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- TEXT CONTENT --- */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.5, 0.7], [0, 1]),
            y: useTransform(smoothProgress, [0.5, 0.7], [50, 0]),
          }}
          className="mt-12 sm:mt-14 md:mt-16 text-center max-w-2xl px-4 sm:px-6"
        >
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-500 text-xs font-mono tracking-widest bg-yellow-500/5">
              PRO OPTICS
            </span>
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
            Capture the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Impossible
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center border-t border-white/10 pt-6 sm:pt-8">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                200
                <span className="text-xs sm:text-sm text-gray-500 align-top">
                  MP
                </span>
              </p>
              <p className="text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                Main Sensor
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">f/1.7</p>
              <p className="text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                Aperture
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                100
                <span className="text-xs sm:text-sm text-gray-500 align-top">
                  x
                </span>
              </p>
              <p className="text-[0.6rem] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                Space Zoom
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Reusable Realistic Lens Component
const LensCircle = ({ size, parallax, label }) => {
  return (
    <div className="relative group">
      {/* Outer Metal Ring */}
      <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-gray-700 to-black p-[2px] shadow-lg relative overflow-hidden">
        {/* Inner Dark Glass */}
        <div className="w-full h-full rounded-full bg-black relative flex items-center justify-center overflow-hidden border-[3px] sm:border-[4px] border-[#111]">
          {/* The Lens Reflection (Blue/Purple Coat) */}
          <motion.div
            style={{ y: parallax }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(60,20,100,0.6),transparent_60%)] z-10"
          />
          <motion.div
            style={{ y: parallax }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(20,60,120,0.4),transparent_50%)] z-10"
          />

          {/* The Aperture Blades (Visual Detail) */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/10 rounded-full opacity-40 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500/50 rounded-full blur-[1px]" />
          </div>

          {/* Glass Shine */}
          <div className="absolute top-2 left-3 sm:left-4 w-6 sm:w-8 h-3 sm:h-4 bg-white opacity-10 rounded-full blur-md rotate-[-45deg]" />
        </div>
      </div>

      {/* Label Text */}
      <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-mono text-gray-600 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
    </div>
  );
};

export default CameraSection;
