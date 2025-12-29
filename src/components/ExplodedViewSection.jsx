import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ExplodedViewSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const yScreen = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBattery = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yBoard = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="h-[200vh] bg-black z-10 relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <h2 className="absolute top-20 text-4xl font-bold">
          Incredible Internals.
        </h2>
        <div className="relative w-64 h-[500px]">
          {/* Layer 1: Back Cover */}
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 bg-gray-800 rounded-[3rem] border border-white/10"
          />
          {/* Layer 2: Motherboard */}
          <motion.div
            style={{ y: yBoard }}
            className="absolute inset-10 bg-green-900/40 rounded-xl border border-green-500/30 flex items-center justify-center"
          >
            <div className="w-10 h-10 bg-green-500 rounded-sm" />
          </motion.div>
          {/* Layer 3: Battery */}
          <motion.div
            style={{ y: yBattery }}
            className="absolute inset-x-8 top-40 bottom-20 bg-gray-700 rounded-2xl border border-white/10"
          />
          {/* Layer 4: Screen Overlay */}
          <motion.div
            style={{ y: yScreen }}
            className="absolute inset-0 bg-blue-500/20 rounded-[3rem] border-2 border-blue-400/50 backdrop-blur-sm shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ExplodedViewSection;
