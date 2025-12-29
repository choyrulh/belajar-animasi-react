import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GravitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <section
      ref={ref}
      className="h-screen bg-black flex flex-col items-center justify-center z-10"
    >
      <div className="relative w-80 h-[500px]">
        {/* The Landing Platform (Phone) */}
        <div className="absolute bottom-0 w-full h-20 bg-gray-800 rounded-t-[3rem] border-t-2 border-white/20" />

        {/* Falling Objects */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -500, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -500, opacity: 0 }}
            transition={{
              type: "spring",
              bounce: 0.5,
              duration: 2,
              delay: i * 0.2,
            }}
            className="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-black font-bold"
            style={{ left: `${20 + i * 15}%`, bottom: "20px" }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
      <h2 className="mt-10 text-3xl font-bold">Resistant to impact.</h2>
    </section>
  );
};

export default GravitySection;
