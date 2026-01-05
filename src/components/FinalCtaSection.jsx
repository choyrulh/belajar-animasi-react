import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";

const FinalCtaSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Animasi Transformasi
  const scale = useTransform(smoothProgress, [0, 1], [0.7, 1]);
  const y = useTransform(smoothProgress, [0, 1], [150, 0]);
  const imgOpacity = useTransform(smoothProgress, [0.3, 0.8], [0, 0.6]);
  const textReveal = useTransform(
    smoothProgress,
    [0.4, 0.9],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Gambar Produk Unsplash
  const imgProduct =
    "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2000&auto=format&fit=crop";

  return (
    <section
      ref={containerRef}
      className="h-[120vh] bg-black flex flex-col items-center justify-end relative overflow-hidden pb-24"
    >
      {/* Background Image Reveal */}
      <motion.div
        style={{
          opacity: imgOpacity,
          scale: useTransform(smoothProgress, [0, 1], [1.2, 1]),
        }}
        className="absolute inset-0 z-0"
      >
        <img
          src={imgProduct}
          alt="Xeron Z1"
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </motion.div>

      {/* Dynamic Glow Orb */}
      <motion.div
        style={{
          scale: useTransform(smoothProgress, [0.5, 1], [0.5, 2]),
          opacity: useTransform(smoothProgress, [0.5, 1], [0, 0.4]),
        }}
        className="absolute bottom-0 w-[800px] h-[400px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Content Wrapper */}
      <motion.div
        style={{ scale, y }}
        className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center"
      >
        {/* Sub-header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-6 flex items-center gap-2 text-blue-400 font-mono text-sm tracking-[0.5em] uppercase"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          Limited Release 2025
        </motion.div>

        {/* Main Headline with Clip Reveal */}
        <div className="relative text-center mb-8">
          <h1 className="text-[12vw] font-black leading-none tracking-tighter text-neutral-800">
            Xeron Z1
          </h1>
          <motion.h1
            style={{ clipPath: textReveal }}
            className="absolute inset-0 text-[12vw] font-black leading-none tracking-tighter text-white"
          >
            Xeron Z1
          </motion.h1>
        </div>

        <p className="text-gray-400 text-lg md:text-2xl mb-12 max-w-2xl text-center font-light leading-relaxed">
          The future of mobile technology is finally within reach.{" "}
          <br className="hidden md:block" />
          Elevate your experience starting today.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-white px-10 text-lg font-bold text-black transition-all"
          >
            <ShoppingBag className="mr-3 w-5 h-5" />
            <span>Pre-Order Xeron Z1</span>
            <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <button className="h-16 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-colors">
            Compare Models
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-12 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-2">
            <CreditCard className="text-gray-500 w-6 h-6" />
            <span className="text-gray-400 text-xs font-mono">
              0% Installments
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-gray-500 w-6 h-6" />
            <span className="text-gray-400 text-xs font-mono">
              2-Year Warranty
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2">
            <div className="text-gray-500 font-bold">12.01.25</div>
            <span className="text-gray-400 text-xs font-mono">
              Global Shipping
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCtaSection;
