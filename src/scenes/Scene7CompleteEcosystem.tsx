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

interface Scene7CompleteEcosystemProps {
  progress: number; // 0-1 over 10 seconds (68-78s)
}

export const Scene7CompleteEcosystem: React.FC<Scene7CompleteEcosystemProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Scene animations
  const devicesProgress = interpolate(progress, [0, 0.2], [0, 1], { easing: Easing.easeOut });
  const connectingLinesProgress = interpolate(progress, [0.15, 0.4], [0, 1], { easing: Easing.cinematic });
  const valuePropProgress = interpolate(progress, [0.35, 0.6], [0, 1], { easing: Easing.easeOut });
  const keywordsProgress = interpolate(progress, [0.55, 0.85], [0, 1], { easing: Easing.easeOut });
  const backgroundProgress = interpolate(progress, [0.7, 1], [0, 1], { easing: Easing.easeOut });

  // Device positions
  const monitorX = -380;
  const phoneX = 380;
  const monitorY = 0;
  const phoneY = 20;

  // Floating animation
  const floatY = Math.sin(time * 1) * 10;
  const floatX = Math.cos(time * 0.7) * 6;

  // Connecting line animation
  const lineDrawProgress = connectingLinesProgress;

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark cinematic background */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(200, 16, 46, ${0.12 * backgroundProgress}) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 70%, rgba(143, 0, 29, ${0.08 * backgroundProgress}) 0%, transparent 50%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Background vehicle silhouettes */}
      <BackgroundVehicles time={time} progress={backgroundProgress} />

      {/* Particle system */}
      <FloatingParticles time={time} count={30} />

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
          gap: "120px",
          pointerEvents: "none",
        }}
      >
        {/* Desktop Monitor */}
        <div
          style={{
            opacity: devicesProgress,
            transform: `translateX(${interpolate(devicesProgress, [0, 1], [-100, 0], { easing: Easing.easeOut })}px)`,
          }}
        >
          <DesktopMonitor
            progress={1}
            yOffset={0}
            rotateX={0}
            rotateY={-10}
            scale={0.9}
            screenContent={
              <WebsiteMockup
                loadProgress={1}
                heroProgress={1}
                statsProgress={1}
                marketplaceProgress={1}
              />
            }
          />
        </div>

        {/* Connecting lines between devices */}
        <ConnectingLines
          progress={lineDrawProgress}
          monitorX={monitorX}
          phoneX={phoneX}
          time={time}
        />

        {/* Smartphone */}
        <div
          style={{
            opacity: devicesProgress,
            transform: `translateX(${interpolate(devicesProgress, [0, 1], [100, 0], { easing: Easing.easeOut })}px)`,
          }}
        >
          <Smartphone
            progress={1}
            yOffset={0}
            rotateX={0}
            rotateY={10}
            rotateZ={0}
            scale={1.1}
            screenContent={
              <MobileAppMockup
                loadProgress={1}
                screen="home"
                screenProgress={{ home: 1, tabs: 1 }}
                time={time}
              />
            }
          />
        </div>
      </div>

      {/* Logo centered between devices */}
      <CenteredLogo progress={devicesProgress} time={time} />

      {/* Value proposition */}
      <ValueProposition progress={valuePropProgress} />

      {/* Keywords */}
      <KeywordsDisplay progress={keywordsProgress} time={time} />

      {/* Text overlays */}
      <TextOverlays progress={progress} />
    </AbsoluteFill>
  );
};

