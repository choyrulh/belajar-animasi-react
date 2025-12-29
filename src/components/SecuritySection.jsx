import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Fingerprint,
  Lock,
  Unlock,
  Eye,
  Server,
} from "lucide-react";

const SecuritySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Animasi Pemindaian (ClipPath)
  const clipPathVal = useTransform(
    smoothProgress,
    [0.1, 0.7],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Pergerakan Garis Laser
  const scanLinePos = useTransform(smoothProgress, [0.1, 0.7], ["100%", "0%"]);

  // Perubahan Ikon Lock ke Unlock
  const lockOpacity = useTransform(smoothProgress, [0.6, 0.7], [1, 0]);
  const unlockOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);

  // Gambar Konten
  const faceScanImg =
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1000&auto=format&fit=crop";

  return (
    <section ref={containerRef} className="h-[200vh] bg-black relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Grid & Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,black_100%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* --- HEADER --- */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.2], [0, 1]) }}
          className="text-center mb-12 z-20"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            <ShieldCheck size={16} />
            <span>Secure Core Architecture</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter">
            BIO-VAULT PROTECTION
          </h2>
        </motion.div>

        <div className="flex items-center justify-center gap-20 w-full max-w-6xl relative z-10">
          {/* LEFT SIDE: STATS */}
          <motion.div
            style={{
              x: useTransform(smoothProgress, [0.4, 0.7], [-50, 0]),
              opacity: useTransform(smoothProgress, [0.4, 0.7], [0, 1]),
            }}
            className="hidden lg:flex flex-col gap-8 w-64"
          >
            <SecurityBadge
              icon={<Eye size={18} />}
              title="Retina Scan"
              desc="Active"
              color="emerald"
            />
            <SecurityBadge
              icon={<Server size={18} />}
              title="Enclave"
              desc="Encrypted"
              color="emerald"
            />
          </motion.div>

          {/* MAIN SCANNER CONTAINER (The Phone-like frame) */}
          <div className="relative w-[320px] h-[580px] group">
            {/* Outer Frame */}
            <div className="absolute inset-0 border-[8px] border-neutral-800 rounded-[3.5rem] bg-black shadow-2xl overflow-hidden">
              {/* LAYER 1: BASE (Scanning State) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-8">
                <motion.div
                  style={{ opacity: lockOpacity }}
                  className="flex flex-col items-center"
                >
                  <Lock size={48} className="text-neutral-700 mb-6" />
                  <div className="w-full space-y-3">
                    <div className="h-1 bg-neutral-800 rounded-full w-3/4 mx-auto overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "linear",
                        }}
                        className="h-full w-1/2 bg-neutral-600"
                      />
                    </div>
                    <p className="text-neutral-600 font-mono text-[10px] text-center uppercase tracking-widest">
                      Awaiting Verification
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* LAYER 2: SCAN RESULT (Revealed with ClipPath) */}
              <motion.div
                style={{ clipPath: clipPathVal }}
                className="absolute inset-0 z-20 bg-emerald-950/20"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img
                    src={faceScanImg}
                    alt="Biometric"
                    className="w-full h-full object-cover opacity-40 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-emerald-900/20 to-transparent" />
                </div>

                {/* Content Reveal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div style={{ opacity: unlockOpacity }}>
                    <Unlock
                      size={64}
                      className="text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                    />
                    <div className="text-center">
                      <p className="text-emerald-400 font-mono text-lg tracking-widest font-bold">
                        IDENTITY
                      </p>
                      <p className="text-emerald-400 font-mono text-sm opacity-70 italic font-bold">
                        VERIFIED
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Cyber HUD Elements */}
                <div className="absolute top-10 left-10 right-10 flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
                  <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
                </div>
                <div className="absolute bottom-10 left-10 right-10 flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-500" />
                </div>
              </motion.div>

              {/* SCANNING LINE INDICATOR */}
              <motion.div
                style={{ bottom: scanLinePos }}
                className="absolute left-0 right-0 h-[3px] bg-emerald-400 shadow-[0_0_25px_#10b981] z-30"
              />
            </div>
          </div>

          {/* RIGHT SIDE: STATS */}
          <motion.div
            style={{
              x: useTransform(smoothProgress, [0.4, 0.7], [50, 0]),
              opacity: useTransform(smoothProgress, [0.4, 0.7], [0, 1]),
            }}
            className="hidden lg:flex flex-col gap-8 w-64"
          >
            <SecurityBadge
              icon={<Fingerprint size={18} />}
              title="Touch ID"
              desc="Authorized"
              color="emerald"
            />
            <SecurityBadge
              icon={<Lock size={18} />}
              title="AES-256"
              desc="Standby"
              color="emerald"
            />
          </motion.div>
        </div>

        {/* FOOTER INFO */}
        <motion.p
          style={{ opacity: unlockOpacity }}
          className="mt-12 text-neutral-500 font-mono text-xs"
        >
          PRIVACY PROTECTED BY SECURE ENCLAVE TECHNOLOGY
        </motion.p>
      </div>
    </section>
  );
};

// Sub-component untuk Badge Statistik di samping
const SecurityBadge = ({ icon, title, desc, color }) => (
  <div className="p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-4">
    <div
      className={`w-10 h-10 rounded-lg bg-${color}-500/10 flex items-center justify-center text-${color}-500 border border-${color}-500/20`}
    >
      {icon}
    </div>
    <div>
      <h4 className="text-white text-sm font-bold">{title}</h4>
      <p
        className={`text-${color}-500 text-[10px] font-mono uppercase tracking-tighter`}
      >
        {desc}
      </p>
    </div>
  </div>
);

export default SecuritySection;
