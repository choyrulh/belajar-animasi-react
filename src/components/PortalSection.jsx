import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PortalSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 50]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={ref} className="h-[200vh] bg-white z-10">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="w-64 h-64 rounded-full bg-black border-[20px] border-gray-900 flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-900 to-purple-900" />
        </motion.div>
        <motion.h2
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-20 text-black font-bold text-2xl"
        >
          Zoom into the future.
        </motion.h2>
      </div>
    </section>
  );
};

export default PortalSection;
