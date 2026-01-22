import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const BatterySection = () => {
  const [rawPercent, setRawPercent] = useState(0);

  const containerRef = useRef(null);

  // Kita gunakan 400vh agar proses charging terasa detail saat di-scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Menghaluskan pergerakan scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiction: 100,
    damping: 30,
  });

  // 1. Animasi Bar Baterai (0% ke 100%)
  const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // 2. Perubahan Warna (Merah -> Kuning -> Hijau)
  const color = useTransform(
    smoothProgress,
    [0, 0.3, 1],
    ["#ef4444", "#f59e0b", "#22c55e"],
  );

  // 3. Simulasi Angka Persentase (Counter)
  const percentage = useTransform(smoothProgress, [0, 1], [0, 100]);
  const displayPercent = useTransform(percentage, (latest) =>
    Math.round(latest),
  );

  // 4. Simulasi Menit (0 - 45 Menit)
  // Kita asumsikan: 0-15 mnt (50%), 15-30 mnt (85%), 30-45 mnt (100%)
  const minutes = useTransform(
    smoothProgress,
    [0, 0.5, 0.8, 1],
    [0, 15, 30, 45],
  );
  const displayMinutes = useTransform(minutes, (latest) => Math.round(latest));

  // 5. Animasi Teks Status berdasarkan fase
  const statusOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(displayPercent, "change", (latest) => {
    setRawPercent(Math.round(latest));
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      {/* PIN SECTION */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* HEADER INFO */}
        <motion.div
          style={{ opacity: statusOpacity }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-3 sm:mb-4">
            HYPER CHARGE
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 uppercase text-xs tracking-widest">
                Time Elapsed
              </p>
              {/* PERBAIKAN: Gunakan motion.span */}
              <div className="text-2xl sm:text-3xl font-mono text-blue-400">
                <motion.span>{displayMinutes}</motion.span> MIN
              </div>
            </div>

            <div className="h-10 w-[1px] bg-gray-800 hidden sm:block" />
            <div className="w-10 h-[1px] bg-gray-800 sm:hidden" />

            <div className="text-center sm:text-left">
              <p className="text-gray-500 uppercase text-xs tracking-widest">
                Battery Status
              </p>
              {/* PERBAIKAN: Gunakan motion.span */}
              <div className="text-2xl sm:text-3xl font-mono text-white">
                <motion.span>{displayPercent}</motion.span>%
              </div>
            </div>
          </div>
        </motion.div>

        {/* BATTERY BODY */}
        <div className="w-full max-w-2xl h-24 sm:h-28 md:h-32 lg:h-44 border-4 sm:border-[5px] md:border-[6px] border-gray-700 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-2 sm:p-2.5 md:p-3 relative flex items-center shadow-[0_0_50px_rgba(0,0,0,1)]">
          {/* Battery Tip */}
          <div className="absolute -right-5 sm:-right-6 md:-right-8 top-1/2 -translate-y-1/2 w-4 sm:w-5 md:w-6 h-12 sm:h-14 md:h-16 bg-gray-700 rounded-r-lg sm:rounded-r-xl" />

          {/* Inner Glow Background */}
          <div className="absolute inset-0 bg-gray-900/50 rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden" />

          {/* FILLING BAR */}
          <motion.div
            style={{ width, backgroundColor: color }}
            className="h-full rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.5rem] relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-colors duration-300"
          >
            {/* Animasi Kilat/Gleam saat charging */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 w-full animate-[pulse_2s_infinite]" />
          </motion.div>

          {/* PERCENTAGE TEXT (CENTER) */}
          <motion.div className="absolute inset-0 flex items-center justify-center z-20 mix-blend-difference">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white italic">
              {/* PERBAIKAN: Gunakan motion.span */}
              <motion.span>{rawPercent}</motion.span>%
            </span>
          </motion.div>
        </div>

        {/* DYNAMIC DESCRIPTION TEXT */}
        <div className="mt-10 sm:mt-12 md:mt-16 h-10 overflow-hidden text-center px-4">
          <motion.p
            style={{
              opacity: useTransform(
                smoothProgress,
                [0, 0.4, 0.5, 0.8, 0.9],
                [1, 1, 0, 0, 1],
              ),
              y: useTransform(
                smoothProgress,
                [0, 0.45, 0.5, 0.85, 0.9],
                [0, -20, 20, -20, 0],
              ),
            }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-medium"
          >
            {smoothProgress.get() < 0.5
              ? "Super-fast charging initial phase..."
              : smoothProgress.get() < 0.9
                ? "Optimizing cell longevity..."
                : "Full capacity reached."}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default BatterySection;
