import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, Zap, Brain, Gauge, Layers } from "lucide-react";

const ChipsetSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // --- DEFINISI ANIMASI ---

  // 1. Circuit Drawing & Background Logic
  const pathLength = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const circuitOpacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.8, 0.9],
    [0, 1, 1, 0],
  );

  // 2. Chip Animation (Membesar & Miring)
  // Kita sesuaikan transformasinya agar gambar chipset.jpg terlihat futuristik
  const scale = useTransform(smoothProgress, [0, 0.4], [0.8, 1.2]);
  const rotateX = useTransform(smoothProgress, [0.2, 0.8], [15, -10]);
  const rotateY = useTransform(smoothProgress, [0.2, 0.8], [-15, 10]);
  const chipOpacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 1],
  );

  // 3. Stats Reveal
  const statsOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const statsY = useTransform(smoothProgress, [0.4, 0.6], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        {/* --- CIRCUIT LINES (SVG) --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.path
            d="M 0 400 L 400 400 L 600 500"
            fill="transparent"
            stroke="#eab308"
            strokeWidth="1"
            style={{ pathLength, opacity: circuitOpacity }}
          />
          <motion.path
            d="M 1920 600 L 1520 600 L 1320 500"
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth="1"
            style={{ pathLength, opacity: circuitOpacity }}
          />
        </svg>

        {/* --- MAIN TITLE --- */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.15], [0, 1]),
            y: useTransform(smoothProgress, [0, 0.15], [-20, 0]),
          }}
          className="absolute top-8 sm:top-12 md:top-16 text-center z-30 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 mb-2">
            XERON Z1 CHIP
          </h2>
          <p className="text-blue-400/60 text-[0.5rem] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.6em] uppercase">
            Next-Gen Neural Architecture
          </p>
        </motion.div>

        {/* --- CHIP IMAGE CONTAINER --- */}
        <motion.div
          style={{
            scale,
            rotateX,
            rotateY,
            opacity: chipOpacity,
          }}
          className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] z-20"
        >
          {/* Efek Glow di belakang gambar */}
          {/*<div className="absolute inset-0 bg-yellow-500/10 blur-[100px] rounded-full" />*/}

          <img
            src="/chipset1.png"
            alt="Xeron Z1 Chipset"
            className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]"
          />

          {/* Overlay kilauan (sheen) mengikuti scroll */}
          {/*<motion.div 
            style={{ 
                opacity: useTransform(smoothProgress, [0.3, 0.6], [0, 0.4]),
                rotate: 45 
            }}
            className="absolute -inset-20 bg-gradient-to-r from-transparent via-white to-transparent w-full pointer-events-none"
          />*/}
        </motion.div>

        {/* --- STATS FLOATING --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="relative w-full max-w-6xl h-full flex items-center justify-between px-4 sm:px-6 md:px-10">
            {/* Left Stats */}
            <motion.div
              style={{
                opacity: statsOpacity,
                x: useTransform(smoothProgress, [0.4, 0.6], [-50, 0]),
              }}
              className="space-y-6 sm:space-y-8 md:space-y-12"
            >
              <StatItem
                icon={<Brain size={16} />}
                title="Neural Engine"
                value="32-Core"
                color="border-yellow-500/50"
              />
              <StatItem
                icon={<Layers size={16} />}
                title="Transistors"
                value="25 Billion"
                color="border-blue-500/50"
              />
            </motion.div>

            {/* Right Stats */}
            <motion.div
              style={{
                opacity: statsOpacity,
                x: useTransform(smoothProgress, [0.4, 0.6], [50, 0]),
              }}
              className="space-y-6 sm:space-y-8 md:space-y-12 text-right"
            >
              <StatItem
                icon={<Gauge size={16} />}
                title="Clock Speed"
                value="4.2 GHz"
                color="border-purple-500/50"
                reverse
              />
              <StatItem
                icon={<Zap size={16} />}
                title="Efficiency"
                value="+45%"
                color="border-green-500/50"
                reverse
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-komponen agar kode lebih bersih
const StatItem = ({ icon, title, value, color, reverse = false }) => (
  <div
    className={`flex items-center gap-2 sm:gap-3 md:gap-4 ${reverse ? "flex-row-reverse" : ""}`}
  >
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-black/50 backdrop-blur-md border ${color} flex items-center justify-center text-white`}
    >
      {icon}
    </div>
    <div>
      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
        {value}
      </h4>
      <p className="text-gray-500 text-[0.5rem] sm:text-xs uppercase tracking-wider sm:tracking-widest">
        {title}
      </p>
    </div>
  </div>
);

export default ChipsetSection;
