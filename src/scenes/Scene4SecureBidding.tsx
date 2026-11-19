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

interface Scene4SecureBiddingProps {
  progress: number; // 0-1 over 12 seconds (30-42s)
}

export const Scene4SecureBidding: React.FC<Scene4SecureBiddingProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Scene animations
  const bidPanelProgress = interpolate(progress, [0, 0.2], [0, 1], { easing: Easing.easeOut });
  const bidInputProgress = interpolate(progress, [0.15, 0.35], [0, 1], { easing: Easing.easeOut });
  const bidAnimationProgress = interpolate(progress, [0.3, 0.55], [0, 1], { easing: Easing.easeOut });
  const confirmationProgress = interpolate(progress, [0.5, 0.75], [0, 1], { easing: Easing.elasticOut });
  const bidHistoryProgress = interpolate(progress, [0.7, 0.9], [0, 1], { easing: Easing.easeOut });
  const taglineProgress = interpolate(progress, [0.85, 1], [0, 1], { easing: Easing.easeOut });

  // Pulsing red accent
  const pulseIntensity = 0.5 + 0.5 * Math.sin(time * 4);

  const vehicle = sampleVehicles[0];

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark background with red glow */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(200, 16, 46, ${0.12 * pulseIntensity}) 0%, transparent 50%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Monitor showing bidding interface */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <DesktopMonitor
          progress={1}
          yOffset={0}
          rotateX={0}
          rotateY={0}
          scale={1}
          screenContent={
            <BiddingInterface
              bidPanelProgress={bidPanelProgress}
              bidInputProgress={bidInputProgress}
              bidAnimationProgress={bidAnimationProgress}
              confirmationProgress={confirmationProgress}
              bidHistoryProgress={bidHistoryProgress}
              time={time}
            />
          }
        />
      </div>

      {/* Red accent lines animating */}
      <RedAccentLines progress={progress} time={time} />

      {/* Floating bid numbers */}
      <FloatingBidNumbers progress={bidAnimationProgress} time={time} />

      {/* Text overlays */}
      <TextOverlays
        progress={progress}
        taglineProgress={taglineProgress}
        bidAnimationProgress={bidAnimationProgress}
        confirmationProgress={confirmationProgress}
      />
    </AbsoluteFill>
  );
};

