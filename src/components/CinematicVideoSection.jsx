import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Video: Pemandangan malam kota/cyberpunk (Low Light capability)
const VIDEO_URL =
  "https://videos.pexels.com/video-files/27152555/12085629_2560_1440_25fps.mp4";
// Note: Gunakan link di bawah jika token expired, atau ganti dengan stock video "Night City Bokeh"
// Backup Link (Pixabay direct): "https://cdn.pixabay.com/video/2023/10/12/184734-873923030_large.mp4"

export default function CinematicVideoSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Efek scale video dari kecil (0.8) ke full screen (1)
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  // Efek border radius dari bulat ke kotak saat full screen
  const borderRadius = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ["40px", "0px"],
  );
  // Teks bergerak parallax
  const yText = useTransform(scrollYProgress, [0.2, 0.6], [100, -100]);
  const opacityText = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Video Container dengan Motion */}
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full overflow-hidden shadow-2xl z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            {/* Menggunakan link Pixabay yang stabil sebagai contoh */}
            <source
              src="https://videos.pexels.com/video-files/27152555/12085629_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Overlay Text */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-4 sm:left-6 md:left-20 right-4 sm:right-6 z-20 max-w-2xl"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-3 sm:mb-4 tracking-tighter drop-shadow-lg">
            Nightography.
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light drop-shadow-md">
            Tangkap keajaiban malam dengan sensor AI terbaru. Cahaya minim,
            detail maksimal.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
