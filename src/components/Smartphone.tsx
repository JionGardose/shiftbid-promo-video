import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { BrandColors, BrandTypography, Easing } from "../brand";
import type { CSSProperties } from "react";

interface SmartphoneProps {
  progress: number; // 0-1
  yOffset: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  screenContent: React.ReactNode;
  showDynamicIsland?: boolean;
}

export const Smartphone: React.FC<SmartphoneProps> = ({
  progress,
  yOffset,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  screenContent,
  showDynamicIsland = true,
}) => {
  if (progress === 0) return null;

  // iPhone 15 Pro-like dimensions (16:9 adapted for phone)
  const phoneWidth = 380;
  const phoneHeight = 820;
  const borderRadius = 48;
  const bezel = 4;
  const frameWidth = 8;
  const islandWidth = 140;
  const islandHeight = 30;

  const transform = `
    translateY(${yOffset}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
    scale(${scale})
    perspective(1000px)
  `;

  const screenStyle = useMemo((): CSSProperties => ({
    position: "absolute",
    top: frameWidth + bezel + (showDynamicIsland ? islandHeight + 6 : bezel),
    left: frameWidth + bezel,
    right: frameWidth + bezel,
    bottom: frameWidth + bezel,
    borderRadius: borderRadius - frameWidth - bezel,
    overflow: "hidden",
    background: BrandColors.appBg,
    boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
  }), [frameWidth, bezel, borderRadius, showDynamicIsland, islandHeight]);

  return (
    <div
      style={{
        position: "relative",
        transform,
        transformOrigin: "center center",
        filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 0 100px rgba(200,16,46,${0.15 * progress}))`,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* Phone glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          right: "-60px",
          bottom: "-60px",
          borderRadius: borderRadius + 60,
          background: `radial-gradient(ellipse at center, rgba(200,16,46,${0.12 * progress}) 0%, transparent 70%)`,
          zIndex: -1,
          filter: "blur(80px)",
        }}
      />

      {/* Phone body */}
      <div
        style={{
          position: "relative",
          width: phoneWidth,
          height: phoneHeight,
          background: "linear-gradient(180deg, #0f0f14 0%, #08080c 100%)",
          borderRadius: borderRadius,
          border: `1px solid ${BrandColors.appLine}`,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 30px 80px rgba(0,0,0,0.7),
            0 0 120px rgba(0,0,0,0.5)
          `,
          overflow: "hidden",
        }}
      >
        {/* Top bezel / Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: frameWidth,
            left: frameWidth,
            right: frameWidth,
            height: showDynamicIsland ? islandHeight + bezel * 2 : bezel,
            background: "linear-gradient(180deg, #0a0a0d 0%, #050507 100%)",
            borderBottom: `1px solid ${BrandColors.appLine}`,
            borderTopLeftRadius: borderRadius - frameWidth,
            borderTopRightRadius: borderRadius - frameWidth,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          {showDynamicIsland && (
            <div
              style={{
                width: islandWidth,
                height: islandHeight,
                borderRadius: islandHeight / 2,
                background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
                border: `1px solid ${BrandColors.appLine}`,
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.05),
                  0 2px 10px rgba(0,0,0,0.5)
                `,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "5px",
                  borderRadius: "2.5px",
                  background: "linear-gradient(90deg, #30303a, #40404a, #30303a)",
                }}
              />
            </div>
          )}

          {!showDynamicIsland && (
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#1a1a22",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)",
              }}
            />
          )}
        </div>

        {/* Screen */}
        <div style={screenStyle}>
          {screenContent}
        </div>

        {/* Bottom bezel / Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: frameWidth,
            left: frameWidth,
            right: frameWidth,
            height: bezel + 24,
            background: "linear-gradient(180deg, #0a0a0d 0%, #050507 100%)",
            borderTop: `1px solid ${BrandColors.appLine}`,
            borderBottomLeftRadius: borderRadius - frameWidth,
            borderBottomRightRadius: borderRadius - frameWidth,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "8px",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "134px",
              height: "5px",
              borderRadius: "2.5px",
              background: "linear-gradient(90deg, #30303a, #40404a, #30303a)",
            }}
          />
        </div>

        {/* Side buttons - right side (power) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "25%",
            transform: "translateY(-50%)",
            width: frameWidth,
            height: "60px",
            background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
            borderLeft: `1px solid ${BrandColors.appLine}`,
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        />

        {/* Side buttons - left side (volume) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "35%",
            transform: "translateY(-50%)",
            width: frameWidth,
            height: "100px",
            background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
            borderRight: `1px solid ${BrandColors.appLine}`,
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, borderBottom: `1px solid ${BrandColors.appLine}` }} />
          <div style={{ flex: 1 }} />
        </div>

        {/* Screen reflection */}
        <div
          style={{
            position: "absolute",
            top: frameWidth + bezel + (showDynamicIsland ? islandHeight + 6 : bezel),
            left: frameWidth + bezel,
            right: frameWidth + bezel,
            bottom: frameWidth + bezel,
            borderRadius: borderRadius - frameWidth - bezel,
            background: `linear-gradient(180deg,
              rgba(255,255,255,0.03) 0%,
              transparent 25%,
              transparent 75%,
              rgba(0,0,0,0.08) 100%
            )`,
            pointerEvents: "none",
            zIndex: 6,
          }}
        />

        {/* Edge highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: borderRadius,
            border: `1px solid rgba(255,255,255,0.05)`,
            pointerEvents: "none",
            zIndex: 7,
          }}
        />
      </div>

      {/* Ground reflection */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%) scaleX(1) scaleY(0.25)",
          width: phoneWidth + 40,
          height: phoneHeight,
          opacity: progress * 0.08,
          filter: "blur(30px)",
          background: `linear-gradient(180deg, rgba(200,16,46,0.15) 0%, transparent 100%)`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
};

