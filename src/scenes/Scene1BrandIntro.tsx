import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  Easing,
} from "../brand";

interface Scene1BrandIntroProps {
  progress: number; // 0-1 over 8 seconds
}

export const Scene1BrandIntro: React.FC<Scene1BrandIntroProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps; // Absolute time in seconds

  // Animations within the 8-second scene
  const engineRevProgress = interpolate(progress, [0, 0.15], [0, 1], { easing: Easing.easeOut });
  const lightSweepProgress = interpolate(progress, [0.1, 0.35], [0, 1], { easing: Easing.cinematic });
  const vehicleSilhouetteProgress = interpolate(progress, [0.25, 0.5], [0, 1], { easing: Easing.easeOut });
  const logoRevealProgress = interpolate(progress, [0.45, 0.7], [0, 1], { easing: Easing.elasticOut });
  const taglineProgress = interpolate(progress, [0.6, 0.8], [0, 1], { easing: Easing.easeOut });
  const transitionProgress = interpolate(progress, [0.85, 1], [0, 1], { easing: Easing.easeIn });

  // Engine rev sound visualization (red pulse)
  const enginePulse = Math.sin(time * 30) * 0.1 + 0.9;
  const engineGlow = engineRevProgress * enginePulse * 0.4;

  // Light sweep position
  const sweepX = interpolate(lightSweepProgress, [0, 1], [-200, 2120], { easing: Easing.easeInOut });

  // Vehicle silhouettes
  const vehicles = useMemo(() => [
    { id: 1, x: 200, y: 600, scale: 1.2, delay: 0 },
    { id: 2, x: 800, y: 550, scale: 1, delay: 0.05 },
    { id: 3, x: 1400, y: 620, scale: 1.1, delay: 0.1 },
    { id: 4, x: 1700, y: 580, scale: 0.9, delay: 0.15 },
  ], []);

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Deep background gradient */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(200, 16, 46, ${0.15 * engineRevProgress}) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 70%, rgba(143, 0, 29, ${0.1 * engineRevProgress}) 0%, transparent 50%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Engine rev - expanding red ring */}
      {engineRevProgress > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: `${interpolate(engineRevProgress, [0, 1], [0, 800], { easing: Easing.expoOut })}px`,
              height: `${interpolate(engineRevProgress, [0, 1], [0, 800], { easing: Easing.expoOut })}px`,
              borderRadius: "50%",
              border: `2px solid ${BrandColors.crimsonRed}`,
              opacity: interpolate(engineRevProgress, [0, 0.5, 1], [0, 0.6, 0], { easing: Easing.easeOut }),
              boxShadow: `
                0 0 ${interpolate(engineRevProgress, [0, 1], [0, 100], { easing: Easing.easeOut })}px ${BrandColors.crimsonRed},
                inset 0 0 ${interpolate(engineRevProgress, [0, 1], [0, 50], { easing: Easing.easeOut })}px ${BrandColors.crimsonRed}
              `,
              transform: `scale(${enginePulse})`,
              transition: "transform 0.033s linear",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Crimson light sweep */}
      {lightSweepProgress > 0 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${sweepX}px`,
              top: "-200px",
              width: "400px",
              height: "1480px",
              transform: "rotate(-15deg)",
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(200, 16, 46, 0) 20%,
                rgba(200, 16, 46, ${0.8 * lightSweepProgress}) 40%,
                rgba(255, 255, 255, 0.9) 50%,
                rgba(200, 16, 46, ${0.8 * lightSweepProgress}) 60%,
                rgba(200, 16, 46, 0) 80%,
                transparent 100%
              )`,
              opacity: lightSweepProgress,
              filter: "blur(2px)",
              boxShadow: `
                0 0 100px ${BrandColors.crimsonRed},
                0 0 200px ${BrandColors.deepRed}
              `,
            }}
          />
        </AbsoluteFill>
      )}

      {/* Vehicle silhouettes emerging from darkness */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "100px",
          pointerEvents: "none",
        }}
      >
        {vehicles.map((vehicle) => {
          const vehicleProgress = Math.max(0, Math.min(1, (vehicleSilhouetteProgress - vehicle.delay) / (1 - vehicle.delay)));
          const yOffset = interpolate(vehicleProgress, [0, 1], [200, 0], { easing: Easing.easeOut });
          const opacity = vehicleProgress;
          const blur = interpolate(vehicleProgress, [0, 1], [20, 0], { easing: Easing.easeOut });

          return (
            <div
              key={vehicle.id}
              style={{
                position: "absolute",
                left: `${vehicle.x}px`,
                bottom: `${yOffset}px`,
                transform: `scale(${vehicle.scale * vehicleProgress})`,
                opacity,
                filter: `blur(${blur}px) drop-shadow(0 20px 60px rgba(0,0,0,0.8))`,
                pointerEvents: "none",
                transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <VehicleSilhouette color={BrandColors.metallicGray} />
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Logo reveal */}
      {logoRevealProgress > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Logo container with metallic reflections */}
          <div
            style={{
              transform: `scale(${interpolate(logoRevealProgress, [0, 1], [0.3, 1], { easing: Easing.backOut })})`,
              opacity: logoRevealProgress,
              filter: `drop-shadow(0 0 ${interpolate(logoRevealProgress, [0, 1], [0, 80], { easing: Easing.easeOut })}px ${BrandColors.crimsonRed})`,
            }}
          >
            {/* Logo background glow */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "-60px",
                right: "-60px",
                bottom: "-60px",
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(200,16,46,${0.3 * logoRevealProgress}) 0%, transparent 70%)`,
                zIndex: -1,
                animation: "Scene1BrandIntro-pulse 3s ease-in-out infinite",
              }}
            />

            {/* ShiftBid Logo - Motion Signal */}
            <LogoMark
              size={180}
              progress={logoRevealProgress}
              metallic={true}
            />

            {/* "6100" badge */}
            <div
              style={{
                marginTop: "16px",
                fontSize: "48px",
                fontWeight: 900,
                letterSpacing: "8px",
                color: BrandColors.white,
                textShadow: `
                  0 0 20px ${BrandColors.crimsonRed},
                  0 0 40px ${BrandColors.deepRed},
                  0 4px 20px rgba(0,0,0,0.8)
                `,
                opacity: interpolate(logoRevealProgress, [0.5, 1], [0, 1], { easing: Easing.easeOut }),
                transform: `translateY(${interpolate(logoRevealProgress, [0.5, 1], [30, 0], { easing: Easing.easeOut })}px)`,
              }}
            >
              6100
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: "32px",
              opacity: taglineProgress,
              transform: `translateY(${interpolate(taglineProgress, [0, 1], [40, 0], { easing: Easing.easeOut })}px)`,
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: BrandColors.crimsonRed,
                textShadow: `0 0 30px ${BrandColors.crimsonRed}`,
                marginBottom: "8px",
              }}
            >
              SHIFT FAST. BID SMART.
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Transition to website - screen wipe */}
      {transitionProgress > 0 && (
        <AbsoluteFill
          style={{
            background: `linear-gradient(90deg,
              ${BrandColors.nearBlack} 0%,
              ${BrandColors.nearBlack} ${transitionProgress * 100}%,
              transparent ${transitionProgress * 100}%,
              transparent 100%
            )`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      )}

      {/* Cinematic style for pulse animation */}
      <style>{`
        @keyframes Scene1BrandIntro-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

// Vehicle silhouette component
const VehicleSilhouette: React.FC<{ color: string }> = ({ color }) => (
  <svg width="280" height="100" viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Car body */}
    <path
      d="M20 60 L20 45 Q20 30 35 25 L100 25 Q115 25 120 35 L120 60 Z"
      fill={color}
      opacity="0.8"
    />
    {/* Roof */}
    <path
      d="M35 25 Q50 15 80 15 Q95 15 105 25"
      stroke={color}
      strokeWidth="3"
      fill="none"
      opacity="0.6"
    />
    {/* Wheels */}
    <circle cx="50" cy="60" r="12" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
    <circle cx="180" cy="60" r="12" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
    {/* Rear */}
    <path
      d="M180 60 L180 40 Q180 30 195 25 L250 25 L250 60 Z"
      fill={color}
      opacity="0.5"
    />
    {/* Window */}
    <path
      d="M45 28 L70 28 Q75 28 78 32 L78 45 L45 45 Z"
      fill={BrandColors.nearBlack}
      opacity="0.4"
    />
  </svg>
);

// Logo mark - ShiftBid Motion Signal
const LogoMark: React.FC<{ size: number; progress: number; metallic: boolean }> = ({
  size,
  progress,
  metallic,
}) => {
  const shimmerProgress = (progress * 3) % 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Metallic gradient */}
        <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E8E8ED" />
          <stop offset="50%" stopColor="#C8102E" />
          <stop offset="70%" stopColor="#8F001D" />
          <stop offset="100%" stopColor="#1A1A1F" />
        </linearGradient>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF445A" />
          <stop offset="50%" stopColor="#C8102E" />
          <stop offset="100%" stopColor="#8F001D" />
        </linearGradient>
        {/* Shimmer effect */}
        <linearGradient id="shimmer" x1="-100%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="url(#metallicGradient)"
        strokeWidth="4"
        opacity={progress}
        filter="url(#logoGlow)"
      />

      {/* Inner ring */}
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke={BrandColors.crimsonRed}
        strokeWidth="2"
        opacity={progress * 0.6}
        strokeDasharray="20 10"
        style={{
          strokeDashoffset: -shimmerProgress * 30,
          transition: "stroke-dashoffset 0.1s linear",
        }}
      />

      {/* ShiftBid "S" monogram - stylized as motion signal */}
      <g transform="translate(100, 100)" opacity={progress}>
        {/* Motion lines */}
        <g stroke="url(#redGradient)" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M-35 0 Q-20 -20 0 -15 Q20 -10 35 0" opacity={0.8 * progress} />
          <path d="M-35 0 Q-20 0 0 0 Q20 0 35 0" strokeWidth="8" opacity={progress} />
          <path d="M-35 0 Q-20 20 0 15 Q20 10 35 0" opacity={0.8 * progress} />
        </g>

        {/* Central pillar */}
        <rect
          x="-4"
          y="-40"
          width="8"
          height="80"
          rx="4"
          fill="url(#metallicGradient)"
          filter="url(#logoGlow)"
        />

        {/* Accent dots */}
        <circle cx="-20" cy="-35" r="3" fill={BrandColors.crimsonRed} opacity={0.8} />
        <circle cx="20" cy="-35" r="3" fill={BrandColors.crimsonRed} opacity={0.8} />
        <circle cx="-20" cy="35" r="3" fill={BrandColors.crimsonRed} opacity={0.8} />
        <circle cx="20" cy="35" r="3" fill={BrandColors.crimsonRed} opacity={0.8} />
      </g>

      {/* Shimmer sweep */}
      {metallic && progress > 0.3 && (
        <rect
          x="-100"
          y="-100"
          width="400"
          height="400"
          fill="url(#shimmer)"
          transform={`translate(${(shimmerProgress - 0.5) * 400}px, 0)`}
          opacity={0.3}
          style={{
            animation: "LogoMark-shimmer 2s ease-in-out infinite",
          }}
        />
      )}

      <style>{`
        @keyframes LogoMark-shimmer {
          0% { transform: translateX(-200px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(200px); opacity: 0; }
        }
      `}</style>
    </svg>
  );
};