import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Droplets, Waves, Camera } from "lucide-react";

const WaterSection = () => {
  const containerRef = useRef(null);

  // Menggunakan 400vh untuk durasi scroll yang panjang dan dramatis
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiction: 100,
    damping: 40,
  });

  // --- ANIMATION HOOKS ---

  // 1. Submersion Level (Presentase air naik dari 0% ke 130% layar)
  const waterLevelRaw = useTransform(smoothProgress, [0.2, 0.7], [0, 130]);
  const waterLevelTop = useTransform(waterLevelRaw, (v) => `${100 - v}%`);
  const waterLevelClip = useTransform(
    waterLevelRaw,
    (v) => `inset(${100 - v}% 0 0 0)`
  );

  // 2. Phone Movements (Masuk, Miring saat kena air, lalu mengapung)
  const phoneY = useTransform(
    smoothProgress,
    [0, 0.4, 1],
    ["-50%", "0%", "10%"]
  );
  const phoneRotate = useTransform(
    smoothProgress,
    [0.3, 0.6, 1],
    [0, -15, -10]
  );
  // Efek "bobbing" (mengapung naik turun) setelah tenggelam
  const bobbingY = useTransform(smoothProgress, [0.7, 1], [0, -20]);

  // 3. Atmosphere & Lighting
  const bgDarkness = useTransform(
    smoothProgress,
    [0.3, 0.8],
    ["#0a192f", "#000510"]
  ); // Biru tua ke hitam pekat
  const causticOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 0.6]); // Cahaya dalam air

  // 4. Content Reveal
  const contentOpacity = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.4], ["-100%", "0%"]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* STICKY CONTAINER */}
      <motion.div
        style={{ backgroundColor: bgDarkness }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-1000 transition-colors duration-1000"
      >
        {/* --- LAYER 1: UNDERWATER BACKGROUND ATMOSPHERE --- */}
        <motion.div
          style={{ top: waterLevelTop }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#1e40af] via-[#0f295e] to-black z-10 pointer-events-none"
        >
          {/* Underwater Light Rays (Caustics) */}
          <motion.div
            style={{ opacity: causticOpacity }}
            className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/caustics.png')] bg-cover mix-blend-overlay animate-[shimmer_10s_infinite_linear]"
          />
          {/* Deep Depth Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,transparent_0%,black_80%)]" />
        </motion.div>

        {/* --- LAYER 2: MAIN CONTENT (Title & Cards) --- */}
        <div className="absolute inset-0 z-40 p-6 md:p-20 flex flex-col justify-between pointer-events-none">
          {/* BIG TITLE */}
          <motion.div style={{ y: titleY }} className="text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              OCEAN READY.
              <br />
              <span className="text-blue-400">NO LIMITS.</span>
            </h1>
          </motion.div>

          {/* FEATURE CARDS (Reveal saat tenggelam) */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="flex flex-wrap items-end justify-between gap-10"
          >
            {/* Left Card */}
            <GlassCard
              icon={<ShieldCheck className="text-blue-400" />}
              title="IP68 Certified"
              desc="Engineered for extreme depths and environments."
            />

            {/* Right Content */}
            <div className="text-right max-w-sm">
              <h3 className="text-white text-3xl font-bold italic mb-2">
                ENDLESS EXPLORATION.
              </h3>
              <p className="text-blue-200 text-sm">
                Capture stunning photos and videos, even underwater.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full backdrop-blur-md border border-blue-400/30">
                <Camera size={18} className="text-blue-300" />
                <span className="text-white text-xs font-bold">
                  Underwater Mode Auto-On
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- LAYER 3: THE SMARTPHONE MOCKUP --- */}
        <motion.div
          style={{
            y: useTransform(
              scrollYProgress,
              (v) => phoneY.get() + bobbingY.get()
            ),
            rotateZ: phoneRotate,
          }}
          className="relative z-30 w-[300px] h-[600px] rounded-[45px] border-[8px] border-zinc-800 bg-black shadow-2xl overflow-hidden"
        >
          {/* Phone Screen Content */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551244072-53747044489d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40" />{" "}
            {/* ScreenDimmer */}
            {/* UI on Screen */}
            <div className="absolute bottom-20 left-6 right-6 p-6 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10">
              <Waves className="text-blue-400 mb-3" size={32} />
              <h4 className="text-white text-xl font-bold">
                Liquid & Dust Proof
              </h4>
              <p className="text-zinc-400 text-xs mt-2">
                Protection activated. Safe for submersion up to 6 meters.
              </p>
            </div>
          </div>

          {/* UNDERWATER OVERLAY ON PHONE (The Masking Magic) */}
          {/* Layer ini hanya muncul di bagian HP yang "tenggelam" */}
          <motion.div
            style={{ clipPath: waterLevelClip }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            {/* Efek biru dan blur di dalam air */}
            <div className="absolute inset-0 bg-blue-600/50 backdrop-blur-[3px] mix-blend-hard-light" />
            {/* Refleksi kaca di dalam air */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
          </motion.div>
        </motion.div>

        {/* --- LAYER 4: THE WATER SURFACE LINE & BUBBLES --- */}
        {/* Layer ini bergerak naik menutupi layar */}
        <motion.div
          style={{ top: waterLevelTop }}
          className="absolute inset-x-0 h-screen z-30 pointer-events-none"
        >
          {/* The Glowing Waterline */}
          <div className="relative w-full h-2 bg-gradient-to-r from-blue-300 via-white to-blue-300 shadow-[0_0_30px_rgba(255,255,255,0.8)]">
            {/* Splash Particles at surface */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==')] bg-repeat-x animate-[splash_1s_infinite_linear]" />
          </div>

          {/* Detailed bubbles rising from below */}
          <BubbleEmitter count={40} trigger={smoothProgress} />
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- Sub-components ---

const GlassCard = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 bg-blue-900/30 backdrop-blur-xl p-6 rounded-3xl border border-blue-400/30 max-w-xs shadow-lg">
    <div className="p-3 bg-blue-500/80 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-bold text-lg leading-tight mb-1">
        {title}
      </h4>
      <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

// High-Quality SVG Bubbles like in the reference image
const BubbleEmitter = ({ count }) => {
  return (
    <div className="absolute inset-0 overflow-hidden top-2">
      {[...Array(count)].map((_, i) => {
        const size = 10 + Math.random() * 50; // Variasi ukuran besar kecil
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 6;

        return (
          <motion.svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="absolute opacity-60"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
            initial={{ y: "100vh", scale: 0.5, opacity: 0 }}
            animate={{
              y: "-100vh",
              scale: 1.1,
              opacity: [0, 0.8, 0],
              x: [0, Math.sin(i) * 50], // Gerakan zig-zag natural
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
          >
            {/* Bubble Ring Shape */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Inner highlight */}
            <path
              d="M 30 30 Q 50 10 70 30"
              fill="none"
              stroke="white"
              strokeWidth="3"
              opacity="0.4"
              strokeLinecap="round"
            />
          </motion.svg>
        );
      })}
    </div>
  );
};

export default WaterSection;
