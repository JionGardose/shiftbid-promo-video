import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  BrandTransitions,
  BrandBorderRadius,
  Easing,
  sampleVehicles,
  categories,
  formatPrice,
  lerpColor,
} from "./brand";

// Scene Components
import { Scene1BrandIntro } from "./scenes/Scene1BrandIntro";
import { Scene2WebsiteReveal } from "./scenes/Scene2WebsiteReveal";
import { Scene3VehicleDiscovery } from "./scenes/Scene3VehicleDiscovery";
import { Scene4SecureBidding } from "./scenes/Scene4SecureBidding";
import { Scene5MobileAppReveal } from "./scenes/Scene5MobileAppReveal";
import { Scene6LogisticsTracking } from "./scenes/Scene6LogisticsTracking";
import { Scene7CompleteEcosystem } from "./scenes/Scene7CompleteEcosystem";
import { Scene8FinalBrandReveal } from "./scenes/Scene8FinalBrandReveal";

// UI Components
import { WebsiteMockup } from "./components/WebsiteMockup";
import { MobileAppMockup } from "./components/MobileAppMockup";
import { DesktopMonitor } from "./components/DesktopMonitor";
import { Smartphone } from "./components/Smartphone";

// Voiceover timing data
const voiceoverSegments = [
  { start: 0, end: 8, text: "Buying and selling vehicles should be easier." },
  { start: 8, end: 14, text: "Introducing ShiftBid 6100." },
  { start: 14, end: 20, text: "A smarter digital marketplace designed to bring buyers and sellers together." },
  { start: 20, end: 28, text: "Discover vehicles. Explore detailed listings. And experience a more organized bidding process." },
  { start: 28, end: 36, text: "With verified users, transparent bidding, and payment guidance, every step becomes easier to navigate." },
  { start: 36, end: 42, text: "And the experience doesn't stop there." },
  { start: 42, end: 50, text: "From shipment scheduling to delivery tracking, ShiftBid helps users stay informed throughout the transaction." },
  { start: 50, end: 58, text: "Whether you're using our website or mobile application, your vehicle marketplace is always within reach." },
  { start: 58, end: 66, text: "One platform. A smarter way to buy and sell vehicles." },
  { start: 66, end: 74, text: "ShiftBid 6100." },
  { start: 74, end: 82, text: "Shift Fast. Bid Smart." },
  { start: 82, end: 90, text: "The future of vehicle transactions." },
];

interface ShiftBidPromoVideoProps {
  preview?: boolean;
}