const BiddingInterface: React.FC<{
  bidPanelProgress: number;
  bidInputProgress: number;
  bidAnimationProgress: number;
  confirmationProgress: number;
  bidHistoryProgress: number;
  time: number;
}> = ({
  bidPanelProgress,
  bidInputProgress,
  bidAnimationProgress,
  confirmationProgress,
  bidHistoryProgress,
  time,
}) => {
  const vehicle = sampleVehicles[0];
  const currentBid = vehicle.currentBid;
  const animatedBid = Math.floor(interpolate(bidAnimationProgress, [0, 1], [currentBid, currentBid + 25000], { easing: Easing.easeOut }));
  const bidCount = Math.floor(interpolate(bidAnimationProgress, [0, 1], [12, 15], { easing: Easing.easeOut }));

  return (
    <div style={{ width: "100%", height: "100%", background: BrandColors.bg, overflow: "hidden" }}>
      {/* Modal overlay background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 10,
          opacity: bidPanelProgress,
        }}
      />

      {/* Bid Modal */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(bidPanelProgress, [0, 1], [0.8, 1], { easing: Easing.backOut })})`,
          width: "520px",
          maxWidth: "90vw",
          background: "#15151d",
          border: `1px solid #4b2630`,
          borderRadius: "18px",
          padding: "0",
          boxShadow: "0 20px 70px rgba(0,0,0,0.8)",
          zIndex: 20,
          opacity: bidPanelProgress,
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: `1px solid #4b2630`,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>Place Your Bid</h2>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#aaa",
              fontSize: "28px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Vehicle Summary */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid #4b2630` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "48px" }}>🏁</span>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 800 }}>{vehicle.year} {vehicle.make} {vehicle.model}</div>
              <div style={{ fontSize: "12px", color: BrandColors.muted }}>{vehicle.mileage.toLocaleString()} mi • {vehicle.location}</div>
            </div>
          </div>

          {/* Current bid display with animation */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: BrandColors.muted, marginBottom: "4px" }}>CURRENT HIGHEST BID</div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: BrandColors.white,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatPrice(animatedBid)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", color: BrandColors.muted, marginBottom: "4px" }}>BIDS PLACED</div>
              <div style={{ fontSize: "24px", fontWeight: 900, color: BrandColors.crimsonRed }}>{bidCount}</div>
            </div>
          </div>
        </div>

        {/* Bid Input Form */}
        <div style={{ padding: "24px" }}>
          <div
            style={{
              opacity: bidInputProgress,
              transform: `translateY(${interpolate(bidInputProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
            }}
          >
            <label style={{ display: "block", fontSize: "12px", color: "#bbb", marginBottom: "8px" }}>
              YOUR BID AMOUNT (USD)
            </label>
            <input
              type="number"
              placeholder="Enter bid higher than current"
              style={{
                width: "100%",
                background: "#0c0c12",
                color: "white",
                border: `1px solid ${BrandColors.line}`,
                borderRadius: "10px",
                padding: "14px 16px",
                fontSize: "20px",
                fontWeight: 700,
                outline: "none",
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>

          {/* Min bid notice */}
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "#25131a",
              border: `1px solid #612236`,
              color: "#f4c4ce",
              borderRadius: "10px",
              fontSize: "12px",
              opacity: bidInputProgress,
            }}
          >
            Minimum bid: {formatPrice(currentBid + 5000)} • Bid increments: $2,500
          </div>

          {/* Timer */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "rgba(200,16,46,0.1)",
              border: `1px solid ${BrandColors.crimsonRed}`,
              borderRadius: "10px",
              opacity: bidInputProgress,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: BrandColors.crimsonRed,
                  animation: "pulse 1s infinite",
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 700, color: BrandColors.crimsonRed }}>
                TIME REMAINING
              </span>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 900, fontVariantNumeric: "tabular-nums", color: BrandColors.white }}>
              {Math.max(0, Math.floor(300 - time * 50))}s
            </div>
          </div>

          {/* Place Bid Button */}
          <button
            style={{
              marginTop: "20px",
              width: "100%",
              border: 0,
              borderRadius: "10px",
              padding: "16px",
              background: BrandColors.red,
              color: "white",
              fontWeight: 800,
              fontSize: "16px",
              cursor: "pointer",
              opacity: bidInputProgress,
              transform: `scale(${interpolate(bidInputProgress, [0, 1], [0.95, 1], { easing: Easing.backOut })})`,
            }}
          >
            PLACE BID
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationProgress > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${interpolate(confirmationProgress, [0, 1], [0.7, 1], { easing: Easing.backOut })})`,
            width: "480px",
            background: "#15151d",
            border: `1px solid ${BrandColors.green}`,
            borderRadius: "18px",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 20px 70px rgba(0,0,0,0.8), 0 0 60px rgba(53, 201, 138, 0.3)",
            zIndex: 30,
            opacity: confirmationProgress,
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${BrandColors.green}, #2ab87a)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "36px",
              animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            ✓
          </div>
          <h3 style={{ margin: "0 0 12px", fontSize: "24px", fontWeight: 800 }}>Bid Placed Successfully!</h3>
          <p style={{ color: BrandColors.muted, marginBottom: "20px" }}>
            Your bid of <strong style={{ color: BrandColors.white }}>{formatPrice(currentBid + 25000)}</strong> has been recorded.
          </p>
          <div
            style={{
              background: "rgba(53, 201, 138, 0.15)",
              border: `1px solid ${BrandColors.green}`,
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontSize: "12px", color: BrandColors.green, marginBottom: "4px" }}>BID CONFIRMATION</div>
            <div style={{ fontSize: "13px", color: BrandColors.white, fontFamily: "monospace" }}>
              #{Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}
            </div>
          </div>
          <p style={{ fontSize: "11px", color: BrandColors.muted }}>
            Demo bid - not legally binding. View in <span style={{ color: BrandColors.crimsonRed }}>My Bids</span>
          </p>
          <style>{`
            @keyframes scaleIn {
              from { transform: scale(0); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}</style>
        </div>
      )}

      {/* Bid History Sidebar */}
      {bidHistoryProgress > 0 && (
        <div
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: `translateY(-50%) translateX(${interpolate(bidHistoryProgress, [0, 1], [100, 0], { easing: Easing.easeOut })}px)`,
            width: "300px",
            maxHeight: "500px",
            background: "rgba(19, 19, 25, 0.95)",
            border: `1px solid ${BrandColors.line}`,
            borderRadius: "16px",
            padding: "20px",
            backdropFilter: "blur(16px)",
            zIndex: 15,
            opacity: bidHistoryProgress,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>BID HISTORY</h3>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "1px",
                color: BrandColors.green,
                background: "rgba(53, 201, 138, 0.15)",
                padding: "4px 8px",
                borderRadius: "20px",
              }}
            >
              LIVE
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { bidder: "J. Mueller*", amount: currentBid + 25000, time: "2m ago", winning: true },
              { bidder: "S. Chen*", amount: currentBid, time: "5m ago", winning: false },
              { bidder: "M. Rossi*", amount: currentBid - 25000, time: "12m ago", winning: false },
              { bidder: "A. Petrov*", amount: currentBid - 5000, time: "18m ago", winning: false },
            ].map((bid, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: bid.winning ? "rgba(200,16,46,0.1)" : "transparent",
                  border: bid.winning ? `1px solid ${BrandColors.crimsonRed}` : `1px solid ${BrandColors.line}`,
                  borderRadius: "10px",
                  transition: "all 0.2s",
                  animation: `slideIn 0.3s ease-out ${i * 0.1}s both`,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: BrandColors.white }}>{bid.bidder}</span>
                  <span style={{ fontSize: "10px", color: BrandColors.muted }}>{bid.time}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: bid.winning ? BrandColors.crimsonRed : BrandColors.white }}>
                    {formatPrice(bid.amount)}
                  </div>
                  {bid.winning && (
                    <span style={{ fontSize: "9px", fontWeight: 800, color: BrandColors.crimsonRed }}>LEADING</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: translateX(20px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

const RedAccentLines: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 5 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${20 + i * 250}px`,
            left: `-100px`,
            width: `calc(100% + 200px)`,
            height: "1px",
            background: `linear-gradient(90deg,
              transparent,
              rgba(200,16,46,${0.3 * Math.sin(time * 2 + i)}),
              transparent
            )`,
            opacity: progress * 0.5,
            animation: `slideLine 3s linear infinite ${i * 0.5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes slideLine {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

const FloatingBidNumbers: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress < 0.3) return null;

  const numbers = [
    { value: "+$2,500", x: 400, y: 300 },
    { value: "+$5,000", x: 1000, y: 400 },
    { value: "+$7,500", x: 600, y: 500 },
    { value: "+$10,000", x: 1200, y: 350 },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 8 }}>
      {numbers.map((num, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${num.x + Math.sin(time * 1.5 + i) * 20}px`,
            top: `${num.y + Math.cos(time * 1.2 + i) * 15}px`,
            fontSize: "18px",
            fontWeight: 900,
            color: BrandColors.crimsonRed,
            textShadow: `0 0 20px ${BrandColors.crimsonRed}`,
            opacity: progress * (0.5 + 0.5 * Math.sin(time * 3 + i)),
            pointerEvents: "none",
            animation: `floatUp 2s ease-out infinite ${i * 0.3}s`,
          }}
        >
          {num.value}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

const TextOverlays: React.FC<{
  progress: number;
  taglineProgress: number;
  bidAnimationProgress: number;
  confirmationProgress: number;
}> = ({ progress, taglineProgress, bidAnimationProgress, confirmationProgress }) => {
  const titleProgress = interpolate(progress, [0, 0.25], [0, 1], { easing: Easing.easeOut });

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
          SECURE BIDDING
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-1.5px", color: BrandColors.white, margin: 0 }}>
          Every Bid Moves<br/>You Closer.
        </h1>
      </div>

      {/* Live bid indicator */}
      {bidAnimationProgress > 0.3 && (
        <div
          style={{
            marginTop: "30px",
            opacity: bidAnimationProgress,
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 32px",
            background: `linear-gradient(135deg, rgba(200,16,46,0.2), rgba(143,0,29,0.2))`,
            border: `1px solid ${BrandColors.crimsonRed}`,
            borderRadius: "50px",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: BrandColors.crimsonRed,
              boxShadow: `0 0 10px ${BrandColors.crimsonRed}`,
              animation: "pulse 1s infinite",
            }}
          />
          <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: BrandColors.white }}>
            LIVE BIDDING ACTIVE
          </span>
        </div>
      )}

      {/* Confirmation tagline */}
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
            background: `linear-gradient(135deg, rgba(53,201,138,0.2), rgba(42,184,122,0.2))`,
            border: `1px solid ${BrandColors.green}`,
            borderRadius: "50px",
            backdropFilter: "blur(16px)",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "2px", color: BrandColors.white }}>
            EVERY BID MOVES YOU CLOSER
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