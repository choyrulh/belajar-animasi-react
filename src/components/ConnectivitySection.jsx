import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// IMPORT GAMBAR
// Pastikan path ini sesuai. 
// Saya menggunakan 'watch-xeron.png' yang baru Anda upload.
// Saya menggunakan 'xeron-silver.webp' dari upload sebelumnya sebagai pusat (Phone).
import phoneImg from "/xeronZ1back.webp"; 
import watchImg from "/watch-xeron.webp";

// Placeholder untuk Laptop dan Buds (Ganti import ini dengan file asli Anda nanti)
import laptopImg from "/laptop-xeron.webp";
import budsImg from "/earbuds-xeron.webp";
// SEMENTARA: Saya pakai URL dummy transparan agar tidak error, ganti dengan import di atas
// const laptopImg = "https://cdn.pixabay.com/photo/2014/09/24/16/28/notebook-459635_1280.png"; // Contoh placeholder
// const budsImg = "https://cdn.pixabay.com/photo/2019/11/03/19/33/earphones-4599694_1280.png"; // Contoh placeholder

const ConnectivitySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animasi Skala & Opacity
  // Ukuran Ponsel ditingkatkan dari 1 menjadi 1.25 pada puncaknya
  const centerScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1.25]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Produk Periferal (Watch, Laptop, Buds) - Muncul dengan skala lebih besar
  const watchScale = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1.1]);
  const budsScale = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1.1]);
  const laptopScale = useTransform(scrollYProgress, [0.5, 0.7], [0.5, 1.1]);

  const pathLength = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Ambient Glow yang lebih besar */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.2, 0.5]) }}
          className="absolute w-[1000px] h-[1000px] bg-blue-900/20 blur-[150px] rounded-full"
        />

        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
          
          {/* 1. CENTER: PHONE (Ukuran diperbesar menjadi w-64 ke atas) */}
          <motion.div 
            style={{ scale: centerScale, opacity: centerOpacity }}
            className="relative z-30 flex flex-col items-center"
          >
            <img
              src={phoneImg}
              alt="Xeron Phone"
              className="w-56 md:w-80 h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm text-white font-black tracking-[0.3em] uppercase"
            >
              The Core
            </motion.div>
          </motion.div>

          {/* 2. WATCH (Kiri Atas - Diperbesar) */}
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
              scale: watchScale,
              left: "10%",
              top: "15%"
            }}
            className="absolute z-20 flex flex-col items-center"
          >
            <img src={watchImg} alt="Watch" className="w-40 md:w-56 drop-shadow-2xl" />
            <span className="mt-4 text-sm font-bold text-blue-400 tracking-widest uppercase">Xeron Watch</span>
          </motion.div>

          {/* 3. LAPTOP (Kanan Atas - Diperbesar) */}
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]),
              scale: laptopScale,
              right: "5%",
              top: "10%"
            }}
            className="absolute z-20 flex flex-col items-center"
          >
            <img src={laptopImg} alt="Laptop" className="w-64 md:w-[500px] drop-shadow-2xl" />
            <span className="mt-4 text-sm font-bold text-blue-400 tracking-widest uppercase">Xeron Book</span>
          </motion.div>

          {/* 4. BUDS (Kanan Bawah - Diperbesar) */}
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
              scale: budsScale,
              right: "15%",
              bottom: "15%"
            }}
            className="absolute z-20 flex flex-col items-center"
          >
            <img src={budsImg} alt="Buds" className="w-32 md:w-48 drop-shadow-2xl" />
            <span className="mt-4 text-sm font-bold text-blue-400 tracking-widest uppercase">Xeron Buds</span>
          </motion.div>

          {/* SVG Garis Koneksi - Disesuaikan dengan ukuran baru */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1200 800">
            <motion.path
              d="M 600 400 L 250 250" // Ke Watch
              fill="transparent" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 8"
              style={{ pathLength }}
            />
            <motion.path
              d="M 600 400 L 950 250" // Ke Laptop
              fill="transparent" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 8"
              style={{ pathLength }}
            />
            <motion.path
              d="M 600 400 L 900 650" // Ke Buds
              fill="transparent" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 8"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Heading bawah ditingkatkan ukurannya */}
        <motion.div
          style={{ opacity: pathLength }}
          className="absolute bottom-12 text-center"
        >
          <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            Seamless Power
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto mt-4" />
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectivitySection;