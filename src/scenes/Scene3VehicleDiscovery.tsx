import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  Easing,
  sampleVehicles,
  formatPrice,
} from "../brand";
import { DesktopMonitor } from "../components/DesktopMonitor";
import { WebsiteMockup } from "../components/WebsiteMockup";

interface Scene3VehicleDiscoveryProps {
  progress: number; // 0-1 over 10 seconds (20-30s)
}

export const Scene3VehicleDiscovery: React.FC<Scene3VehicleDiscoveryProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Scene animations
  const zoomProgress = interpolate(progress, [0, 0.2], [0, 1], { easing: Easing.easeOut });
  const searchProgress = interpolate(progress, [0.15, 0.35], [0, 1], { easing: Easing.easeOut });
  const categoryProgress = interpolate(progress, [0.3, 0.5], [0, 1], { easing: Easing.easeOut });
  const cardHoverProgress = interpolate(progress, [0.45, 0.65], [0, 1], { easing: Easing.easeOut });
  const detailProgress = interpolate(progress, [0.6, 0.85], [0, 1], { easing: Easing.easeOut });
  const specsProgress = interpolate(progress, [0.8, 1], [0, 1], { easing: Easing.easeOut });

  // Camera movement - zoom into marketplace
  const cameraScale = interpolate(zoomProgress, [0, 1], [1, 1.5], { easing: Easing.easeOut });
  const cameraX = interpolate(zoomProgress, [0, 1], [0, -100], { easing: Easing.easeOut });
  const cameraY = interpolate(zoomProgress, [0, 1], [0, -50], { easing: Easing.easeOut });

  // Floating animation
  const floatY = Math.sin(time * 1.5) * 5;

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark background */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(200, 16, 46, 0.08) 0%, transparent 60%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Main content with camera zoom */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${cameraX}px, ${cameraY + floatY}px) scale(${cameraScale})`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Monitor showing zoomed-in marketplace */}
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

      {/* Overlay animations - Search demonstration */}
      <SearchDemoOverlay progress={searchProgress} time={time} />

      {/* Category filter animation */}
      <CategoryFilterOverlay progress={categoryProgress} time={time} />

      {/* Vehicle card interaction */}
      <CardInteractionOverlay progress={cardHoverProgress} time={time} />

      {/* Vehicle detail view */}
      <DetailViewOverlay progress={detailProgress} time={time} />

      {/* Specs reveal */}
      <SpecsRevealOverlay progress={specsProgress} time={time} />

      {/* Text overlays */}
      <TextOverlays progress={progress} />
    </AbsoluteFill>
  );
};

const SearchDemoOverlay: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress === 0) return null;

  const searchQuery = "Porsche 911";
  const typedChars = Math.floor(progress * searchQuery.length);
  const displayedQuery = searchQuery.slice(0, typedChars);
  const cursorVisible = Math.sin(time * 8) > 0;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "200px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        {/* Search input simulation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(16, 16, 22, 0.95)",
            border: `1px solid ${BrandColors.line}`,
            borderRadius: "12px",
            padding: "16px 20px",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            minWidth: "500px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BrandColors.muted} strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span
            style={{
              fontSize: "16px",
              color: BrandColors.white,
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            {displayedQuery}
            {cursorVisible && typedChars < searchQuery.length && (
              <span style={{ color: BrandColors.crimsonRed, animation: "blink 1s infinite" }}>|</span>
            )}
          </span>
          <style>{`
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          `}</style>
        </div>

        {/* Search label */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: BrandColors.crimsonRed,
          }}
        >
          SEARCHING VEHICLES
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CategoryFilterOverlay: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress === 0) return null;

  const categories = [
    { name: "Supercars", icon: "🏁", active: true },
    { name: "Hypercars", icon: "⚡", active: false },
    { name: "Performance", icon: "🚀", active: false },
    { name: "Classics", icon: "🏛️", active: false },
    { name: "JDM Legends", icon: "🗾", active: false },
    { name: "Electric", icon: "🔋", active: false },
  ];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "320px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: cat.active
                  ? `linear-gradient(135deg, rgba(200,16,46,0.3), rgba(143,0,29,0.3))`
                  : "rgba(16, 16, 22, 0.9)",
                border: cat.active
                  ? `1px solid ${BrandColors.crimsonRed}`
                  : `1px solid ${BrandColors.line}`,
                borderRadius: "30px",
                color: cat.active ? BrandColors.white : BrandColors.muted,
                fontSize: "13px",
                fontWeight: cat.active ? 700 : 500,
                backdropFilter: "blur(16px)",
                boxShadow: cat.active
                  ? `0 0 20px rgba(200,16,46,0.3)`
                  : "none",
                transition: "all 0.3s ease",
                animation: `slideIn 0.4s ease-out ${i * 0.05}s both`,
              }}
            >
              <span style={{ fontSize: "16px" }}>{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </AbsoluteFill>
  );
};

const CardInteractionOverlay: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress === 0) return null;

  const vehicle = sampleVehicles[0];
  const hoverProgress = Math.sin(time * 2) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "400px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        {/* Highlighted vehicle card preview */}
        <div
          style={{
            background: BrandColors.panel,
            border: `2px solid ${BrandColors.crimsonRed}`,
            borderRadius: "16px",
            overflow: "hidden",
            width: "380px",
            boxShadow: `
              0 0 40px rgba(200,16,46,0.4),
              0 20px 60px rgba(0,0,0,0.5)
            `,
            transform: `scale(${1 + hoverProgress * 0.02})`,
          }}
        >
          <div
            style={{
              height: "165px",
              display: "grid",
              placeItems: "center",
              background: BrandColors.carArtGradient,
              position: "relative",
              fontSize: "80px",
            }}
          >
            <span style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}>{vehicle.image}</span>
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: BrandColors.red2,
                padding: "5px 9px",
                borderRadius: "7px",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              {vehicle.category}
            </div>
            {/* Pulsing highlight ring */}
            <div
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "16px",
                border: `2px solid ${BrandColors.crimsonRed}`,
                opacity: hoverProgress * 0.5,
                animation: "pulseRing 1.5s ease-out infinite",
              }}
            />
          </div>

          <div style={{ padding: "20px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800 }}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <div style={{ color: BrandColors.muted, fontSize: "12px", marginBottom: "12px" }}>
              {vehicle.mileage.toLocaleString()} mi • {vehicle.location}
            </div>
            <div style={{ fontSize: "24px", fontWeight: 900, margin: "12px 0", color: BrandColors.white }}>
              {formatPrice(vehicle.price)}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "12px 0" }}>
              {vehicle.specs.map((spec, i) => (
                <span
                  key={i}
                  style={{
                    border: `1px solid ${BrandColors.line}`,
                    borderRadius: "30px",
                    padding: "6px 12px",
                    color: "#c9c9d1",
                    fontSize: "12px",
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>
            <button
              style={{
                width: "100%",
                marginTop: "16px",
                border: 0,
                borderRadius: "10px",
                padding: "14px",
                background: BrandColors.red,
                color: "white",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              VIEW DETAILS & BID
            </button>
          </div>
        </div>

        <style>{`
          @keyframes pulseRing {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.05); opacity: 0; }
          }
        `}</style>
      </div>
    </AbsoluteFill>
  );
};

const DetailViewOverlay: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress === 0) return null;

  const vehicle = sampleVehicles[0];

  return (
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
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [50, 0], { easing: Easing.easeOut })}px) scale(${interpolate(progress, [0, 1], [0.9, 1], { easing: Easing.backOut })})`,
        }}
      >
        {/* Modal-style detail view */}
        <div
          style={{
            width: "900px",
            maxHeight: "90vh",
            background: "rgba(21, 21, 29, 0.98)",
            border: `1px solid ${BrandColors.line}`,
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: `
              0 0 80px rgba(200,16,46,0.2),
              0 30px 100px rgba(0,0,0,0.6)
            `,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Hero image */}
          <div
            style={{
              height: "280px",
              background: "linear-gradient(135deg, #33333e, #111)",
              display: "grid",
              placeItems: "center",
              position: "relative",
              fontSize: "140px",
            }}
          >
            <span style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))" }}>{vehicle.image}</span>
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button style={{ background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: "44px", height: "44px", color: "white", cursor: "pointer" }}>✕</button>
            </div>
          </div>

          {/* Details content */}
          <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 350px", gap: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "2px", color: BrandColors.crimsonRed, textTransform: "uppercase" }}>
                  {vehicle.category}
                </span>
                <span style={{ fontSize: "12px", color: BrandColors.green, fontWeight: 700 }}>✓ VERIFIED SELLER</span>
              </div>
              <h2 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-1px", margin: "0 0 8px" }}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p style={{ color: BrandColors.muted, fontSize: "15px", marginBottom: "24px" }}>
                {vehicle.mileage.toLocaleString()} miles • {vehicle.location} • {vehicle.seller}
              </p>

              {/* Specs grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
                {vehicle.specs.map((spec, i) => (
                  <div
                    key={i}
                    style={{
                      background: BrandColors.panel2,
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: BrandColors.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>SPEC</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: BrandColors.white }}>{spec}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ borderTop: `1px solid ${BrandColors.line}`, paddingTop: "24px" }}>
                <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Vehicle Description</h3>
                <p style={{ color: BrandColors.muted, lineHeight: 1.7 }}>
                  This exceptional {vehicle.year} {vehicle.make} {vehicle.model} represents the pinnacle of automotive engineering.
                  With only {vehicle.mileage.toLocaleString()} miles on the odometer, this vehicle has been meticulously maintained
                  by {vehicle.seller}. Every component has been verified and documented, ensuring complete transparency for the next owner.
                </p>
              </div>
            </div>

            {/* Bid panel */}
            <div
              style={{
                background: "rgba(19, 19, 25, 0.9)",
                border: `1px solid ${BrandColors.line}`,
                borderRadius: "16px",
                padding: "24px",
                height: "fit-content",
                position: "sticky",
                top: "24px",
              }}
            >
              <div style={{ fontSize: "12px", color: BrandColors.muted, marginBottom: "8px" }}>CURRENT HIGHEST BID</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: BrandColors.white, marginBottom: "16px" }}>
                {formatPrice(vehicle.currentBid)}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", color: BrandColors.muted, marginBottom: "8px" }}>
                  YOUR BID (USD)
                </label>
                <input
                  type="number"
                  placeholder="Enter bid amount"
                  style={{
                    width: "100%",
                    background: "#0c0c12",
                    color: "white",
                    border: `1px solid ${BrandColors.line}`,
                    borderRadius: "10px",
                    padding: "14px 16px",
                    fontSize: "18px",
                    fontWeight: 700,
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  background: "#25131a",
                  border: `1px solid #612236`,
                  color: "#f4c4ce",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  marginBottom: "16px",
                }}
              >
                Minimum bid: {formatPrice(vehicle.currentBid + 5000)}
              </div>

              <button
                style={{
                  width: "100%",
                  border: 0,
                  borderRadius: "10px",
                  padding: "16px",
                  background: BrandColors.red,
                  color: "white",
                  fontWeight: 800,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                PLACE BID
              </button>

              <p style={{ textAlign: "center", fontSize: "11px", color: BrandColors.muted, marginTop: "12px" }}>
                Demo bid - not legally binding
              </p>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SpecsRevealOverlay: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress === 0) return null;

  const vehicle = sampleVehicles[0];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "100px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {vehicle.specs.map((spec, i) => (
            <div
              key={i}
              style={{
                background: "rgba(19, 19, 25, 0.95)",
                border: `1px solid ${BrandColors.line}`,
                borderRadius: "12px",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                backdropFilter: "blur(16px)",
                animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`,
              }}
            >
              <span style={{ fontSize: "24px", color: BrandColors.crimsonRed }}>{["🏁", "⚡", "⚙️", "🔧"][i]}</span>
              <span style={{ fontSize: "16px", fontWeight: 700, color: BrandColors.white }}>{spec}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </AbsoluteFill>
  );
};

const TextOverlays: React.FC<{ progress: number }> = ({ progress }) => {
  const titleProgress = interpolate(progress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const taglineProgress = interpolate(progress, [0.7, 0.9], [0, 1], { easing: Easing.easeOut });

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
          VEHICLE DISCOVERY
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-1.5px", color: BrandColors.white, margin: 0 }}>
          Explore.<wbr/> Compare.<wbr/> Discover.
        </h1>
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
            EXPLORE. COMPARE. DISCOVER.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};