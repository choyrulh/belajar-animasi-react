import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ThemeSwitchSection = () => {
  const containerRef = useRef(null);

  // Menggunakan 200vh agar user merasakan kontrol saat menggeser "Wipe"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiction: 100,
    damping: 30,
  });

  // TEKNIK MASKING:
  // Kita menggerakkan clip-path dari kanan ke kiri.
  // inset(0 100% 0 0) artinya layer tertutup penuh (invisible).
  // inset(0 0% 0 0) artinya layer terlihat penuh (visible).
  const clipPathVal = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* =========================================
            LAYER 1: DARK THEME (BASE)
           ========================================= */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <ThemeContent
            theme="dark"
            title="PHANTOM BLACK"
            desc="Forged in shadow. Titanium Grade 5 with matte finish."
            price="$1,199"
          />
        </div>

        {/* =========================================
            LAYER 2: LIGHT THEME (OVERLAY)
           ========================================= */}
        <motion.div
          style={{ clipPath: clipPathVal }}
          className="absolute inset-0 bg-white flex items-center justify-center z-20"
        >
          <ThemeContent
            theme="light"
            title="GLACIAL WHITE"
            desc="Pure elegance. Ceramic-coated Titanium back glass."
            price="$1,299"
          />
        </motion.div>

        {/* =========================================
            DIVIDER LINE (Sliding Handle)
           ========================================= */}
        {/* Garis pemisah visual agar transisi terlihat lebih mekanis/teknikal */}
        <motion.div
          style={{ left: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500 to-transparent z-30 shadow-[0_0_20px_#3b82f6]"
        />
      </div>
    </div>
  );
};

// --- REUSABLE CONTENT COMPONENT ---
// Ini memastikan posisi teks dan HP sama persis di kedua layer
const ThemeContent = ({ theme, title, desc, price }) => {
  const isDark = theme === "dark";

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center p-10 gap-10 md:gap-20">
      {/* 1. TEXT CONTENT */}
      <div
        className={`flex-1 text-center md:text-left order-2 md:order-1 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
          {title}
        </h2>
        <p
          className={`text-xl md:text-2xl font-light mb-8 max-w-md ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {desc}
        </p>
        <div className="flex items-center gap-6 justify-center md:justify-start">
          <div>
            <span className="block text-xs font-bold opacity-50 uppercase tracking-widest">
              Starting at
            </span>
            <span className="text-3xl font-bold">{price}</span>
          </div>
          <button
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Pre-order
          </button>
        </div>
      </div>

      {/* 2. PHONE MOCKUP (CHANGES COLOR) */}
      <div className="flex-1 flex justify-center order-1 md:order-2">
        <div
          className={`relative w-[300px] h-[600px] rounded-[45px] border-[8px] shadow-2xl transition-colors duration-0 ${
            isDark
              ? "bg-zinc-900 border-zinc-800 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
              : "bg-gray-100 border-gray-300 shadow-[0_0_100px_rgba(0,0,0,0.1)]"
          }`}
        >
          {/* Camera Bump */}
          <div
            className={`absolute top-6 left-6 w-24 h-24 rounded-3xl border ${
              isDark
                ? "bg-zinc-800 border-zinc-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-gray-500/30 bg-black/20" />
            <div className="absolute top-2 left-2 w-8 h-8 rounded-full border border-gray-500/30 bg-black/20" />
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-gray-500/30 bg-black/20" />
          </div>

          {/* Logo */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black tracking-widest text-xs rotate-90 ${
              isDark ? "text-white/20" : "text-black/20"
            }`}
          >
            ZENITH TITANIUM
          </div>

          {/* Reflection/Gloss */}
          <div className="absolute inset-0 rounded-[35px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitchSection;
