import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  Easing,
} from "../brand";

interface Scene8FinalBrandRevealProps {
  progress: number; // 0-1 over 12 seconds (78-90s)
}

export const Scene8FinalBrandReveal: React.FC<Scene8FinalBrandRevealProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Scene animations
  const darkProgress = interpolate(progress, [0, 0.15], [0, 1], { easing: Easing.easeIn });
  const vehicleProgress = interpolate(progress, [0.1, 0.4], [0, 1], { easing: Easing.cinematic });
  const lightSweepProgress = interpolate(progress, [0.2, 0.5], [0, 1], { easing: Easing.easeInOut });
  const logoProgress = interpolate(progress, [0.4, 0.7], [0, 1], { easing: Easing.elasticOut });
  const taglineProgress = interpolate(progress, [0.6, 0.8], [0, 1], { easing: Easing.easeOut });
  const finalTextProgress = interpolate(progress, [0.75, 0.9], [0, 1], { easing: Easing.easeOut });
  const holdProgress = interpolate(progress, [0.9, 1], [0, 1], { easing: Easing.easeIn });

  // Vehicle animation - driving through red light
  const vehicleX = interpolate(vehicleProgress, [0, 1], [-300, 2220], { easing: Easing.cinematic });
  const vehicleScale = interpolate(vehicleProgress, [0, 0.3, 0.7, 1], [0.5, 1.5, 1.2, 0.8], { easing: Easing.easeInOut });
  const vehicleY = interpolate(vehicleProgress, [0, 1], [600, 480], { easing: Easing.easeInOut });

  // Light sweep across screen
  const sweepX = interpolate(lightSweepProgress, [0, 1], [-400, 2320], { easing: Easing.easeInOut });

  // Logo animation
  const logoScale = interpolate(logoProgress, [0, 1], [0.3, 1], { easing: Easing.backOut });
  const logoGlow = 0.5 + 0.5 * Math.sin(time * 2);

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Pure dark background */}
      <AbsoluteFill
        style={{
          background: BrandColors.nearBlack,
        }}
      />

      {/* Subtle atmospheric glow */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(200, 16, 46, ${0.15 * darkProgress}) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 60%, rgba(143, 0, 29, ${0.1 * darkProgress}) 0%, transparent 50%),
          `,
        }}
      />

      {/* Cinematic light sweep - dramatic red light */}
      {lightSweepProgress > 0 && (
        <AbsoluteFill style={{ pointerEvents: "none", zIndex: 5 }}>
          <div
            style={{
              position: "absolute",
              left: `${sweepX}px`,
              top: "-300px",
              width: "600px",
              height: "1680px",
              transform: "rotate(-12deg)",
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(200, 16, 46, 0) 15%,
                rgba(200, 16, 46, ${0.6 * lightSweepProgress}) 35%,
                rgba(255, 255, 255, 0.95) 50%,
                rgba(200, 16, 46, ${0.6 * lightSweepProgress}) 65%,
                rgba(200, 16, 46, 0) 85%,
                transparent 100%
              )`,
              opacity: lightSweepProgress,
              filter: "blur(3px)",
              boxShadow: `
                0 0 150px ${BrandColors.crimsonRed},
                0 0 300px ${BrandColors.deepRed}
              `,
            }}
          />

          {/* Secondary subtle sweep */}
          <div
            style={{
              position: "absolute",
              left: `${sweepX - 200}px`,
              top: "-200px",
              width: "200px",
              height: "1480px",
              transform: "rotate(-12deg)",
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(200, 16, 46, ${0.2 * lightSweepProgress}) 50%,
                transparent 100%
              )`,
              opacity: lightSweepProgress * 0.5,
              filter: "blur(10px)",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Vehicle driving through light - hero car */}
      {vehicleProgress > 0 && (
        <AbsoluteFill style={{ pointerEvents: "none", zIndex: 10 }}>
          <div
            style={{
              position: "absolute",
              left: `${vehicleX}px`,
              top: `${vehicleY}px`,
              transform: `scale(${vehicleScale}) translateZ(0)`,
              opacity: vehicleProgress,
              filter: `drop-shadow(0 30px 80px rgba(0,0,0,0.9))`,
              pointerEvents: "none",
            }}
          >
            <HeroVehicle
              progress={vehicleProgress}
              time={time}
              lightIntensity={lightSweepProgress}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* Ground reflection */}
      <AbsoluteFill style={{ pointerEvents: "none", zIndex: 8 }}>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "300px",
            background: `linear-gradient(180deg,
              rgba(200,16,46,${0.15 * vehicleProgress}) 0%,
              rgba(200,16,46,${0.05 * vehicleProgress}) 30%,
              transparent 100%
            )`,
            opacity: vehicleProgress,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>

      {/* Logo reveal - center stage */}
      {logoProgress > 0 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoProgress,
              filter: `drop-shadow(0 0 ${interpolate(logoProgress, [0, 1], [0, 120 * logoGlow], { easing: Easing.easeOut })}px ${BrandColors.crimsonRed})`,
            }}
          >
            {/* Logo background glow pulse */}
            <div
              style={{
                position: "absolute",
                top: "-100px",
                left: "-100px",
                right: "-100px",
                bottom: "-100px",
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(200,16,46,${0.4 * logoProgress * logoGlow}) 0%, transparent 70%)`,
                zIndex: -1,
                animation: "logoPulse 2.5s ease-in-out infinite",
              }}
            />

            {/* Main Logo */}
            <FinalLogoMark size={280} progress={logoProgress} time={time} />

            {/* "6100" */}
            <div
              style={{
                marginTop: "24px",
                fontSize: "64px",
                fontWeight: 900,
                letterSpacing: "12px",
                color: BrandColors.white,
                textShadow: `
                  0 0 40px ${BrandColors.crimsonRed},
                  0 0 80px ${BrandColors.deepRed},
                  0 8px 40px rgba(0,0,0,0.9)
                `,
                opacity: interpolate(logoProgress, [0.5, 1], [0, 1], { easing: Easing.easeOut }),
                transform: `translateY(${interpolate(logoProgress, [0.5, 1], [40, 0], { easing: Easing.easeOut })}px)`,
              }}
            >
              6100
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: "40px",
              opacity: taglineProgress,
              transform: `translateY(${interpolate(taglineProgress, [0, 1], [50, 0], { easing: Easing.easeOut })}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "8px",
                textTransform: "uppercase",
                color: BrandColors.crimsonRed,
                textShadow: `0 0 40px ${BrandColors.crimsonRed}`,
                marginBottom: "16px",
                animation: "taglineGlow 3s ease-in-out infinite",
              }}
            >
              SHIFT FAST. BID SMART.
            </div>
          </div>

          {/* Final brand statement */}
          <div
            style={{
              marginTop: "32px",
              opacity: finalTextProgress,
              transform: `translateY(${interpolate(finalTextProgress, [0, 1], [40, 0], { easing: Easing.easeOut })}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "2px",
                color: BrandColors.metallicGray,
                textShadow: "0 4px 30px rgba(0,0,0,0.8)",
              }}
            >
              THE FUTURE OF VEHICLE TRANSACTIONS
            </div>
          </div>

          <style>{`
            @keyframes logoPulse {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.1); }
            }
            @keyframes taglineGlow {
              0%, 100% { text-shadow: 0 0 30px currentColor; }
              50% { text-shadow: 0 0 60px currentColor, 0 0 100px currentColor; }
            }
          `}</style>
        </AbsoluteFill>
      )}

      {/* Final hold - logo stays on screen */}
      {holdProgress > 0 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              opacity: holdProgress,
            }}
          >
            <div
              style={{
                width: "120px",
                height: "4px",
                background: `linear-gradient(90deg, transparent, ${BrandColors.crimsonRed}, transparent)`,
                margin: "0 auto 20px",
                borderRadius: "2px",
                opacity: holdProgress,
              }}
            />
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: BrandColors.metallicGray,
                opacity: holdProgress * 0.8,
              }}
            >
              GROUP 2ONIA
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Screen flash at key moments */}
      {progress > 0.38 && progress < 0.42 && (
        <AbsoluteFill
          style={{
            background: `rgba(255,255,255,${0.3 * Math.sin((progress - 0.38) * 25 * Math.PI)})`,
            pointerEvents: "none",
            zIndex: 25,
          }}
        />
      )}

      {progress > 0.68 && progress < 0.72 && (
        <AbsoluteFill
          style={{
            background: `rgba(200,16,46,${0.4 * Math.sin((progress - 0.68) * 25 * Math.PI)})`,
            pointerEvents: "none",
            zIndex: 25,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

const HeroVehicle: React.FC<{ progress: number; time: number; lightIntensity: number }> = ({
  progress,
  time,
  lightIntensity,
}) => {
  // Vehicle body lighting based on light sweep
  const bodyLight = lightIntensity;
  const rimLight = Math.max(0, lightIntensity - 0.3) * 2;

  return (
    <svg width="600" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Car body gradient - lit by red light */}
        <linearGradient id="carBodyLit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`rgba(255,255,255,${0.1 + bodyLight * 0.3})`} />
          <stop offset="30%" stopColor={`rgba(200,16,46,${0.4 * bodyLight})`} />
          <stop offset="50%" stopColor={`rgba(143,0,29,${0.6 * bodyLight})`} />
          <stop offset="70%" stopColor={`rgba(20,20,25,${0.8 + bodyLight * 0.2})`} />
          <stop offset="100%" stopColor="#08080C" />
        </linearGradient>
        <linearGradient id="carBodyDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a22" />
          <stop offset="50%" stopColor="#0f0f14" />
          <stop offset="100%" stopColor="#08080C" />
        </linearGradient>
        <linearGradient id="rimLight" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,16,46,0)" />
          <stop offset="100%" stopColor={`rgba(255,68,90,${rimLight})`} />
        </linearGradient>
        <radialGradient id="headlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="rgba(255,204,0,0)" />
        </radialGradient>
        <radialGradient id="taillight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3344" />
          <stop offset="100%" stopColor="rgba(255,51,68,0)" />
        </radialGradient>
      </defs>

      {/* Car body - main silhouette */}
      <path
        d="M50 140 L50 80 Q50 50 80 40 L320 40 Q350 50 350 80 L350 140 Z"
        fill="url(#carBodyLit)"
        stroke="url(#rimLight)"
        strokeWidth="2"
        opacity={0.9}
        filter="drop-shadow(0 10px 40px rgba(0,0,0,0.8))"
      />

      {/* Roof and windows */}
      <path
        d="M80 40 Q130 20 220 20 Q270 20 300 40"
        stroke="#1a1a22"
        strokeWidth="4"
        fill="none"
        opacity={0.8}
      />
      <path
        d="M95 38 Q150 22 230 22 Q265 22 285 38 L285 75 L95 75 Z"
        fill="#0a0a0d"
        opacity={0.6}
      />

      {/* Hood and front */}
      <path
        d="M80 80 L80 40 Q80 30 90 25 L120 25"
        stroke="#2a2a35"
        strokeWidth="2"
        fill="none"
        opacity={0.5}
      />

      {/* Rear */}
      <path
        d="M320 80 L320 40 Q320 30 330 25 L350 25"
        stroke="#2a2a35"
        strokeWidth="2"
        fill="none"
        opacity={0.5}
      />

      {/* Wheels */}
      <g>
        {/* Front wheel */}
        <circle cx="130" cy="140" r="28" fill="#0a0a0d" stroke="#2a2a35" strokeWidth="3" />
        <circle cx="130" cy="140" r="22" fill="none" stroke="#3a3a45" strokeWidth="2" />
        <circle cx="130" cy="140" r="18" fill="none" stroke="#4a4a55" strokeWidth="1" opacity="0.5" />
        {/* Brake caliper - red accent */}
        <rect x="118" y="128" width="24" height="12" rx="2" fill={BrandColors.crimsonRed} opacity={0.6 * bodyLight + 0.2} />

        {/* Rear wheel */}
        <circle cx="290" cy="140" r="28" fill="#0a0a0d" stroke="#2a2a35" strokeWidth="3" />
        <circle cx="290" cy="140" r="22" fill="none" stroke="#3a3a45" strokeWidth="2" />
        <circle cx="290" cy="140" r="18" fill="none" stroke="#4a4a55" strokeWidth="1" opacity="0.5" />
        <rect x="278" y="128" width="24" height="12" rx="2" fill={BrandColors.crimsonRed} opacity={0.6 * bodyLight + 0.2} />
      </g>

      {/* Headlights */}
      <ellipse cx="65" cy="95" rx="18" ry="10" fill="url(#headlight)" opacity={0.9} filter="blur(2px)" />
      <ellipse cx="65" cy="95" rx="14" ry="7" fill="#fff" opacity={0.6} />
      <ellipse cx="65" cy="95" rx="8" ry="4" fill="#fff" opacity={0.9} />

      {/* Taillights */}
      <ellipse cx="335" cy="95" rx="16" ry="12" fill="url(#taillight)" opacity={0.9} filter="blur(3px)" />
      <ellipse cx="335" cy="95" rx="12" ry="8" fill="#ff3344" opacity={0.7} />
      <ellipse cx="335" cy="95" rx="8" ry="5" fill="#ff6677" opacity={0.9} />

      {/* Side details - character lines */}
      <path
        d="M90 100 Q150 95 250 95"
        stroke="#2a2a35"
        strokeWidth="1.5"
        fill="none"
        opacity={0.4}
      />
      <path
        d="M90 120 Q150 125 250 125"
        stroke="#2a2a35"
        strokeWidth="1"
        fill="none"
        opacity={0.3}
      />

      {/* Red accent stripe when lit */}
      {bodyLight > 0.3 && (
        <path
          d="M90 70 Q150 68 250 68"
          stroke={BrandColors.crimsonRed}
          strokeWidth={2}
          fill="none"
          opacity={bodyLight * 0.6}
          style={{ filter: "blur(1px)" }}
        />
      )}

      {/* Exhaust */}
      <rect x="355" y="125" width="15" height="8" rx="2" fill="#1a1a22" stroke="#3a3a45" strokeWidth="1" />
      {bodyLight > 0.2 && (
        <ellipse
          cx="362.5"
          cy="129"
          rx="10"
          ry="4"
          fill={BrandColors.crimsonRed}
          opacity={bodyLight * 0.4}
          style={{ filter: "blur(4px)", animation: "exhaustPulse 0.3s ease-in-out infinite" }}
        />
      )}

      <style>{`
        @keyframes exhaustPulse {
          0%, 100% { opacity: 0.3; rx: 10; }
          50% { opacity: 0.6; rx: 14; }
        }
      `}</style>
    </svg>
  );
};

const FinalLogoMark: React.FC<{ size: number; progress: number; time: number }> = ({
  size,
  progress,
  time,
}) => {
  const shimmerProgress = (time * 0.3) % 1;
  const pulseScale = 1 + Math.sin(time * 1.5) * 0.02;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finalMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#F0F0F5" />
          <stop offset="40%" stopColor="#E8E8ED" />
          <stop offset="50%" stopColor="#C8102E" />
          <stop offset="60%" stopColor="#A90F2B" />
          <stop offset="80%" stopColor="#8F001D" />
          <stop offset="100%" stopColor="#1A1A1F" />
        </linearGradient>
        <linearGradient id="finalRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF556B" />
          <stop offset="50%" stopColor="#C8102E" />
          <stop offset="100%" stopColor="#8F001D" />
        </linearGradient>
        <linearGradient id="finalShimmer" x1="-100%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="finalGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring - metallic */}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="url(#finalMetallic)"
        strokeWidth="5"
        filter="url(#finalGlow)"
        style={{ transform: `scale(${pulseScale})`, transformOrigin: "100px 100px" }}
      />

      {/* Inner ring - red accent */}
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="url(#finalRed)"
        strokeWidth="3"
        opacity={0.6}
        strokeDasharray="25 15"
        style={{
          strokeDashoffset: -shimmerProgress * 40,
          transform: `scale(${pulseScale})`,
          transformOrigin: "100px 100px",
        }}
      />

      {/* Center pillar ring */}
      <circle
        cx="100"
        cy="100"
        r="52"
        fill="none"
        stroke={BrandColors.crimsonRed}
        strokeWidth="1"
        opacity={0.3}
        strokeDasharray="10 10"
        style={{
          strokeDashoffset: shimmerProgress * 20,
        }}
      />

      {/* Motion Signal - the "S" monogram */}
      <g transform="translate(100, 100)" style={{ transform: `scale(${pulseScale})`, transformOrigin: "center" }}>
        {/* Three motion lines */}
        <g stroke="url(#finalRed)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#finalGlow)">
          <path d="M-40 0 Q-22 -25 0 -18 Q22 -12 40 0" opacity={0.8} />
          <path d="M-40 0 Q-22 0 0 0 Q22 0 40 0" strokeWidth="9" opacity={1} />
          <path d="M-40 0 Q-22 25 0 18 Q22 12 40 0" opacity={0.8} />
        </g>

        {/* Central pillar - metallic */}
        <rect
          x="-5"
          y="-45"
          width="10"
          height="90"
          rx="5"
          fill="url(#finalMetallic)"
          filter="url(#finalGlow)"
        />

        {/* Accent indicators */}
        <g>
          <circle cx="-25" cy="-40" r="4" fill={BrandColors.crimsonRed} opacity={0.9} />
          <circle cx="25" cy="-40" r="4" fill={BrandColors.crimsonRed} opacity={0.9} />
          <circle cx="-25" cy="40" r="4" fill={BrandColors.crimsonRed} opacity={0.9} />
          <circle cx="25" cy="40" r="4" fill={BrandColors.crimsonRed} opacity={0.9} />
        </g>

        {/* Subtle rotation hint */}
        <path
          d="M-50 -50 Q-30 -60 0 -50"
          stroke={BrandColors.crimsonRed}
          strokeWidth="1.5"
          fill="none"
          opacity={0.2}
          strokeDasharray="15 10"
          style={{
            strokeDashoffset: time * 30,
            animation: "rotateHint 4s linear infinite",
          }}
        />
      </g>

      {/* Shimmer sweep across logo */}
      <rect
        x="-120"
        y="-120"
        width="480"
        height="480"
        fill="url(#finalShimmer)"
        transform={`translate(${(shimmerProgress - 0.5) * 480}px, 0)`}
        opacity={0.25}
      />

      <style>{`
        @keyframes rotateHint {
          0% { stroke-dashoffset: 0; opacity: 0; }
          25% { opacity: 0.2; }
          50% { opacity: 0; }
          100% { stroke-dashoffset: 50; opacity: 0; }
        }
      `}</style>
    </svg>
  );
};