import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Cpu,
  Zap,
  Aperture,
  Wifi,
  ThermometerSnowflake,
  Activity,
  Maximize,
  BatteryCharging,
} from "lucide-react";

// Komponen Kartu Reusable dengan efek Glassmorphism & Hover
const BentoCard = ({ children, className, parallaxY }) => {
  return (
    <motion.div
      style={{ y: parallaxY }}
      className={`relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-md group ${className}`}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(600px_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none z-20" />

      {children}
    </motion.div>
  );
};

const ParallaxBentoSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax Values (Kecepatan berbeda untuk tiap elemen)
  const yFast = useTransform(smoothProgress, [0, 1], [100, -100]);
  const ySlow = useTransform(smoothProgress, [0, 1], [0, -50]);
  const yReverse = useTransform(smoothProgress, [0, 1], [-50, 50]);

  // Content Data
  const imgGaming =
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"; // Gaming
  const imgCamera =
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"; // Camera Lens
  const imgChip =
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop"; // Chipset macro
  const imgCooling =
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop"; // Ice/Cooling

  return (
    <section
      ref={containerRef}
      className="min-h-[150vh] bg-black relative py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.5),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-mono text-cyan-400 mb-6"
          >
            <Activity size={12} />
            <span>SYSTEM ARCHITECTURE</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
            PERFORMANCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">
              UNLEASHED
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-lg md:text-xl font-light">
            Redefining the boundaries of mobile computing with aerospace-grade
            engineering.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-auto gap-6">
          {/* ITEM 1: MAIN GAMING (Large, Spans 8 cols) */}
          <BentoCard
            className="md:col-span-8 md:h-[500px] group"
            parallaxY={ySlow}
          >
            <div className="absolute inset-0">
              <img
                src={imgGaming}
                alt="Gaming"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 p-10 h-full flex flex-col justify-center max-w-md">
              <Cpu className="text-red-500 mb-6 w-12 h-12" />
              <h3 className="text-4xl font-bold text-white mb-4">
                Snapdragon 8 Gen 3
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Ray Tracing enabled. Console-level gaming in the palm of your
                hand with 30% faster GPU rendering.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <span className="block text-2xl font-bold text-white">
                    240Hz
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    SAMPLING
                  </span>
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <span className="block text-2xl font-bold text-white">
                    120FPS
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    STABLE
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ITEM 2: COOLING SYSTEM (Tall, Spans 4 cols) */}
          <BentoCard
            className="md:col-span-4 md:row-span-2 min-h-[400px]"
            parallaxY={yFast}
          >
            <div className="absolute inset-0">
              <img
                src={imgCooling}
                alt="Cooling"
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-black" />
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <ThermometerSnowflake className="text-cyan-400 w-10 h-10" />
                <span className="text-cyan-400 font-mono text-xs border border-cyan-500/30 px-2 py-1 rounded">
                  VC LIQUID
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  IceCore Cooling
                </h3>
                <p className="text-gray-400 text-sm">
                  11-layer heat dissipation structure reducing core temp by up
                  to 15°C under heavy load.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ITEM 3: CAMERA (Spans 5 cols) */}
          <BentoCard
            className="md:col-span-5 md:h-[400px]"
            parallaxY={yReverse}
          >
            <div className="absolute inset-0">
              <img
                src={imgCamera}
                alt="Camera"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <Aperture className="text-yellow-400" />
                <span className="text-yellow-400 font-mono text-xs">
                  ISO CERTIFIED
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                200MP Master Lens
              </h3>
              <p className="text-gray-300 text-sm max-w-xs">
                Capturing invisible details with 1/1.3" sensor size and OIS
                stabilization.
              </p>
            </div>
          </BentoCard>

          {/* ITEM 4: BATTERY (Spans 3 cols) */}
          <BentoCard
            className="md:col-span-3 md:h-[400px] bg-neutral-900"
            parallaxY={ySlow}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(34,197,94,0.2),transparent)]" />
            <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-green-500/20 flex items-center justify-center mb-6 relative">
                <BatteryCharging className="text-green-500 w-8 h-8" />
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-green-500"
                    strokeDasharray="226"
                    strokeDashoffset="40"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-4xl font-black text-white mb-1">120W</h3>
              <p className="text-green-400 font-mono text-xs tracking-widest uppercase mb-4">
                HyperCharge
              </p>
              <p className="text-gray-500 text-xs">0-100% in 15 mins</p>
            </div>
          </BentoCard>

          {/* ITEM 5: CONNECTIVITY (Spans 4 cols - Filler) */}
          <BentoCard className="md:col-span-4 md:h-[300px]" parallaxY={yFast}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl" />
              <div className="grid grid-cols-6 gap-2 p-4 opacity-10">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-full h-8 bg-white rounded-sm" />
                ))}
              </div>
            </div>
            <div className="relative z-10 p-8">
              <Wifi className="text-blue-400 w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold text-white">Wi-Fi 7 Ready</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Lowest latency for competitive online gaming.
              </p>
            </div>
          </BentoCard>

          {/* ITEM 6: DISPLAY (Spans 8 cols) */}
          <BentoCard className="md:col-span-8 md:h-[300px]" parallaxY={ySlow}>
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center opacity-30 blur-sm" />
            </div>
            <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between h-full">
              <div className="text-left">
                <Maximize className="text-purple-400 mb-4" />
                <h3 className="text-3xl font-bold text-white">
                  6.8" AMOLED 2X
                </h3>
                <p className="text-gray-400 mt-2 max-w-md">
                  The brightest display on a smartphone. Reaching peak
                  brightness of 2600 nits.
                </p>
              </div>
              <div className="mt-6 md:mt-0 text-right">
                <span className="text-6xl font-black text-white/10 block">
                  HDR
                </span>
                <span className="text-6xl font-black text-white/20 block -mt-10">
                  10+
                </span>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default ParallaxBentoSection;
