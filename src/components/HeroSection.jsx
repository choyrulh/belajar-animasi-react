import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const PIXELS_PER_FRAME = 120; 
const TOTAL_FRAMES = 17;

const HeroSection = () => {
  const wrapperRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Path: public/XeronZ1/ezgif-frame-001.jpg s/d 017.jpg
  const images = useMemo(() => {
    const framePaths = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNumber = i.toString().padStart(3, "0");
      framePaths.push(`/XeronZ1/ezgif-frame-${frameNumber}.jpg`);
    }
    return framePaths;
  }, []);

  // 2. Preload Logic
  useEffect(() => {
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setIsLoaded(true);
      };
    });
  }, [images]);

  const scrollHeight = TOTAL_FRAMES * PIXELS_PER_FRAME;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Memastikan index berhenti di frame terakhir (16) dan tidak error
    const index = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * TOTAL_FRAMES)
    );
    setCurrentFrame(index);
  });

  // Animasi Teks (Tetap menghilang agar konten section bawah tidak tertutup teks)
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  /** * PERUBAHAN DISINI: 
   * Kita tidak lagi mengubah opacity container ke 0 di akhir scroll.
   * Frame terakhir akan tetap tampil (pinned) sampai section ini benar-benar terdorong ke atas.
   */

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${scrollHeight}px` }}
      className="relative w-full bg-black"
    >
      {/* Sticky container menjaga gambar tetap di layar selama scrollHeight belum habis */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {isLoaded ? (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={images[currentFrame]}
              alt="Xeron Z1 Animation"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="text-white animate-pulse">Initializing...</div>
        )}

        {/* Overlay gelap agar teks lebih kontras */}
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
            Xeron Z1
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            The future of vision.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;