import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SplitSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const leftX = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-30%"]);
  const rightX = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="h-screen bg-white flex items-center justify-center z-10 overflow-hidden"
    >
      <div className="relative flex">
        <motion.div
          style={{ x: leftX }}
          className="w-40 h-80 bg-blue-600 rounded-l-3xl border-r-2 border-white flex items-center justify-center"
        >
          <span className="text-white font-bold">Work</span>
        </motion.div>
        <motion.div
          style={{ x: rightX }}
          className="w-40 h-80 bg-red-600 rounded-r-3xl flex items-center justify-center"
        >
          <span className="text-white font-bold">Play</span>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitSection;
