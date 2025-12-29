import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Music } from "lucide-react";

const AudioSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mengontrol seberapa "tinggi" bar bisa memanjang berdasarkan scroll
  const amp = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1.5, 0.2]);

  return (
    <section
      ref={ref}
      className="h-[80vh] bg-black flex flex-col items-center justify-center z-10"
    >
      <Music className="text-purple-500 mb-8 w-12 h-12" />
      <h2 className="text-5xl font-bold text-white mb-16">
        Spatial Audio. Surround Yourself.
      </h2>

      <div className="flex items-center justify-center gap-2 h-64">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{ scaleY: amp }} // Scroll mempengaruhi scale global
            animate={{
              height: [20, Math.random() * 150 + 50, 20], // Random animasi loop
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05, // Stagger effect
            }}
            className="w-4 bg-gradient-to-t from-purple-900 to-pink-500 rounded-full"
          />
        ))}
      </div>
    </section>
  );
};

export default AudioSection;
