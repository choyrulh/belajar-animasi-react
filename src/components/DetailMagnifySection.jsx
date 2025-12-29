import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Aperture, Maximize, Target } from "lucide-react";

const MacroCameraSection = () => {
  const containerRef = useRef(null);

  // useScroll dengan target container yang tinggi (untuk pinning effect)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // --- TRANSISI TIMING ---

  // 1. Zoom In Lensa (Muncul di tengah scroll 0.2 - 0.5)
  const lensScale = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  const lensOpacity = useTransform(
    smoothProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0, 1, 1, 0]
  );

  // 2. Pergerakan Lensa setelah muncul (0.4 - 0.8)
  const x = useTransform(smoothProgress, [0.4, 0.8], ["0%", "40%"]);
  const y = useTransform(smoothProgress, [0.4, 0.8], ["0%", "10%"]);

  // 3. Efek blur background (Makin blur saat lensa muncul)
  const bgBlur = useTransform(
    smoothProgress,
    [0, 0.3],
    ["blur(0px)", "blur(12px)"]
  );
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  const macroImg =
    "https://images.unsplash.com/photo-1669735828046-4eddc77a321f?q=80&w=4000";

  return (
    // Container tinggi 300vh untuk memberikan ruang 'pinning'
    <section ref={containerRef} className="h-[300vh] bg-black relative">
      {/* Sticky Content: Area yang akan diam saat di-scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Header Teks yang muncul perlahan */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.1, 0.3], [0, 1]) }}
          className="absolute top-16 z-30 text-center px-6"
        >
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs mb-2 tracking-[0.3em]">
            <Target size={14} />
            <span>MACRO PRECISION</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white italic">
            BEYOND{" "}
            <span className="text-cyan-500 underline decoration-cyan-500/30">
              VISION
            </span>
          </h2>
        </motion.div>

        {/* Viewfinder Main Container */}
        <div className="relative w-[90%] max-w-6xl h-[70vh] bg-neutral-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
          {/* Background: Mula-mula tajam, lalu blur saat lensa muncul */}
          <motion.div
            style={{ filter: bgBlur, scale: bgScale }}
            className="absolute inset-0 opacity-40 grayscale-[0.2]"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${macroImg})` }}
            />
          </motion.div>

          {/* HUD UI Kamera */}
          <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none z-20">
            <div className="flex justify-between items-start opacity-30 font-mono text-[10px] text-white">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>REC 4K HDR</span>
              </div>
              <span>AF-LOCK ACTIVATED</span>
            </div>
            <div className="flex justify-center opacity-20">
              <Maximize size={40} className="text-white font-thin" />
            </div>
            <div className="flex justify-between items-end opacity-30 font-mono text-[10px] text-white">
              <span>MAG: 15.0x</span>
              <div className="w-24 h-[1px] bg-white/50" />
              <span>F/2.4</span>
            </div>
          </div>

          {/* --- THE LENS: Muncul dengan Zoom In --- */}
          <motion.div
            style={{
              x,
              y,
              scale: lensScale,
              opacity: lensOpacity,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] z-30"
          >
            {/* Lensa Bulat High-Definition */}
            <div className="absolute inset-0 rounded-full border-[1px] border-cyan-400/40 bg-black shadow-[0_0_80px_rgba(34,211,238,0.2)] overflow-hidden">
              {/* Gambar Tajam di dalam Lensa (Counter Movement agar objek tetap di tempat) */}
              <motion.div
                style={
                  ({
                    x: useTransform(x, (v) => `calc(-${v} * 1.3)`),
                    y: useTransform(y, (v) => `calc(-${v} * 1.3)`),
                    scale: useTransform(smoothProgress, [0.3, 0.8], [1.5, 1.8]), // Extra zoom inside lens
                  },
                  { backgroundImage: `url(${macroImg})` })
                }
                className="absolute inset-[-100%] w-[300%] h-[300%] bg-cover bg-center blur-0 grayscale-0"
              />

              {/* Lens Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />

              {/* Central Target UI */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-40 h-40 border border-cyan-500/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                </motion.div>
              </div>
            </div>

            {/* Floating Lens Info */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.4, 0.5], [0, 1]),
              }}
              className="absolute -right-4 top-1/4 bg-black/80 backdrop-blur-md border border-cyan-500/30 p-3 rounded-lg text-white"
            >
              <p className="text-[10px] font-mono text-cyan-400 tracking-tighter">
                SURFACE SCAN
              </p>
              <p className="text-xs font-bold leading-none">99.2% REFINED</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Decorative Text */}
        <motion.div
          style={{
            opacity: useTransform(
              smoothProgress,
              [0, 0.2, 0.8, 1],
              [0, 0.05, 0.05, 0]
            ),
            scale: useTransform(smoothProgress, [0, 1], [1, 1.5]),
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span className="text-[30vw] font-black text-white">MACRO</span>
        </motion.div>
      </div>
    </section>
  );
};

export default MacroCameraSection;