// Tablet variant
export const Tablet: React.FC<{
  progress: number;
  yOffset: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  screenContent: React.ReactNode;
}> = ({
  progress,
  yOffset,
  rotateX,
  rotateY,
  scale,
  screenContent,
}) => {
  if (progress === 0) return null;

  const width = 760;
  const height = 1020;
  const borderRadius = 24;
  const bezel = 16;
  const frameWidth = 6;

  return (
    <div
      style={{
        position: "relative",
        transform: `translateY(${yOffset}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) perspective(1000px)`,
        transformOrigin: "center center",
        filter: `drop-shadow(0 40px 80px rgba(0,0,0,0.6))`,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
          background: "linear-gradient(180deg, #1a1a22 0%, #0d0d12 100%)",
          borderRadius,
          border: `1px solid ${BrandColors.line}`,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 30px 80px rgba(0,0,0,0.6)
          `,
          overflow: "hidden",
        }}
      >
        {/* Top bezel */}
        <div
          style={{
            position: "absolute",
            top: frameWidth,
            left: frameWidth,
            right: frameWidth,
            height: bezel,
            background: "linear-gradient(180deg, #15151b 0%, #0a0a0d 100%)",
            borderBottom: `1px solid ${BrandColors.line}`,
            borderTopLeftRadius: borderRadius - frameWidth,
            borderTopRightRadius: borderRadius - frameWidth,
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
            }}
          />
        </div>

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: frameWidth + bezel,
            left: frameWidth,
            right: frameWidth,
            bottom: frameWidth + bezel,
            borderRadius: borderRadius - frameWidth - bezel,
            overflow: "hidden",
            background: BrandColors.appBg,
          }}
        >
          {screenContent}
        </div>

        {/* Bottom bezel */}
        <div
          style={{
            position: "absolute",
            bottom: frameWidth,
            left: frameWidth,
            right: frameWidth,
            height: bezel,
            background: "linear-gradient(180deg, #15151b 0%, #0a0a0d 100%)",
            borderTop: `1px solid ${BrandColors.line}`,
            borderBottomLeftRadius: borderRadius - frameWidth,
            borderBottomRightRadius: borderRadius - frameWidth,
            zIndex: 5,
          }}
        />
      </div>
    </div>
  );
};