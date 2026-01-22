import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const contentData = [
  {
    id: 1,
    videoUrl:
      "https://videocdn.cdnpk.net/videos/336bd392-5044-545b-a76a-384becb13143/horizontal/previews/clear/large.mp4?token=exp=1767600557~hmac=cea96eb37d0b29dd9f9485340ef93c25f12c479eca23af029fd2f8551072156e",
    title: "Revolutionary Vision",
    description:
      "Nikmati pengalaman visual yang belum pernah ada sebelumnya. Layar imersif yang menangkap setiap detail dengan kejernihan sempurna.",
  },
  {
    id: 2,
    videoUrl:
      "https://videocdn.cdnpk.net/videos/ba59e768-9608-59b5-9639-1b664d940fb0/horizontal/previews/clear/large.mp4?token=exp=1767600390~hmac=b213fd4dcf4b3256743ffa27f1e463d7acb329e6a15edee996f2b9857778b06b",
    title: "Unstoppable Flow",
    description:
      "Performa tanpa batas yang mengalir secepat pikiran Anda. Konektivitas dan kecepatan pemrosesan tingkat lanjut untuk masa depan.",
  },
];

export default function SequentialVideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Mendeteksi apakah section terlihat di layar (threshold 0.5 artinya 50% terlihat)
  const isInView = useInView(containerRef, { amount: 0.5, once: false });

  // Handle ketika video selesai diputar
  const handleVideoEnded = () => {
    // Pindah ke video berikutnya, jika sudah terakhir kembali ke awal (loop)
    // Jika tidak ingin loop, tambahkan logika if (currentIndex < contentData.length - 1)
    setCurrentIndex((prev) => (prev + 1) % contentData.length);
  };

  // Efek untuk memutar video saat masuk viewport dan mengganti source saat index berubah
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        // Load ulang source jika index berubah agar video baru siap
        videoRef.current.load();
        videoRef.current
          .play()
          .catch((e) => console.log("Autoplay prevented", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, currentIndex]);

  const currentContent = contentData[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />{" "}
        {/* Overlay Gelap */}
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src={currentContent.videoUrl} type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} // Key penting agar animasi ulang saat index berubah
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {currentContent.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed px-4">
              {currentContent.description}
            </p>

            {/* Indikator Progress Video (Opsional) */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {contentData.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-8 sm:w-12 bg-white"
                      : "w-2 sm:w-3 bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
