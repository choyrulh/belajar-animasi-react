import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BrightnessSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const flashOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.9, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <section
      ref={ref}
      className="h-screen bg-black flex items-center justify-center z-10 relative"
    >
      <motion.div style={{ scale }} className="text-center z-20">
        <h2 className="text-6xl font-black">4000 NITS.</h2>
        <p className="text-xl text-gray-400">Brighter than the sun.</p>
      </motion.div>

      {/* The Flash Overlay */}
      <motion.div
        style={{ opacity: flashOpacity }}
        className="absolute inset-0 bg-white z-10 pointer-events-none"
      />
    </section>
  );
};

export default BrightnessSection;
