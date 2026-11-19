import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  Easing,
  sampleVehicles,
} from "../brand";
import { DesktopMonitor } from "../components/DesktopMonitor";
import { Smartphone } from "../components/Smartphone";
import { WebsiteMockup } from "../components/WebsiteMockup";
import { MobileAppMockup } from "../components/MobileAppMockup";

interface Scene5MobileAppRevealProps {
  progress: number; // 0-1 over 13 seconds (42-55s)
}

export const Scene5MobileAppReveal: React.FC<Scene5MobileAppRevealProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Scene phases
  const monitorShrinkProgress = interpolate(progress, [0, 0.25], [0, 1], { easing: Easing.easeInOut });
  const phoneAppearProgress = interpolate(progress, [0.2, 0.45], [0, 1], { easing: Easing.easeOut });
  const morphProgress = interpolate(progress, [0.3, 0.55], [0, 1], { easing: Easing.cinematic });
  const homeProgress = interpolate(progress, [0.5, 0.7], [0, 1], { easing: Easing.easeOut });
  const exploreProgress = interpolate(progress, [0.65, 0.8], [0, 1], { easing: Easing.easeOut });
  const detailProgress = interpolate(progress, [0.75, 0.9], [0, 1], { easing: Easing.easeOut });
  const bidsProgress = interpolate(progress, [0.85, 1], [0, 1], { easing: Easing.easeOut });

  // Monitor position - moves to left
  const monitorX = interpolate(monitorShrinkProgress, [0, 1], [0, -400], { easing: Easing.easeInOut });
  const monitorScale = interpolate(monitorShrinkProgress, [0, 1], [1, 0.6], { easing: Easing.easeInOut });
  const monitorRotateY = interpolate(monitorShrinkProgress, [0, 1], [0, 15], { easing: Easing.easeInOut });

  // Phone position - enters from right, centers
  const phoneX = interpolate(phoneAppearProgress, [0, 0.5, 1], [600, 0, 200], { easing: Easing.easeOut });
  const phoneY = interpolate(phoneAppearProgress, [0, 1], [100, 0], { easing: Easing.easeOut });
  const phoneScale = interpolate(phoneAppearProgress, [0, 1], [0.5, 1], { easing: Easing.easeOut });
  const phoneRotateY = interpolate(phoneAppearProgress, [0, 0.5, 1], [30, -10, 0], { easing: Easing.easeOut });
  const phoneRotateX = interpolate(phoneAppearProgress, [0, 1], [-10, 0], { easing: Easing.easeOut });

  // Morph transition - screen content flows from monitor to phone
  const morphOpacity = morphProgress;
  const morphScale = interpolate(morphProgress, [0, 1], [1, 0.3], { easing: Easing.easeInOut });
  const morphY = interpolate(morphProgress, [0, 1], [0, -300], { easing: Easing.easeInOut });

  // Floating animation
  const floatY = Math.sin(time * 1.2) * 8;
  const floatX = Math.cos(time * 0.8) * 5;

  // Screen tracking for morph
  const currentScreen = progress < 0.55 ? "home" : progress < 0.7 ? "explore" : progress < 0.85 ? "detail" : "bids";

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark atmospheric background */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(200, 16, 46, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(143, 0, 29, 0.08) 0%, transparent 50%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Particle system */}
      <FloatingParticles time={time} count={25} />

      {/* Main device composition */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${floatX}px, ${floatY}px)`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Desktop Monitor (shrinking, moving left) */}
        <div
          style={{
            position: "absolute",
            left: `${monitorX}px`,
            top: "0",
            transform: `translateY(-50%) rotateY(${monitorRotateY}deg) scale(${monitorScale})`,
            transformOrigin: "center center",
            opacity: 1 - morphProgress * 0.3,
            zIndex: 10,
          }}
        >
          <DesktopMonitor
            progress={1}
            yOffset={0}
            rotateX={0}
            rotateY={0}
            scale={1}
            screenContent={
              <WebsiteMockup
                loadProgress={1}
                heroProgress={0}
                statsProgress={0}
                marketplaceProgress={1}
              />
            }
          />
        </div>

        {/* Morphing transition element */}
        {morphProgress > 0 && morphProgress < 1 && (
          <div
            style={{
              position: "absolute",
              left: `${interpolate(morphProgress, [0, 1], [monitorX + 400, phoneX], { easing: Easing.easeInOut })}px`,
              top: "50%",
              transform: `translate(-50%, -50%) translateY(${morphY}px) scale(${morphScale})`,
              opacity: morphOpacity,
              pointerEvents: "none",
              zIndex: 15,
              filter: "blur(2px)",
            }}
          >
            <div
              style={{
                width: "1100px",
                height: "620px",
                background: BrandColors.bg,
                borderRadius: "16px",
                border: `1px solid ${BrandColors.line}`,
                overflow: "hidden",
                transform: `scale(${morphScale})`,
              }}
            >
              <MobileAppMockup
                loadProgress={1}
                screen="home"
                screenProgress={{ home: 1 }}
                time={time}
              />
            </div>
          </div>
        )}

        {/* Smartphone (main focus after morph) */}
        <div
          style={{
            position: "absolute",
            left: `${phoneX}px`,
            top: `${phoneY}px`,
            transform: `
              translateY(-50%)
              rotateX(${phoneRotateX}deg)
              rotateY(${phoneRotateY}deg)
              scale(${phoneScale})
            `,
            transformOrigin: "center center",
            opacity: phoneAppearProgress,
            zIndex: 20,
          }}
        >
          <Smartphone
            progress={phoneAppearProgress}
            yOffset={0}
            rotateX={0}
            rotateY={0}
            rotateZ={0}
            scale={1}
            screenContent={
              <MobileAppMockup
                loadProgress={1}
                screen={currentScreen as any}
                screenProgress={{
                  home: currentScreen === "home" ? 1 : 0,
                  explore: currentScreen === "explore" ? exploreProgress : 0,
                  detail: currentScreen === "detail" ? detailProgress : 0,
                  bids: currentScreen === "bids" ? bidsProgress : 0,
                  profile: 0,
                  tabs: 1,
                }}
                time={time}
              />
            }
          />
        </div>

        {/* Phone reflection */}
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: `${phoneX - 190}px`,
            width: "380px",
            height: "820px",
            opacity: phoneAppearProgress * 0.1,
            filter: "blur(40px)",
            background: `linear-gradient(180deg, rgba(200,16,46,0.2) 0%, transparent 100%)`,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "scaleY(0.3)",
            zIndex: 5,
          }}
        />
      </div>

      {/* Screen indicator dots */}
      <ScreenIndicatorDots currentScreen={currentScreen} progress={progress} />

      {/* Feature highlights as floating cards */}
      <FeatureCards progress={progress} time={time} />

      {/* Text overlays */}
      <TextOverlays progress={progress} currentScreen={currentScreen} />
    </AbsoluteFill>
  );
};

const FloatingParticles: React.FC<{ time: number; count: number }> = ({ time, count }) => {
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const seed = i * 137.5;
      arr.push({
        x: (seed * 100) % 1920,
        y: (seed * 73) % 1080,
        size: 1 + (seed * 3) % 3,
        speed: 0.02 + (seed * 0.01) % 0.03,
        opacity: 0.1 + (seed * 0.2) % 0.2,
      });
    }
    return arr;
  }, [count]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 1 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(p.x + Math.sin(time * p.speed * 100 + i) * 40) % 1920}px`,
            top: `${(p.y + Math.cos(time * p.speed * 100 + i) * 25) % 1080}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: [(p.x * 17) % 2 === 0 ? BrandColors.crimsonRed : BrandColors.metallicGray][0],
            opacity: p.opacity * (0.5 + 0.5 * Math.sin(time * 2 + i)),
            filter: "blur(1px)",
            pointerEvents: "none",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const ScreenIndicatorDots: React.FC<{ currentScreen: string; progress: number }> = ({
  currentScreen,
  progress,
}) => {
  const screens = ["home", "explore", "detail", "bids", "profile"];
  const currentIndex = screens.indexOf(currentScreen);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 30,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          opacity: progress,
        }}
      >
        {screens.map((screen, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i <= currentIndex ? BrandColors.crimsonRed : BrandColors.line,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: i === currentIndex ? `0 0 15px ${BrandColors.crimsonRed}` : "none",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const FeatureCards: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const features = [
    { icon: "🏠", label: "Home Dashboard", screen: "home", color: BrandColors.crimsonRed },
    { icon: "🔍", label: "Vehicle Search", screen: "explore", color: "#F5A623" },
    { icon: "🏁", label: "Vehicle Details", screen: "detail", color: BrandColors.green },
    { icon: "🔨", label: "My Bids", screen: "bids", color: "#7B61FF" },
    { icon: "👤", label: "Profile & Verification", screen: "profile", color: "#00D4AA" },
  ];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: interpolate(progress, [0.5, 0.8], [0, 1], { easing: Easing.easeOut }),
        }}
      >
        {features.map((feature, i) => {
          const featureProgress = Math.max(0, Math.min(1, (progress - 0.4 - i * 0.08) / 0.3));
          const isActive = feature.screen === (progress < 0.55 ? "home" : progress < 0.7 ? "explore" : progress < 0.85 ? "detail" : "bids");

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 18px",
                background: isActive
                  ? `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`
                  : "rgba(19, 19, 25, 0.9)",
                border: isActive
                  ? `1px solid ${feature.color}`
                  : `1px solid ${BrandColors.line}`,
                borderRadius: "50px",
                backdropFilter: "blur(16px)",
                opacity: featureProgress,
                transform: `translateY(${interpolate(featureProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px) scale(${interpolate(featureProgress, [0, 1], [0.9, 1], { easing: Easing.backOut })})`,
                boxShadow: isActive ? `0 0 30px ${feature.color}40` : "none",
                animation: isActive ? "pulseGlow 2s ease-in-out infinite" : "none",
              }}
            >
              <span style={{ fontSize: "18px" }}>{feature.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: BrandColors.white }}>
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

const TextOverlays: React.FC<{ progress: number; currentScreen: string }> = ({ progress, currentScreen }) => {
  const titleProgress = interpolate(progress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const taglineProgress = interpolate(progress, [0.8, 1], [0, 1], { easing: Easing.easeOut });

  const screenLabels: Record<string, string> = {
    home: "HOME DASHBOARD",
    explore: "VEHICLE SEARCH",
    detail: "VEHICLE DETAILS",
    bids: "MY BIDS",
    profile: "PROFILE & VERIFICATION",
  };

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: BrandColors.crimsonRed,
            marginBottom: "10px",
          }}
        >
          MOBILE APP REVEAL
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-1.5px", color: BrandColors.white, margin: 0 }}>
          Your Marketplace.<br/>Now in Your Pocket.
        </h1>
      </div>

      {/* Current screen label */}
      <div
        style={{
          marginTop: "30px",
          opacity: progress,
          padding: "10px 24px",
          background: "rgba(19, 19, 25, 0.95)",
          border: `1px solid ${BrandColors.line}`,
          borderRadius: "30px",
          backdropFilter: "blur(16px)",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: BrandColors.crimsonRed,
          }}
        >
          {screenLabels[currentScreen] || "HOME DASHBOARD"}
        </span>
      </div>

      <div
        style={{
          opacity: taglineProgress,
          transform: `translateY(${interpolate(taglineProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          marginTop: "auto",
          marginBottom: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 28px",
            background: `linear-gradient(135deg, rgba(200,16,46,0.2), rgba(143,0,29,0.2))`,
            border: `1px solid ${BrandColors.crimsonRed}`,
            borderRadius: "50px",
            backdropFilter: "blur(16px)",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "2px", color: BrandColors.white }}>
            YOUR MARKETPLACE. NOW IN YOUR POCKET.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};