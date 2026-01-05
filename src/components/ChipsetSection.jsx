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

  // 1. Circuit Drawing (0% - 30%)
  const pathLength = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const circuitOpacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.8, 0.9],
    [0, 1, 1, 0]
  );

  // 2. Chip Scale & Rotate (Membesar & Miring 3D)
  const scale = useTransform(smoothProgress, [0.1, 0.4], [0.5, 1]);
  const rotateX = useTransform(smoothProgress, [0.3, 0.7], [0, 45]); // Miring ke belakang
  const rotateZ = useTransform(smoothProgress, [0.3, 0.7], [0, 15]); // Miring sedikit ke kanan

  // 3. Layer Separation (Exploded View - 40% - 80%)
  // Kita memisahkan 3 layer chip menjauh satu sama lain
  const layer1Z = useTransform(smoothProgress, [0.4, 0.8], [0, -100]); // Bottom Layer
  const layer2Z = useTransform(smoothProgress, [0.4, 0.8], [0, 0]); // Middle Layer (diam)
  const layer3Z = useTransform(smoothProgress, [0.4, 0.8], [0, 120]); // Top Layer

  // 4. Stats Reveal (Text muncul saat chip terpisah)
  const statsOpacity = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);
  const statsY = useTransform(smoothProgress, [0.6, 0.8], [20, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center perspective-[1000px]">
        {/* Background Grid - Circuit Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        {/* --- CIRCUIT LINES (SVG) --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Garis kiri ke tengah */}
          <motion.path
            d="M 0 500 L 300 500 L 450 400"
            fill="transparent"
            stroke="#eab308"
            strokeWidth="2"
            strokeDasharray="10 10"
            style={{ pathLength, opacity: circuitOpacity }}
          />
          {/* Garis kanan ke tengah */}
          <motion.path
            d="M 1920 500 L 1620 500 L 1470 400"
            fill="transparent"
            stroke="#eab308"
            strokeWidth="2"
            strokeDasharray="10 10"
            style={{ pathLength, opacity: circuitOpacity }}
          />
          {/* Garis bawah ke tengah */}
          <motion.path
            d="M 960 1080 L 960 700"
            fill="transparent"
            stroke="#eab308"
            strokeWidth="2"
            strokeDasharray="10 10"
            style={{ pathLength, opacity: circuitOpacity }}
          />
        </svg>

        {/* --- MAIN TITLE --- */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.2], [0, 1]) }}
          className="absolute top-20 text-center z-30"
        >
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 mb-2">
            A18 BIONIC PRO
          </h2>
          <p className="text-gray-400 text-sm tracking-[0.5em] uppercase">
            3nm Architecture • 19 Billion Transistors
          </p>
        </motion.div>

        {/* --- 3D CHIP ASSEMBLY --- */}
        {/* Container Utama dengan Perspective CSS */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 z-20 preserve-3d">
          <motion.div
            style={{ scale, rotateX, rotateZ }}
            className="relative w-full h-full preserve-3d"
          >
            {/* LAYER 1: BOTTOM (Pins/Substrate) */}
            <motion.div
              style={{ z: layer1Z }}
              className="absolute inset-0 bg-gray-900 rounded-2xl border border-gray-700 flex items-center justify-center shadow-2xl backface-hidden"
            >
              <div className="w-[90%] h-[90%] grid grid-cols-10 grid-rows-10 gap-1 opacity-30">
                {[...Array(100)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-yellow-600 rounded-full w-[2px] h-[2px]"
                  />
                ))}
              </div>
            </motion.div>

            {/* LAYER 2: MIDDLE (Silicon/Logic) */}
            <motion.div
              style={{ z: layer2Z }}
              className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-yellow-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)] backface-hidden"
            >
              {/* Circuit Pattern inside */}
              <div className="absolute inset-4 border border-yellow-500/20 rounded-lg" />
              <Cpu size={80} className="text-yellow-500 animate-pulse" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-500/20" />
              <div className="absolute top-0 left-1/2 h-full w-[1px] bg-yellow-500/20" />
            </motion.div>

            {/* LAYER 3: TOP (Heat Spreader/Branding) */}
            <motion.div
              style={{ z: layer3Z }}
              className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-800 rounded-2xl border border-white/20 flex flex-col items-center justify-center shadow-xl backface-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

              <div className="z-10 flex flex-col items-center">
                <span className="text-yellow-400 font-bold text-3xl tracking-tighter">
                  XERON
                </span>
                <span className="text-white/50 text-xs font-mono mt-1">
                  X-SERIES CHIP
                </span>
              </div>

              {/* Metallic Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* --- STATS FLOATING AROUND --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-full max-w-4xl h-[600px]">
            {/* Stat 1: Top Left */}
            <motion.div
              style={{ opacity: statsOpacity, y: statsY }}
              className="absolute top-20 left-10 md:left-0 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-yellow-500/30">
                <Brain className="text-yellow-400" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">16-Core</h4>
                <p className="text-gray-400 text-sm">Neural Engine</p>
              </div>
            </motion.div>

            {/* Stat 2: Top Right */}
            <motion.div
              style={{ opacity: statsOpacity, y: statsY }}
              className="absolute top-20 right-10 md:right-0 flex items-center gap-4 flex-row-reverse text-right"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Gauge className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">3.8 GHz</h4>
                <p className="text-gray-400 text-sm">Max Frequency</p>
              </div>
            </motion.div>

            {/* Stat 3: Bottom Left */}
            <motion.div
              style={{
                opacity: statsOpacity,
                y: useTransform(smoothProgress, [0.6, 0.8], [-20, 0]),
              }}
              className="absolute bottom-40 left-10 md:left-0 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-green-500/30">
                <Zap className="text-green-400" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">-30% Power</h4>
                <p className="text-gray-400 text-sm">Efficiency</p>
              </div>
            </motion.div>

            {/* Stat 4: Bottom Right */}
            <motion.div
              style={{
                opacity: statsOpacity,
                y: useTransform(smoothProgress, [0.6, 0.8], [-20, 0]),
              }}
              className="absolute bottom-40 right-10 md:right-0 flex items-center gap-4 flex-row-reverse text-right"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Layers className="text-purple-400" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">6-Core GPU</h4>
                <p className="text-gray-400 text-sm">Ray Tracing Ready</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipsetSection;
