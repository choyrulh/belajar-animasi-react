import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const features = [
  "Snapdragon 8 Gen 3",
  "200MP Ultra Vision Camera",
  "Titanium Grade 5 Body",
  "6.8-inch Dynamic AMOLED",
  "5000mAh All-Day Battery",
  "IP68 Water Resistance",
  "Wi-Fi 7 Ready",
  "Hyper-Fast AI Processing",
];

const MarqueeSection = () => {
  const containerRef = useRef(null);

  // Semakin tinggi nilai height, semakin lambat scroll per kalimatnya
  const sectionHeight = `${features.length * 80}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Gunakan spring agar transisi perpindahan teks terasa kenyal/smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiction: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Menggerakkan teks ke atas berdasarkan jumlah item
  // -100 * (jumlah_item - 1) / jumlah_item
  const translateY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${(100 * (features.length - 1)) / features.length}%`],
  );

  return (
    <motion.section
      ref={containerRef}
      style={{ height: sectionHeight }}
      className="relative bg-black"
    >
      {/* STICKY CONTAINER (PIN) */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* VINTAGE HIGHLIGHT OVERLAY (Vignette & Center Light) */}
        <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_150px_rgba(0,0,0,1)] bg-[radial-gradient(circle,transparent_20%,black_80%)]" />

        {/* HORIZONTAL LINE INDICATOR (Opsional: Memberi kesan mekanis) */}
        <div className="absolute w-full h-[150px] border-y border-white/10 z-10 pointer-events-none" />

        {/* VERTICAL TEXT CONTAINER */}
        <div className="h-[150px] overflow-visible text-center">
          <motion.div
            style={{ y: translateY }}
            className="flex flex-col items-center"
          >
            {features.map((feature, i) => {
              return (
                <FeatureText
                  key={i}
                  text={feature}
                  index={i}
                  progress={smoothProgress}
                  total={features.length}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Sub-komponen untuk handle opacity & scale masing-masing baris
const FeatureText = ({ text, index, progress, total }) => {
  const range = [index / total, (index + 0.5) / total, (index + 1) / total];

  // Efek: Teks yang di tengah akan terang, yang di atas/bawah akan redup dan mengecil
  const opacity = useTransform(progress, range, [0.1, 1, 0.1]);
  const scale = useTransform(progress, range, [0.7, 1.2, 0.7]);
  const blur = useTransform(progress, range, ["4px", "0px", "4px"]);

  return (
    <motion.div
      style={{ opacity, scale, filter: blur }}
      className="h-[150px] flex items-center justify-center whitespace-nowrap px-4 sm:px-6 md:px-10"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter text-white">
        {text}
      </h2>
    </motion.div>
  );
};

export default MarqueeSection;
