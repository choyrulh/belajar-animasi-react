import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORT GAMBAR
// Pastikan path ini sesuai dengan struktur folder Anda
import silverImg from "/xeron-silver.webp";
import blackImg from "/xeron-black.webp"; // Hapus komentar jika file sudah ada
import goldImg from "/xeron-gold.webp";   // Hapus komentar jika file sudah ada

const ColorVariantSection = () => {
  const [active, setActive] = useState({
    id: "silver",
    name: "Titanium Silver",
    tagline: "The Benchmark of Excellence",
    bg: "#f8f9fa",
    accent: "#ffffff",
    textColor: "text-slate-900",
    filter: "none",
  });

  const variants = [
    {
      id: "black",
      name: "Phantom Black",
      tagline: "Deeply Mysterious",
      bg: "#050505",
      accent: "#1a1a1a",
      textColor: "text-white",
      filter: "brightness(0.4) contrast(1.1) saturate(0.8)",
    },
    {
      id: "silver",
      name: "Titanium Silver",
      tagline: "The Benchmark of Excellence",
      bg: "#f4f4f5",
      accent: "#ffffff",
      textColor: "text-slate-900",
      filter: "none",
    },
    {
      id: "gold",
      name: "Solar Gold",
      tagline: "Radiant & Timeless",
      bg: "#fffbeb",
      accent: "#fde68a",
      textColor: "text-amber-950",
      filter: "sepia(0.6) saturate(1.8) brightness(0.95) hue-rotate(-5deg)",
    },
  ];

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: active.bg }}
    >
      {/* 1. EFEK CAHAYA AMBIENT (Vignette & Glow) */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ background: `radial-gradient(circle at 50% 50%, ${active.accent}33 0%, transparent 70%)` }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center z-10">
        
        {/* 2. KONTEN TEKS (Span 5 Kolom) */}
        <div className="lg:col-span-5 order-2 lg:order-1 text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className={active.textColor}
            >
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.5 }} 
                className="text-sm font-bold tracking-[0.4em] uppercase mb-6 block"
              >
                Xeron Series Z1
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[0.9]">
                {active.name}
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto lg:mx-0 opacity-80 mb-10">
                {active.tagline}. Melampaui batas inovasi dengan material titanium kelas dirgantara.
              </p>
            </motion.div>
          </AnimatePresence>

          {/* COLOR SELECTOR */}
          <div className="flex items-center justify-center lg:justify-start gap-8">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setActive(v)}
                className="group relative flex flex-col items-center gap-3"
              >
                <div 
                  className={`w-14 h-14 rounded-2xl border-2 transition-all duration-500 shadow-sm
                    ${active.id === v.id ? "scale-110 rotate-12 border-current" : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"}
                  `}
                  style={{ backgroundColor: v.id === 'black' ? '#171717' : v.id === 'gold' ? '#fbbf24' : '#d1d5db' }}
                />
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-500 ${active.id === v.id ? "opacity-100" : "opacity-0"}`}>
                  {v.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. DISPLAY PRODUK (Span 7 Kolom) */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center h-[400px] lg:h-[700px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -100 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-2xl flex justify-center"
            >
              {/* Soft Floor Shadow */}
              <div className="absolute -bottom-10 w-[60%] h-12 bg-black/20 blur-[60px] rounded-[100%] z-0" />
              
              {/* Main Product Image */}
              <img
                src={silverImg}
                alt={active.name}
                className="relative z-10 w-full h-auto max-h-[70vh] object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.25)]"
                style={{ filter: active.filter }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Decorative Circle Background */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[120%] h-full border border-black/5 rounded-full z-0 pointer-events-none"
          />
        </div>
      </div>

      {/* Side Progress Branding */}
      <div className={`absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-20 items-center opacity-20 ${active.textColor}`}>
         <div className="h-24 w-[1px] bg-current" />
         <span className="rotate-90 text-[10px] font-black tracking-[0.5em] whitespace-nowrap">PREMIUM QUALITY</span>
         <div className="h-24 w-[1px] bg-current" />
      </div>
    </section>
  );
};

export default ColorVariantSection;