const BackgroundVehicles: React.FC<{ time: number; progress: number }> = ({ time, progress }) => {
  const vehicles = [
    { x: 150, y: 300, scale: 0.8, speed: 0.3, char: "🏁" },
    { x: 1700, y: 200, scale: 0.6, speed: 0.4, char: "🏎️" },
    { x: 200, y: 800, scale: 0.7, speed: 0.25, char: "🚗" },
    { x: 1600, y: 900, scale: 0.5, speed: 0.35, char: "⭐" },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 2, opacity: progress * 0.3 }}>
      {vehicles.map((v, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${v.x + Math.sin(time * v.speed + i) * 30}px`,
            top: `${v.y + Math.cos(time * v.speed + i) * 20}px`,
            transform: `scale(${v.scale})`,
            fontSize: "120px",
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8)) opacity(0.4)",
            pointerEvents: "none",
          }}
        >
          {v.char}
        </div>
      ))}
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
        speed: 0.015 + (seed * 0.01) % 0.025,
        opacity: 0.08 + (seed * 0.15) % 0.2,
      });
    }
    return arr;
  }, [count]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 3 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(p.x + Math.sin(time * p.speed * 100 + i) * 50) % 1920}px`,
            top: `${(p.y + Math.cos(time * p.speed * 100 + i) * 30) % 1080}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: [(p.x * 17) % 2 === 0 ? BrandColors.crimsonRed : BrandColors.metallicGray][0],
            opacity: p.opacity * (0.5 + 0.5 * Math.sin(time * 1.5 + i)),
            filter: "blur(1px)",
            pointerEvents: "none",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const ConnectingLines: React.FC<{
  progress: number;
  monitorX: number;
  phoneX: number;
  time: number;
}> = ({ progress, monitorX, phoneX, time }) => {
  if (progress === 0) return null;

  const centerX = (monitorX + phoneX) / 2;
  const monitorRight = monitorX + 495; // half of 990px monitor width
  const phoneLeft = phoneX - 190; // half of 380px phone width

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 15 }}>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Main horizontal connection */}
        <path
          d={`M${monitorRight},540 Q${centerX},540 ${phoneLeft},540`}
          stroke="url(#connectionGradient)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={progress * 2000}
          strokeDashoffset={0}
          style={{
            filter: "drop-shadow(0 0 10px rgba(200,16,46,0.6))",
          }}
        >
          <animate
            attributeName="strokeDashoffset"
            from="2000"
            to="0"
            dur="2s"
            fill="freeze"
            begin={`${(1 - progress) * 2}s`}
          />
        </path>

        {/* Data packets flowing */}
        {[1, 2, 3, 4, 5].map((i) => {
          const packetProgress = ((time * 0.8 + i * 0.2) % 1);
          const packetX = monitorRight + (phoneLeft - monitorRight) * packetProgress;
          const packetY = 540 + Math.sin(packetProgress * Math.PI * 4) * 8;

          return (
            <circle
              key={i}
              cx={packetX}
              cy={packetY}
              r={4}
              fill={BrandColors.crimsonRed}
              opacity={0.8}
              style={{
                filter: "drop-shadow(0 0 8px rgba(200,16,46,0.8))",
                animation: "packetPulse 0.5s ease-in-out infinite",
              }}
            />
          );
        })}

        {/* Vertical accent lines */}
        {[monitorRight, centerX, phoneLeft].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={400}
            x2={x}
            y2={680}
            stroke={BrandColors.crimsonRed}
            strokeWidth={1}
            strokeDasharray="8 4"
            opacity={progress * 0.4}
            style={{
              strokeDashoffset: time * 50,
              animation: "dashFlow 2s linear infinite",
            }}
          />
        ))}

        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={BrandColors.crimsonRed} />
            <stop offset="50%" stopColor={BrandColors.red} />
            <stop offset="100%" stopColor={BrandColors.green} />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes packetPulse {
            0%, 100% { r: 4; opacity: 0.8; }
            50% { r: 6; opacity: 1; }
          }
          @keyframes dashFlow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 24; }
          }
        `}</style>
      </svg>
    </AbsoluteFill>
  );
};

