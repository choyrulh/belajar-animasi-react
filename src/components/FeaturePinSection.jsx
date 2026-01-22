import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, Maximize, Shield, Zap, Layers, Aperture } from "lucide-react";

const FeaturePinSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // --- TRANSISI GLOBAL ---
  // Background Image Opacity & Scale
  const img1Opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const img2Opacity = useTransform(
    smoothProgress,
    [0.3, 0.4, 0.6, 0.7],
    [0, 1, 1, 0],
  );
  const img3Opacity = useTransform(smoothProgress, [0.7, 0.8, 1], [0, 1, 1]);

  const imgScale = useTransform(smoothProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(smoothProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="h-[400vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* --- LAYER 1: BACKGROUND IMAGES (FULL SECTION) --- */}
        <div className="absolute inset-0 z-0">
          <BackgroundImage
            src="https://images.unsplash.com/photo-1764155061954-1b5672adf772?q=80&w=2000&auto=format&fit=crop"
            opacity={img1Opacity}
            scale={imgScale}
          />
          <BackgroundImage
            src="https://images.unsplash.com/photo-1716436329478-9c954c6bd611?q=80&w=2000&auto=format&fit=crop"
            opacity={img2Opacity}
            scale={imgScale}
          />
          <BackgroundImage
            src="https://images.unsplash.com/photo-1718998673030-02e522979dca?q=80&w=2000&auto=format&fit=crop"
            opacity={img3Opacity}
            scale={imgScale}
          />

          {/* Global Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          <div className="absolute inset-0 bg-black/20 backdrop-brightness-75" />
        </div>

        {/* --- LAYER 2: CONTENT (FLOATING) --- */}
        <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div style={{ y: textY }} className="relative h-[500px]">
              {/* CONTENT SCENE 1 */}
              <SceneContent
                opacity={img1Opacity}
                tag="Display"
                title="Super Retina XDR"
                desc="Our most advanced display ever. Featuring ProMotion technology for a faster, more responsive feel."
                specs={[
                  {
                    icon: Maximize,
                    label: "2000 nits",
                    sub: "Peak Brightness",
                  },
                  { icon: Zap, label: "120Hz", sub: "Refresh Rate" },
                ]}
              />

              {/* CONTENT SCENE 2 */}
              <SceneContent
                opacity={img2Opacity}
                tag="Performance"
                title="A18 Pro Chip"
                desc="A monster of a chip. Delivering pro performance for high-end gaming and AI-driven photography."
                specs={[
                  { icon: Cpu, label: "3nm", sub: "Process Node" },
                  { icon: Layers, label: "6-Core", sub: "Pro GPU" },
                ]}
              />

              {/* CONTENT SCENE 3 */}
              <SceneContent
                opacity={img3Opacity}
                tag="Durability"
                title="Titanium Forged"
                desc="Strong. Light. Pro. Using the same alloy used in spacecraft sent to Mars."
                specs={[
                  { icon: Shield, label: "Grade 5", sub: "Strength" },
                  { icon: Aperture, label: "Matte", sub: "Textured Finish" },
                ]}
              />
            </motion.div>

            {/* Empty column for visual breathing space on desktop */}
            <div className="hidden md:block" />
          </div>
        </div>

        {/* Interactive Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTS ---

const BackgroundImage = ({ src, opacity, scale }) => (
  <motion.div
    style={{ opacity, scale }}
    className="absolute inset-0 w-full h-full"
  >
    <img
      src={src}
      className="w-full h-full object-cover"
      alt="Background Feature"
    />
  </motion.div>
);

const SceneContent = ({ opacity, tag, title, desc, specs }) => (
  <motion.div
    style={{ opacity }}
    className="absolute inset-0 flex flex-col justify-center"
  >
    <span className="text-blue-400 font-mono text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-4 block">
      {tag}
    </span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-none">
      {title}
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed">
      {desc}
    </p>

    {/* Specs Grid with Glassmorphism */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
      {specs.map((spec, i) => (
        <div
          key={i}
          className="flex items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl"
        >
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <spec.icon size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold leading-none mb-1 text-sm sm:text-base">
              {spec.label}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">
              {spec.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default FeaturePinSection;
