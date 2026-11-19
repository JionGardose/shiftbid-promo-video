import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  BrandBorderRadius,
  Easing,
  sampleVehicles,
  categories,
  formatPrice,
} from "../brand";
import { DesktopMonitor } from "../components/DesktopMonitor";
import { WebsiteMockup } from "../components/WebsiteMockup";

interface Scene2WebsiteRevealProps {
  progress: number; // 0-1 over 12 seconds (8-20s)
}

export const Scene2WebsiteReveal: React.FC<Scene2WebsiteRevealProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Animations
  const monitorAppearProgress = interpolate(progress, [0, 0.2], [0, 1], { easing: Easing.easeOut });
  const monitorFloatProgress = interpolate(progress, [0.1, 0.3], [0, 1], { easing: Easing.easeOut });
  const websiteLoadProgress = interpolate(progress, [0.2, 0.4], [0, 1], { easing: Easing.easeOut });
  const heroRevealProgress = interpolate(progress, [0.35, 0.55], [0, 1], { easing: Easing.easeOut });
  const statsRevealProgress = interpolate(progress, [0.5, 0.65], [0, 1], { easing: Easing.easeOut });
  const marketplaceRevealProgress = interpolate(progress, [0.6, 0.8], [0, 1], { easing: Easing.easeOut });
  const textRevealProgress = interpolate(progress, [0.7, 0.9], [0, 1], { easing: Easing.easeOut });
  const cameraMoveProgress = progress; // Continuous camera movement

  // Monitor position with floating animation
  const monitorY = interpolate(monitorFloatProgress, [0, 1], [100, 0], { easing: Easing.easeOut });
  const monitorRotateX = interpolate(monitorFloatProgress, [0, 1], [15, 0], { easing: Easing.easeOut });
  const monitorScale = interpolate(monitorAppearProgress, [0, 1], [0.7, 1], { easing: Easing.easeOut });

  // Camera subtle movement
  const cameraX = Math.sin(time * 0.5) * 20;
  const cameraY = Math.cos(time * 0.7) * 15;

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark atmospheric background */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(200, 16, 46, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(143, 0, 29, 0.08) 0%, transparent 50%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Floating particles */}
      <FloatingParticles time={time} count={20} />

      {/* Main content with camera movement */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${cameraX}px, ${cameraY}px)`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Desktop Monitor */}
        <DesktopMonitor
          progress={monitorAppearProgress}
          yOffset={monitorY}
          rotateX={monitorRotateX}
          rotateY={0}
          scale={monitorScale}
          screenContent={
            <WebsiteMockup
              loadProgress={websiteLoadProgress}
              heroProgress={heroRevealProgress}
              statsProgress={statsRevealProgress}
              marketplaceProgress={marketplaceRevealProgress}
            />
          }
        />

        {/* Reflective surface under monitor */}
        <MonitorReflection
          progress={monitorAppearProgress}
          yOffset={monitorY}
          scale={monitorScale}
        />
      </div>

      {/* Text overlays */}
      <TextOverlays progress={textRevealProgress} time={time} />

      {/* "YOUR NEXT VEHICLE STARTS HERE" badge */}
      <BadgeOverlay progress={interpolate(progress, [0.75, 0.95], [0, 1], { easing: Easing.easeOut })} />
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
        size: 1 + (seed * 3) % 2,
        speed: 0.015 + (seed * 0.01) % 0.02,
        opacity: 0.05 + (seed * 0.1) % 0.15,
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
            left: `${(p.x + Math.sin(time * p.speed * 100 + i) * 30) % 1920}px`,
            top: `${(p.y + Math.cos(time * p.speed * 100 + i) * 20) % 1080}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: BrandColors.metallicGray,
            opacity: p.opacity * (0.5 + 0.5 * Math.sin(time * 1.5 + i)),
            pointerEvents: "none",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const MonitorReflection: React.FC<{ progress: number; yOffset: number; scale: number }> = ({
  progress,
  yOffset,
  scale,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: `${120 - yOffset * 0.5}px`,
        left: "50%",
        transform: `translateX(-50%) scaleX(${scale}) scaleY(${scale * 0.3})`,
        width: "900px",
        height: "500px",
        opacity: progress * 0.15,
        filter: "blur(20px)",
        background: `linear-gradient(180deg, rgba(200,16,46,0.2) 0%, transparent 100%)`,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

const TextOverlays: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress === 0) return null;

  const titleProgress = interpolate(progress, [0, 0.5], [0, 1], { easing: Easing.easeOut });
  const subtitleProgress = interpolate(progress, [0.3, 0.8], [0, 1], { easing: Easing.easeOut });
  const featureProgress = interpolate(progress, [0.6, 1], [0, 1], { easing: Easing.easeOut });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
      }}
    >
      {/* Main title */}
      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [50, 0], { easing: Easing.easeOut })}px)`,
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: BrandColors.crimsonRed,
            marginBottom: "12px",
            textShadow: `0 0 20px ${BrandColors.crimsonRed}`,
          }}
        >
          WEBSITE REVEAL
        </div>
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            color: BrandColors.white,
            margin: 0,
            textShadow: "0 4px 40px rgba(0,0,0,0.8)",
          }}
        >
          ShiftBid 6100 <span style={{ color: BrandColors.crimsonRed }}>Marketplace</span>
        </h1>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          textAlign: "center",
          maxWidth: "700px",
          marginBottom: "32px",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: BrandColors.metallicGray,
            margin: 0,
            fontWeight: 400,
          }}
        >
          A premium digital vehicle marketplace designed for serious buyers and sellers.
          Experience transparent bidding, verified listings, and seamless transactions.
        </p>
      </div>

      {/* Feature highlights */}
      <div
        style={{
          opacity: featureProgress,
          transform: `translateY(${interpolate(featureProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          display: "flex",
          gap: "32px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { icon: "✓", label: "Verified Users", color: BrandColors.green },
          { icon: "🔨", label: "Open Bidding", color: BrandColors.crimsonRed },
          { icon: "🚚", label: "Shipment Tracking", color: BrandColors.metallicGray },
          { icon: "💳", label: "Payment Guidance", color: "#F5A623" },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              background: `rgba(19, 19, 25, 0.9)`,
              border: `1px solid ${BrandColors.line}`,
              borderRadius: BrandBorderRadius.lg,
              backdropFilter: "blur(16px)",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: "18px", color: feature.color }}>{feature.icon}</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: BrandColors.white }}>
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const BadgeOverlay: React.FC<{ progress: number }> = ({ progress }) => {
  if (progress === 0) return null;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 30,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [40, 0], { easing: Easing.easeOut })}px) scale(${interpolate(progress, [0, 1], [0.8, 1], { easing: Easing.backOut })})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 32px",
            background: `linear-gradient(135deg, rgba(200,16,46,0.2) 0%, rgba(143,0,29,0.2) 100%)`,
            border: `1px solid ${BrandColors.crimsonRed}`,
            borderRadius: "50px",
            backdropFilter: "blur(16px)",
            boxShadow: `
              0 0 40px rgba(200, 16, 46, 0.3),
              inset 0 1px 0 rgba(255,255,255,0.1)
            `,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: BrandColors.crimsonRed,
              boxShadow: `0 0 10px ${BrandColors.crimsonRed}`,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: BrandColors.white,
              textShadow: `0 0 10px ${BrandColors.crimsonRed}`,
            }}
          >
            YOUR NEXT VEHICLE STARTS HERE
          </span>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </AbsoluteFill>
  );
};