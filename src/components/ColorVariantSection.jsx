import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ColorVariantSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mengubah scroll vertikal menjadi pergeseran horizontal
  // Kita punya 3 slide, jadi kita geser container sejauh -200% (2 slide penuh)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const colors = [
    { name: "Phantom Black", bg: "bg-gray-900", accent: "text-gray-500" },
    { name: "Titanium Silver", bg: "bg-gray-300", accent: "text-gray-800" },
    { name: "Deep Nebula", bg: "bg-indigo-900", accent: "text-indigo-400" },
  ];

  return (
    <section ref={targetRef} className="h-[300vh] relative z-10 bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw]">
          {colors.map((color, i) => (
            <div
              key={i}
              className={`w-screen h-screen flex flex-col items-center justify-center ${color.bg} relative`}
            >
              {/* Phone Mockup */}
              <div className="w-[300px] h-[600px] border-[12px] border-black/20 rounded-[3rem] shadow-2xl bg-black/10 backdrop-blur-sm z-10 flex items-center justify-center">
                <span className={`text-2xl font-bold ${color.accent}`}>
                  Xeron Z1
                </span>
              </div>

              <div className="absolute bottom-20 text-center">
                <h3
                  className={`text-6xl font-black uppercase tracking-tighter mb-2 ${
                    i === 1 ? "text-black" : "text-white"
                  }`}
                >
                  {color.name}
                </h3>
                <p className={i === 1 ? "text-gray-700" : "text-gray-400"}>
                  Designed to stand out.
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ColorVariantSection;
