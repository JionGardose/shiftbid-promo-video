import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { BrandColors, BrandTypography, Easing } from "../brand";
import type { CSSProperties } from "react";

interface DesktopMonitorProps {
  progress: number; // 0-1
  yOffset: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  screenContent: React.ReactNode;
}

export const DesktopMonitor: React.FC<DesktopMonitorProps> = ({
  progress,
  yOffset,
  rotateX,
  rotateY,
  scale,
  screenContent,
}) => {
  if (progress === 0) return null;

  // Monitor dimensions (16:9 aspect ratio)
  const monitorWidth = 1100;
  const monitorHeight = 620;
  const bezelWidth = 8;
  const standWidth = 200;
  const standHeight = 120;

  const transform = `
    translateY(${yOffset}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(${scale})
    perspective(1000px)
  `;

  const screenStyle = useMemo((): CSSProperties => ({
    position: "absolute",
    top: bezelWidth,
    left: bezelWidth,
    right: bezelWidth,
    bottom: bezelWidth + 4,
    borderRadius: "6px",
    overflow: "hidden",
    background: BrandColors.bg,
    boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
  }), [bezelWidth]);

  return (
    <div
      style={{
        position: "relative",
        transform,
        transformOrigin: "center bottom",
        filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 100px rgba(200,16,46,${0.1 * progress}))`,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* Monitor glow */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          left: "-40px",
          right: "-40px",
          bottom: "-40px",
          borderRadius: "24px",
          background: `radial-gradient(ellipse at center, rgba(200,16,46,${0.1 * progress}) 0%, transparent 70%)`,
          zIndex: -1,
          filter: "blur(60px)",
        }}
      />

      {/* Monitor body */}
      <div
        style={{
          position: "relative",
          width: monitorWidth,
          height: monitorHeight,
          background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
          borderRadius: "16px",
          border: `1px solid ${BrandColors.line}`,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 20px 60px rgba(0,0,0,0.6),
            0 0 100px rgba(0,0,0,0.4)
          `,
          overflow: "hidden",
        }}
      >
        {/* Top bezel with webcam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: bezelWidth,
            background: "linear-gradient(180deg, #15151b 0%, #0a0a0d 100%)",
            borderBottom: `1px solid ${BrandColors.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#2a2a35",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)",
            }}
          />
        </div>

        {/* Screen */}
        <div style={screenStyle}>
          {screenContent}
        </div>

        {/* Bottom bezel */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: bezelWidth + 4,
            background: "linear-gradient(180deg, #15151b 0%, #0a0a0d 100%)",
            borderTop: `1px solid ${BrandColors.line}`,
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              background: "linear-gradient(90deg, transparent, #30303a, transparent)",
            }}
          />
        </div>
      </div>

      {/* Monitor stand */}
      <div
        style={{
          position: "absolute",
          bottom: -standHeight,
          left: "50%",
          transform: `translateX(-50%) scale(${scale})`,
          width: standWidth,
          height: standHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        {/* Stand neck */}
        <div
          style={{
            width: "12px",
            height: "60px",
            background: "linear-gradient(180deg, #2a2a35 0%, #1a1a22 100%)",
            borderRadius: "6px",
            border: `1px solid ${BrandColors.line}`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        />
        {/* Stand base */}
        <div
          style={{
            width: standWidth,
            height: "16px",
            borderRadius: "8px",
            background: "linear-gradient(180deg, #2a2a35 0%, #1a1a22 100%)",
            border: `1px solid ${BrandColors.line}`,
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.05),
              0 4px 20px rgba(0,0,0,0.4)
            `,
          }}
        />
      </div>

      {/* Subtle screen reflection */}
      <div
        style={{
          position: "absolute",
          top: bezelWidth,
          left: bezelWidth,
          right: bezelWidth,
          bottom: bezelWidth + 4,
          borderRadius: "6px",
          background: `linear-gradient(180deg,
            rgba(255,255,255,0.02) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0,0,0,0.05) 100%
          )`,
          pointerEvents: "none",
          zIndex: 6,
        }}
      />
    </div>
  );
};

// Laptop variant for different scenes
export const LaptopMonitor: React.FC<{
  progress: number;
  yOffset: number;
  rotateX: number;
  scale: number;
  screenContent: React.ReactNode;
  openAngle?: number;
}> = ({
  progress,
  yOffset,
  rotateX,
  scale,
  screenContent,
  openAngle = 110,
}) => {
  if (progress === 0) return null;

  const width = 900;
  const height = 560;
  const bezel = 6;
  const baseHeight = 12;

  return (
    <div
      style={{
        position: "relative",
        transform: `translateY(${yOffset}px) rotateX(${rotateX}deg) scale(${scale})`,
        transformOrigin: "center bottom",
        filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.5))`,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* Laptop base */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: width + 40,
          height: baseHeight,
          borderRadius: "6px",
          background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
          border: `1px solid ${BrandColors.line}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          zIndex: 0,
        }}
      />

      {/* Laptop screen */}
      <div
        style={{
          position: "relative",
          width: width,
          height: height,
          margin: "0 auto",
          background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
          borderRadius: "12px",
          border: `1px solid ${BrandColors.line}`,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 20px 60px rgba(0,0,0,0.5),
            0 0 80px rgba(0,0,0,0.3)
          `,
          overflow: "hidden",
          transformOrigin: "bottom center",
          transform: `rotateX(${180 - openAngle}deg)`,
        }}
      >
        {/* Top bezel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: bezel + 8,
            background: "linear-gradient(180deg, #15151b 0%, #0a0a0d 100%)",
            borderBottom: `1px solid ${BrandColors.line}`,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#2a2a35",
            }}
          />
        </div>

        {/* Screen content */}
        <div
          style={{
            position: "absolute",
            top: bezel + 8,
            left: bezel,
            right: bezel,
            bottom: bezel,
            borderRadius: "6px",
            overflow: "hidden",
            background: BrandColors.bg,
          }}
        >
          {screenContent}
        </div>

        {/* Screen reflection */}
        <div
          style={{
            position: "absolute",
            top: bezel + 8,
            left: bezel,
            right: bezel,
            bottom: bezel,
            borderRadius: "6px",
            background: `linear-gradient(180deg,
              rgba(255,255,255,0.02) 0%,
              transparent 30%,
              transparent 70%,
              rgba(0,0,0,0.05) 100%
            )`,
            pointerEvents: "none",
            zIndex: 6,
          }}
        />
      </div>
    </div>
  );
};