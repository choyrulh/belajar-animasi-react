import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const OrbitSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

  return (
    <section
      ref={ref}
      className="h-screen bg-black flex items-center justify-center perspective-[2000px] z-10 overflow-hidden"
    >
      <div className="text-center absolute top-20">
        <h2 className="text-4xl font-bold">Perfect from every angle.</h2>
      </div>
      <motion.div
        style={{ rotateY, filter: `brightness(${brightness})` }}
        className="w-64 h-[500px] bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-[3rem] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center relative"
      >
        <div className="absolute inset-y-10 inset-x-2 bg-black rounded-[2.5rem] shadow-inner" />
        <span className="z-10 text-white/10 text-9xl font-black italic">Z</span>
      </motion.div>
    </section>
  );
};

export default OrbitSection;
