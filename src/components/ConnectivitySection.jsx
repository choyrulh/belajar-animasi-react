import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Share2, Watch, Headphones, Laptop } from "lucide-react";

const ConnectivitySection = () => {
  const containerRef = useRef(null);

  // Kita buat height 300vh agar ada cukup ruang scroll untuk urutan animasi
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Urutan Animasi (Sequencing) berdasarkan progress 0 sampai 1:
  // 0.0 - 0.2: Watch muncul
  // 0.2 - 0.4: Buds muncul
  // 0.4 - 0.6: Laptop muncul
  // 0.6 - 1.0: Garis SVG menghubungkan semuanya

  const watchOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const watchScale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  const budsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const budsScale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);

  const laptopOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const laptopScale = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1]);

  const pathLength = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      {/* PIN SECTION */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl h-[600px]">
          {/* CENTER: SMARTPHONE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-[2.5rem] border-4 border-gray-600 z-30 flex items-center justify-center shadow-2xl">
            <Share2 className="text-blue-400 w-10 h-10" />
            <div className="absolute top-2 w-12 h-1 bg-black rounded-full" />{" "}
            {/* Speaker detail */}
          </div>

          {/* PERIPHERAL: WATCH (Top Left) */}
          <motion.div
            style={{ opacity: watchOpacity, scale: watchScale }}
            className="absolute top-10 left-10 md:left-20 w-28 h-28 bg-gray-900/80 backdrop-blur-md rounded-full border border-blue-500/30 flex flex-col items-center justify-center text-gray-300 z-20"
          >
            <Watch className="mb-1 text-blue-400" />
            <span className="text-xs font-bold">WATCH</span>
          </motion.div>

          {/* PERIPHERAL: BUDS (Bottom Right) */}
          <motion.div
            style={{ opacity: budsOpacity, scale: budsScale }}
            className="absolute bottom-10 right-10 md:right-20 w-28 h-28 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center text-gray-300 z-20"
          >
            <Headphones className="mb-1 text-blue-400" />
            <span className="text-xs font-bold">BUDS</span>
          </motion.div>

          {/* PERIPHERAL: LAPTOP (Top Right) */}
          <motion.div
            style={{ opacity: laptopOpacity, scale: laptopScale }}
            className="absolute top-10 right-10 md:right-20 w-32 h-24 bg-gray-900/80 backdrop-blur-md rounded-lg border border-blue-500/30 flex flex-col items-center justify-center text-gray-300 z-20"
          >
            <Laptop className="mb-1 text-blue-400" />
            <span className="text-xs font-bold">LAPTOP</span>
          </motion.div>

          {/* SVG CONNECTING LINES */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 800 600"
          >
            {/* Line to Watch */}
            <motion.path
              d="M 400 300 L 200 300 L 150 150"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Line to Buds */}
            <motion.path
              d="M 400 300 L 600 300 L 650 450"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Line to Laptop */}
            <motion.path
              d="M 400 300 L 600 300 L 650 150"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>
        </div>

        <motion.div
          style={{ opacity: pathLength }}
          className="text-center mt-10"
        >
          <h2 className="text-white text-4xl font-bold tracking-tighter">
            UNIFIED ECOSYSTEM
          </h2>
          <p className="text-blue-400 font-medium">
            Everything works together.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ConnectivitySection;
