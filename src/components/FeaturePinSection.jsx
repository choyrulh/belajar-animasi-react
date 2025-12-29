import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FeaturePinSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Menghaluskan scroll progress untuk animasi yang lebih organik
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Pengaturan Tahapan Animasi (0.0 - 0.33, 0.33 - 0.66, 0.66 - 1.0)
  // Teks 1
  const opacity1 = useTransform(smoothProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.25, 0.3], [0, 0, -50]);

  // Teks 2
  const opacity2 = useTransform(
    smoothProgress,
    [0.3, 0.4, 0.6, 0.65],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(
    smoothProgress,
    [0.3, 0.4, 0.6, 0.65],
    [50, 0, 0, -50]
  );

  // Teks 3
  const opacity3 = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const y3 = useTransform(smoothProgress, [0.65, 0.75, 1], [50, 0, 0]);

  // Transformasi Visual (Scale & Blur)
  const scaleImg = (start, peak, end) =>
    useTransform(
      smoothProgress,
      [start, peak, peak + 0.2, end],
      [0.8, 1, 1, 0.8]
    );

  const imageUrls = {
    1: "https://images.unsplash.com/photo-1658036680473-32c68142b2a7?auto=format&fit=crop&q=80&w=1000",
    2: "https://images.unsplash.com/photo-1760597371617-5c0652f58178?auto=format&fit=crop&q=80&w=1000",
    3: "https://images.unsplash.com/photo-1608300927007-aa232f832950?auto=format&fit=crop&q=80&w=1000",
  };

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Background Glow yang berubah warna */}
        <motion.div
          style={{
            background: useTransform(
              smoothProgress,
              [0, 0.4, 0.75],
              [
                "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,1) 70%)", // Blue
                "radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.15) 0%, rgba(0,0,0,1) 70%)", // Gray
                "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,1) 70%)", // Purple
              ]
            ),
          }}
          className="absolute inset-0 z-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full px-12 relative z-10">
          {/* Kolom Kiri: Teks Sticky Reveal */}
          <div className="relative h-[300px] flex items-center">
            <motion.div
              style={{ opacity: opacity1, y: y1 }}
              className="absolute w-full"
            >
              <span className="text-blue-500 font-mono text-sm tracking-widest mb-4 block uppercase font-bold">
                Display
              </span>
              <h2 className="text-6xl font-black text-white mb-6 leading-tight">
                Ultra Retina <br /> XDR
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Pixels so small, you can't see them. Colors so vivid, they feel
                real.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: opacity2, y: y2 }}
              className="absolute w-full"
            >
              <span className="text-gray-400 font-mono text-sm tracking-widest mb-4 block uppercase font-bold">
                Material
              </span>
              <h2 className="text-6xl font-black text-white mb-6 leading-tight">
                Titanium <br /> Grade 5
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Lighter. Stronger. Built for the extremes of your life.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: opacity3, y: y3 }}
              className="absolute w-full"
            >
              <span className="text-purple-500 font-mono text-sm tracking-widest mb-4 block uppercase font-bold">
                Performance
              </span>
              <h2 className="text-6xl font-black text-white mb-6 leading-tight">
                Neural <br /> Engine
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                AI processing at the speed of thought. Learning from you, for
                you.
              </p>
            </motion.div>
          </div>

          {/* Kolom Kanan: Visual Frame Reveal */}
          <div className="flex items-center justify-center relative h-[500px]">
            {/* Frame 1 */}
            <motion.div
              style={{
                opacity: opacity1,
                scale: useTransform(smoothProgress, [0, 0.3], [1, 1.1]),
                rotate: useTransform(smoothProgress, [0, 0.3], [0, -2]),
              }}
              className="absolute w-full h-full"
            >
              <div className="w-full h-full rounded-[40px] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-neutral-900">
                <img
                  src={imageUrls[1]}
                  alt="Display"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Frame 2 */}
            <motion.div
              style={{
                opacity: opacity2,
                scale: useTransform(
                  smoothProgress,
                  [0.35, 0.5, 0.65],
                  [0.8, 1, 0.8]
                ),
                rotate: useTransform(
                  smoothProgress,
                  [0.35, 0.5, 0.65],
                  [2, 0, -2]
                ),
              }}
              className="absolute w-full h-full"
            >
              <div className="w-full h-full rounded-[40px] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] bg-neutral-900">
                <img
                  src={imageUrls[2]}
                  alt="Titanium"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Frame 3 */}
            <motion.div
              style={{
                opacity: opacity3,
                scale: useTransform(
                  smoothProgress,
                  [0.65, 0.8, 1],
                  [0.8, 1, 1]
                ),
                rotate: useTransform(smoothProgress, [0.65, 0.8, 1], [2, 0, 0]),
              }}
              className="absolute w-full h-full"
            >
              <div className="w-full h-full rounded-[40px] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] bg-neutral-900">
                <img
                  src={imageUrls[3]}
                  alt="Neural Engine"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturePinSection;
