import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Video: Abstrak cepat / Tunnel effect
const GAMING_VIDEO =
  "https://cdn.pixabay.com/video/2019/09/06/26619-359604050_large.mp4";

const GlitchText = ({ children }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] animate-pulse">
        {children}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] animate-pulse delay-75">
        {children}
      </span>
    </div>
  );
};

export default function GamingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center border-y border-gray-800"
    >
      {/* Background Video with heavy blur initially */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={GAMING_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Grid Overlay effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>

      <div className="relative z-20 text-center container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="text-cyan-400 font-mono text-xl mb-4 tracking-[0.5em] uppercase">
            Performance Mode
          </div>

          <h2 className="text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-2 cursor-default hover:scale-105 transition-transform duration-300">
            <GlitchText>120Hz</GlitchText>
          </h2>

          <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
            UNLEASHED
          </h3>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col md:flex-row gap-8 justify-center items-center text-gray-300"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">240Hz</span>
              <span className="text-sm font-mono text-gray-500">
                TOUCH SAMPLING
              </span>
            </div>
            <div className="w-px h-12 bg-gray-700 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">HDR10+</span>
              <span className="text-sm font-mono text-gray-500">
                COLOR GAMUT
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
