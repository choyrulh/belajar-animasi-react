import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const XRaySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scanX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);

  return (
    <section
      ref={ref}
      className="h-screen bg-black flex items-center justify-center z-10 overflow-hidden"
    >
      <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border border-white/10 overflow-hidden">
        {/* Normal Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold opacity-20">Normal View</h3>
        </div>

        {/* X-Ray Slider */}
        <motion.div
          style={{ x: scanX }}
          className="absolute inset-0 w-full bg-blue-500/20 backdrop-invert flex items-center justify-center z-20 border-x border-blue-400"
        >
          <div className="text-blue-400 font-mono text-xs">
            INTERNAL SCAN: 85%
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default XRaySection;