export const ShiftBidPromoVideo: React.FC<ShiftBidPromoVideoProps> = ({ preview = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const currentTime = frame / fps;
  const totalDuration = durationInFrames / fps;

  // Scene timing (in seconds)
  const scenes = useMemo(() => [
    { id: 1, name: "Brand Intro", start: 0, end: 8, component: Scene1BrandIntro },
    { id: 2, name: "Website Reveal", start: 8, end: 20, component: Scene2WebsiteReveal },
    { id: 3, name: "Vehicle Discovery", start: 20, end: 30, component: Scene3VehicleDiscovery },
    { id: 4, name: "Secure Bidding", start: 30, end: 42, component: Scene4SecureBidding },
    { id: 5, name: "Mobile App Reveal", start: 42, end: 55, component: Scene5MobileAppReveal },
    { id: 6, name: "Logistics Tracking", start: 55, end: 68, component: Scene6LogisticsTracking },
    { id: 7, name: "Complete Ecosystem", start: 68, end: 78, component: Scene7CompleteEcosystem },
    { id: 8, name: "Final Brand Reveal", start: 78, end: 90, component: Scene8FinalBrandReveal },
  ], []);

  // Current scene progress (0-1)
  const sceneProgress = scenes.map((scene) => {
    if (currentTime <= scene.start) return 0;
    if (currentTime >= scene.end) return 1;
    return (currentTime - scene.start) / (scene.end - scene.start);
  });

  // Determine active scene
  const activeSceneIndex = scenes.findIndex((scene) => currentTime >= scene.start && currentTime < scene.end);
  const activeScene = activeSceneIndex >= 0 ? scenes[activeSceneIndex] : scenes[scenes.length - 1];

  // Voiceover display
  const currentVoiceover = voiceoverSegments.find(
    (seg) => currentTime >= seg.start && currentTime < seg.end
  );

  // Preview mode: show time indicator
  const showPreviewInfo = preview;

  return (
    <AbsoluteFill style={{ background: BrandColors.nearBlack, overflow: "hidden", position: "relative" }}>
      {/* Background atmospheric elements */}
      <AtmosphericBackground currentTime={currentTime} />

      {/* Only render the active scene (and previous for transitions) */}
      {(() => {
        const scenesToRender = [];
        const prevSceneIndex = activeSceneIndex > 0 ? activeSceneIndex - 1 : -1;

        // Add previous scene for transition (if not first scene)
        if (prevSceneIndex >= 0) {
          const prevScene = scenes[prevSceneIndex];
          const prevProgress = sceneProgress[prevSceneIndex];
          scenesToRender.push(
            <SceneWrapper
              key={`prev-${prevScene.id}`}
              progress={prevProgress}
              startTime={prevScene.start}
              endTime={prevScene.end}
              currentTime={currentTime}
            >
              {React.createElement(prevScene.component, { progress: prevProgress })}
            </SceneWrapper>
          );
        }

        // Add active scene
        const activeSceneComponent = scenes[activeSceneIndex];
        const activeProgress = sceneProgress[activeSceneIndex];
        scenesToRender.push(
          <SceneWrapper
            key={`active-${activeSceneComponent.id}`}
            progress={activeProgress}
            startTime={activeSceneComponent.start}
            endTime={activeSceneComponent.end}
            currentTime={currentTime}
          >
            {React.createElement(activeSceneComponent.component, { progress: activeProgress })}
          </SceneWrapper>
        );

        return scenesToRender;
      })()}

      {/* Global UI overlays */}
      <GlobalOverlays
        currentTime={currentTime}
        activeScene={activeScene.name}
        voiceover={currentVoiceover?.text}
        preview={preview}
      />
    </AbsoluteFill>
  );
};

// Scene wrapper for smooth transitions
interface SceneWrapperProps {
  progress: number;
  startTime: number;
  endTime: number;
  currentTime: number;
  children: React.ReactNode;
}

const SceneWrapper: React.FC<SceneWrapperProps> = ({
  progress,
  startTime,
  endTime,
  currentTime,
  children,
}) => {
  const isActive = currentTime >= startTime && currentTime < endTime;
  const isEntering = currentTime >= startTime - 0.5 && currentTime < startTime;
  const isExiting = currentTime >= endTime && currentTime < endTime + 0.5;

  let opacity = 0;
  if (isActive) {
    opacity = 1;
  } else if (isEntering) {
    opacity = Easing.easeOut((currentTime - (startTime - 0.5)) / 0.5);
  } else if (isExiting) {
    opacity = 1 - Easing.easeIn((currentTime - endTime) / 0.5);
  }

  if (opacity === 0) return null;

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: "none",
        transition: "opacity 0.3s ease-out",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Atmospheric background with subtle animations
const AtmosphericBackground: React.FC<{ currentTime: number }> = ({ currentTime }) => {
  // Subtle red glow pulse
  const glowIntensity = 0.15 + 0.05 * Math.sin(currentTime * 2);

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 20%, rgba(200, 16, 46, ${glowIntensity * 0.3}) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(143, 0, 29, ${glowIntensity * 0.2}) 0%, transparent 70%),
          ${BrandColors.nearBlack}
        `,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      {/* Floating particles */}
      <FloatingParticles currentTime={currentTime} count={30} />
      {/* Subtle grid lines */}
      <SubtleGrid currentTime={currentTime} />
    </AbsoluteFill>
  );
};

const FloatingParticles: React.FC<{ currentTime: number; count: number }> = ({ currentTime, count }) => {
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const seed = i * 137.5; // Golden angle
      arr.push({
        x: (seed * 100) % 1920,
        y: (seed * 73) % 1080,
        size: 1 + (seed * 3) % 3,
        speed: 0.02 + (seed * 0.01) % 0.03,
        opacity: 0.1 + (seed * 0.2) % 0.3,
        color: [(seed * 17) % 2 === 0 ? BrandColors.crimsonRed : BrandColors.metallicGray],
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
            left: `${(p.x + Math.sin(currentTime * p.speed * 100 + i) * 50) % 1920}px`,
            top: `${(p.y + Math.cos(currentTime * p.speed * 100 + i) * 30) % 1080}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color[0],
            opacity: p.opacity * (0.5 + 0.5 * Math.sin(currentTime * 2 + i)),
            filter: "blur(1px)",
            pointerEvents: "none",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const SubtleGrid: React.FC<{ currentTime: number }> = ({ currentTime }) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 1,
        backgroundImage: `
          linear-gradient(rgba(167, 167, 174, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167, 167, 174, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        opacity: 0.3,
        transform: `translate(${Math.sin(currentTime * 0.1) * 10}px, ${Math.cos(currentTime * 0.1) * 10}px)`,
      }}
    />
  );
};

// Global overlays (timecode, scene indicator, voiceover)
const GlobalOverlays: React.FC<{
  currentTime: number;
  activeScene: string;
  voiceover: string | undefined;
  preview: boolean;
}> = ({ currentTime, activeScene, voiceover, preview }) => {
  if (!preview) return null;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const frames = Math.floor((currentTime % 1) * 30);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        fontFamily: BrandTypography.fontFamily,
        color: BrandColors.white,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: BrandColors.crimsonRed }}>
            SHIFTBID 6100 PROMO
          </div>
          <div style={{ fontSize: "12px", color: BrandColors.metallicGray }}>
            Scene: {activeScene}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "monospace" }}>
            {minutes}:{seconds.toString().padStart(2, "0")}:{frames.toString().padStart(2, "0")}
          </div>
          <div style={{ fontSize: "12px", color: BrandColors.metallicGray }}>
            Frame: {Math.floor(currentTime * 30)} / 2700
          </div>
        </div>
      </div>

      {voiceover && (
        <div
          style={{
            marginTop: "auto",
            marginBottom: "40px",
            padding: "16px 24px",
            background: "rgba(8, 8, 12, 0.9)",
            border: `1px solid ${BrandColors.line}`,
            borderRadius: BrandBorderRadius.lg,
            backdropFilter: "blur(16px)",
            maxWidth: "800px",
            fontSize: "16px",
            lineHeight: 1.5,
            fontStyle: "italic",
            color: BrandColors.white,
            borderLeft: `3px solid ${BrandColors.crimsonRed}`,
          }}
        >
          🎙️ {voiceover}
        </div>
      )}
    </AbsoluteFill>
  );
};

export { voiceoverSegments };