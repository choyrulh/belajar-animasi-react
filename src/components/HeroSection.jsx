import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// Semakin besar angkanya, semakin lama user harus scroll untuk menghabiskan video
const PIXELS_PER_SECOND = 400;

const HeroSection = () => {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  // 1. Pastikan durasi video terdeteksi dengan benar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setVideoDuration(video.duration);

    // Cek jika metadata sudah ada (cached)
    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  // 2. Hitung total tinggi scroll berdasarkan durasi video
  // Jika durasi 5 detik * 400px = 2000px tinggi scroll
  const scrollHeight = videoDuration
    ? videoDuration * PIXELS_PER_SECOND
    : "200vh";

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"], // End end memastikan unpin tepat di akhir durasi
  });

  // 3. Update video frame berdasarkan scroll
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!videoRef.current || !videoDuration) return;

    // Mengalikan progress (0-1) dengan total durasi
    videoRef.current.currentTime = videoDuration * progress;
  });

  // 4. Animasi Text & Video
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: scrollHeight }}
      className="relative w-full bg-black"
    >
      {/* STICKY CONTAINER: Ini yang membuat efek "Pin" */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.video
          ref={videoRef}
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://cdn.pixabay.com/video/2021/03/25/68962-529839776_large.mp4"
            type="video/mp4"
          />
        </motion.video>

        {/* Overlay agar teks terbaca */}
        <div className="absolute inset-0 bg-black/30" />

        {/* CONTENT */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
            Xeron Z1
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-4">
            The future of vision.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
