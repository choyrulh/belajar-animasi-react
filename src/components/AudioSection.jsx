import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, Mic, Sliders, BatteryCharging } from "lucide-react";

const AudioSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Parallax Effect untuk background image
  const yBg = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  // Efek "Volume Up" saat scroll: Ripple membesar dan semakin terang
  const rippleScale = useTransform(smoothProgress, [0.3, 0.6], [0.8, 1.5]);
  const contentOpacity = useTransform(
    smoothProgress,
    [0.2, 0.5, 0.8],
    [0, 1, 0]
  );

  // Gambar Background: Abstrak Gelombang Suara (Dark & Moody)
  const bgImage =
    "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2000&auto=format&fit=crop";

  return (
    <section
      ref={containerRef}
      className="h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* 1. LIGHTWEIGHT BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img
            src={bgImage}
            alt="Sound Wave Texture"
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-screen"
          />
        </motion.div>
        {/* Vignette agar teks terbaca jelas */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/80 to-black" />
      </div>

      {/* 2. SPATIAL RIPPLE VISUALIZER (SVG - Sangat Ringan) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <motion.div
          style={{ scale: rippleScale, opacity: 0.4 }}
          className="relative w-[600px] h-[600px]"
        >
          {/* Menggunakan SVG untuk animasi loop yang hemat resource GPU */}
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full animate-spin-slow"
          >
            <circle
              cx="200"
              cy="200"
              r="80"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1"
              opacity="0.8"
            />
            <circle
              cx="200"
              cy="200"
              r="130"
              fill="none"
              stroke="#ec4899"
              strokeWidth="0.5"
              opacity="0.5"
              strokeDasharray="10 10"
            />
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>

          {/* Central Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        </motion.div>
      </div>

      {/* 3. MAIN CONTENT */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center"
      >
        <span className="text-purple-400 font-mono text-xs tracking-[0.4em] uppercase mb-6 border border-purple-500/30 px-4 py-1 rounded-full bg-purple-900/10 backdrop-blur-sm">
          Audio Intelligence
        </span>

        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight">
          Sound <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-gray-800">
            Unbound.
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mb-12 font-light">
          Experience distinct layers of sound. From deep, resonant bass to
          crystal-clear highs, recalibrated in real-time for your unique ear
          shape.
        </p>

        {/* 4. FEATURE GRID (Informatif & Rapi) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <FeatureCard
            icon={<Mic size={20} />}
            title="Active Noise Cancellation"
            desc="Silences the world by 48dB."
          />
          <FeatureCard
            icon={<Sliders size={20} />}
            title="Adaptive Transparency"
            desc="Lets important sounds in."
          />
          <FeatureCard
            icon={<Zap size={20} />}
            title="H2 Audio Chip"
            desc="Ultra-low latency processing."
          />
          <FeatureCard
            icon={<BatteryCharging size={20} />}
            title="30h Playback"
            desc="All-day immersive listening."
          />
        </div>
      </motion.div>
    </section>
  );
};

// Sub-component Kecil untuk Card Fitur (Reusable & Clean)
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-start hover:bg-white/10 transition-colors duration-300">
    <div className="mb-4 text-purple-400 p-2 bg-purple-500/10 rounded-lg">
      {icon}
    </div>
    <h3 className="text-white font-bold text-sm mb-1 text-left">{title}</h3>
    <p className="text-gray-500 text-xs text-left leading-relaxed">{desc}</p>
  </div>
);

export default AudioSection;
