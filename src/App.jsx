import "./App.css";
import React, { Suspense, lazy } from "react";
import { ReactLenis } from "lenis/react";

// Lazy load components
const HeroSection = lazy(() => import("./components/HeroSection"));
const MarqueeSection = lazy(() => import("./components/MarqueeSection"));
const FeaturePinSection = lazy(() => import("./components/FeaturePinSection"));
const ChipsetSection = lazy(() => import("./components/ChipsetSection"));
const ExplodedViewSection = lazy(() =>
  import("./components/ExplodedViewSection")
);
const ColorVariantSection = lazy(() =>
  import("./components/ColorVariantSection")
);
const DetailMagnifySection = lazy(() =>
  import("./components/DetailMagnifySection")
);
const ParallaxGridSection = lazy(() =>
  import("./components/ParallaxGridSection")
);
const CameraSection = lazy(() => import("./components/CameraSection"));
const SecuritySection = lazy(() => import("./components/SecuritySection"));
const AudioSection = lazy(() => import("./components/AudioSection"));
const ConnectivitySection = lazy(() =>
  import("./components/ConnectivitySection")
);
const BatterySection = lazy(() => import("./components/BatterySection"));
const ThemeSwitchSection = lazy(() =>
  import("./components/ThemeSwitchSection")
);
const DynamicIslandSection = lazy(() =>
  import("./components/DynamicIslandSection")
);
const DepthTextSection = lazy(() => import("./components/DepthTextSection"));
const WaterSection = lazy(() => import("./components/WaterSection"));
const FinalCtaSection = lazy(() => import("./components/FinalCtaSection"));
const FooterSection = lazy(() => import("./components/FooterSection"));

// Loading Fallback
const LoadingScreen = () => (
  <div className="h-screen w-full bg-black flex items-center justify-center text-white">
    <div className="animate-pulse text-2xl font-bold">
      Loading Experience...
    </div>
  </div>
);

export default function App() {
  const lenisOptions = {
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Suspense fallback={<LoadingScreen />}>
        <div className="bg-black min-h-screen text-white selection:bg-purple-500 selection:text-white">
          <HeroSection />
          <div className="relative z-10 bg-black">
            <MarqueeSection />
            <FeaturePinSection />
            <ChipsetSection />
            <ExplodedViewSection />
            <ColorVariantSection />
            <DetailMagnifySection />
            <ParallaxGridSection />
            <CameraSection />
            <SecuritySection />
            <AudioSection />
            <ConnectivitySection />
            <BatterySection />
          </div>

          <ThemeSwitchSection />

          <div className="relative z-10 bg-white">
            <DynamicIslandSection />
            <DepthTextSection />
            <WaterSection />
            <FinalCtaSection />
            <FooterSection />
          </div>
        </div>
      </Suspense>
    </ReactLenis>
  );
}
