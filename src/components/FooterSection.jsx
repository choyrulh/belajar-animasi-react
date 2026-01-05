import React from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const FooterSection = () => {
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    hidden: {},
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="min-h-screen bg-white text-black flex flex-col justify-between z-20 relative pt-32 pb-12 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-[0.03] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000"
          alt="Xeron Background"
          className="w-full h-auto object-contain"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
        className="flex flex-col items-center text-center px-6"
      >
        <div className="overflow-hidden mb-2">
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm tracking-[0.4em] text-neutral-400 uppercase"
          >
            The Next Evolution
          </motion.p>
        </div>

        {["Experience", "The Future", "Today."].map((text, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              variants={itemVariants}
              className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase leading-[0.85]"
            >
              {text}
            </motion.h2>
          </div>
        ))}

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#171717" }}
            whileTap={{ scale: 0.98 }}
            className="group px-10 py-5 bg-black text-white rounded-full text-xl font-bold flex items-center gap-3 transition-colors shadow-2xl"
          >
            Pre-Order Now
            <span className="opacity-50 font-light">|</span>
            <span>$999</span>
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
          <p className="mt-4 text-neutral-400 text-sm font-medium">
            Available in Titanium, Silver, and Midnight.
          </p>
        </motion.div>
      </motion.div>

      {/* Actual Footer Navigation */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-7xl mx-auto px-10 mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-neutral-100 pt-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black tracking-tighter mb-4">
              XERON.
            </h3>
            <p className="text-neutral-500 max-w-xs text-sm leading-relaxed">
              Designed by Visionaries. Engineered for Humans. Joining the circle
              of global innovation.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium">
            <p className="text-neutral-400 uppercase tracking-widest text-[10px] mb-2">
              Platform
            </p>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              Specifications
            </a>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              Compare
            </a>
            <a href="#" className="hover:text-neutral-400 transition-colors">
              Eco-Impact
            </a>
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium">
            <p className="text-neutral-400 uppercase tracking-widest text-[10px] mb-2">
              Connect
            </p>
            <div className="flex gap-6">
              <Instagram
                size={20}
                className="cursor-pointer hover:text-pink-600 transition-colors"
              />
              <Twitter
                size={20}
                className="cursor-pointer hover:text-blue-400 transition-colors"
              />
              <Youtube
                size={20}
                className="cursor-pointer hover:text-red-600 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          <p>© 2025 Xeron LABS INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default FooterSection;