const CenteredLogo: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const shimmerProgress = (time * 0.5) % 1;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [50, 0], { easing: Easing.easeOut })}px) scale(${interpolate(progress, [0, 1], [0.8, 1], { easing: Easing.backOut })})`,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ecoMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#E8E8ED" />
              <stop offset="50%" stopColor="#C8102E" />
              <stop offset="70%" stopColor="#8F001D" />
              <stop offset="100%" stopColor="#1A1A1F" />
            </linearGradient>
            <linearGradient id="ecoRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF445A" />
              <stop offset="50%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#8F001D" />
            </linearGradient>
            <linearGradient id="ecoShimmer" x1="-100%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          <circle cx="100" cy="100" r="92" fill="none" stroke="url(#ecoMetallic)" strokeWidth="4" />
          <circle cx="100" cy="100" r="78" fill="none" stroke={BrandColors.crimsonRed} strokeWidth="2" opacity="0.5" strokeDasharray="20 10" />

          <g transform="translate(100, 100)">
            <g stroke="url(#ecoRed)" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M-35 0 Q-20 -20 0 -15 Q20 -10 35 0" opacity="0.8" />
              <path d="M-35 0 Q-20 0 0 0 Q20 0 35 0" strokeWidth="8" />
              <path d="M-35 0 Q-20 20 0 15 Q20 10 35 0" opacity="0.8" />
            </g>
            <rect x="-4" y="-40" width="8" height="80" rx="4" fill="url(#ecoMetallic)" />
          </g>

          {/* Shimmer */}
          <rect
            x="-100"
            y="-100"
            width="400"
            height="400"
            fill="url(#ecoShimmer)"
            transform={`translate(${(shimmerProgress - 0.5) * 400}px, 0)`}
            opacity={0.2}
          />
        </svg>

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 900,
              letterSpacing: "6px",
              color: BrandColors.white,
              textShadow: `0 0 30px ${BrandColors.crimsonRed}`,
            }}
          >
            6100
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ValueProposition: React.FC<{ progress: number }> = ({ progress }) => {
  const titleProgress = interpolate(progress, [0, 0.5], [0, 1], { easing: Easing.easeOut });
  const textProgress = interpolate(progress, [0.4, 0.9], [0, 1], { easing: Easing.easeOut });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "200px",
      }}
    >
      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            lineHeight: 1.2,
            color: BrandColors.white,
            margin: "0 0 16px",
          }}
        >
          ONE PLATFORM.<br/>
          <span style={{ color: BrandColors.crimsonRed }}>A SMARTER WAY</span><br/>
          TO BUY AND SELL VEHICLES.
        </h1>
      </div>

      <div
        style={{
          opacity: textProgress,
          transform: `translateY(${interpolate(textProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          marginTop: "24px",
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: BrandColors.metallicGray,
            margin: 0,
          }}
          >
          Seamlessly connecting buyers and sellers across desktop and mobile.
          Verified identities, transparent bidding, guided payments, and real-time
          shipment tracking — all in one unified experience.
        </p>
      </div>
    </AbsoluteFill>
  );
};

const KeywordsDisplay: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const keywords = [
    { label: "VERIFIED USERS", color: BrandColors.green, icon: "✓" },
    { label: "VEHICLE MARKETPLACE", color: BrandColors.crimsonRed, icon: "🏁" },
    { label: "SECURE BIDDING", color: "#F5A623", icon: "🔨" },
    { label: "PAYMENT GUIDANCE", color: "#7B61FF", icon: "💳" },
    { label: "SHIPMENT TRACKING", color: "#00D4AA", icon: "🚚" },
  ];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 25,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: progress,
        }}
      >
        {keywords.map((keyword, i) => {
          const keywordProgress = Math.max(0, Math.min(1, (progress - i * 0.08) / 0.6));

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                background: `linear-gradient(135deg, ${keyword.color}20, ${keyword.color}10)`,
                border: `1px solid ${keyword.color}`,
                borderRadius: "50px",
                backdropFilter: "blur(16px)",
                opacity: keywordProgress,
                transform: `translateY(${interpolate(keywordProgress, [0, 1], [40, 0], { easing: Easing.easeOut })}px) scale(${interpolate(keywordProgress, [0, 1], [0.8, 1], { easing: Easing.backOut })})`,
                boxShadow: `0 0 30px ${keyword.color}30`,
                animation: `keywordFloat 3s ease-in-out infinite ${i * 0.2}s`,
              }}
            >
              <span style={{ fontSize: "18px" }}>{keyword.icon}</span>
              <span style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", color: BrandColors.white }}>
                {keyword.label}
              </span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes keywordFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

const TextOverlays: React.FC<{ progress: number }> = ({ progress }) => {
  const taglineProgress = interpolate(progress, [0.9, 1], [0, 1], { easing: Easing.easeOut });

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
            ONE PLATFORM. A SMARTER WAY TO BUY AND SELL VEHICLES.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};