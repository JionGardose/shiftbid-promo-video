import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BrandColors,
  BrandTypography,
  Easing,
  formatPrice,
} from "../brand";
import { Smartphone } from "../components/Smartphone";
import { MobileAppMockup } from "../components/MobileAppMockup";

interface Scene6LogisticsTrackingProps {
  progress: number; // 0-1 over 13 seconds (55-68s)
}

export const Scene6LogisticsTracking: React.FC<Scene6LogisticsTrackingProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Scene animations
  const mapProgress = interpolate(progress, [0, 0.2], [0, 1], { easing: Easing.easeOut });
  const timelineProgress = interpolate(progress, [0.15, 0.4], [0, 1], { easing: Easing.easeOut });
  const routeProgress = interpolate(progress, [0.3, 0.65], [0, 1], { easing: Easing.cinematic });
  const statusProgress = interpolate(progress, [0.55, 0.8], [0, 1], { easing: Easing.easeOut });
  const deliveryProgress = interpolate(progress, [0.75, 1], [0, 1], { easing: Easing.elasticOut });

  // Animated route
  const routeCompletion = routeProgress;

  // Phone floating
  const floatY = Math.sin(time * 1.2) * 6;
  const floatX = Math.cos(time * 0.8) * 4;

  // Map animation - vehicle moving along route
  const vehiclePosition = routeCompletion;
  const pulsePhase = (time * 3) % (Math.PI * 2);

  return (
    <AbsoluteFill style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark background with subtle map texture */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(200, 16, 46, 0.08) 0%, transparent 60%),
            ${BrandColors.nearBlack}
          `,
        }}
      />

      {/* Subtle grid/map lines */}
      <MapGrid time={time} />

      {/* Main composition - split view: map on left, phone on right */}
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
          gap: "80px",
          pointerEvents: "none",
        }}
      >
        {/* Animated Map */}
        <div
          style={{
            flex: 1,
            maxWidth: "800px",
            aspectRatio: "16/10",
            opacity: mapProgress,
            transform: `translateX(${interpolate(mapProgress, [0, 1], [-100, 0], { easing: Easing.easeOut })}px)`,
          }}
        >
          <LogisticsMap
            routeProgress={routeCompletion}
            vehiclePosition={vehiclePosition}
            time={time}
            pulsePhase={pulsePhase}
          />
        </div>

        {/* Smartphone with tracking screen */}
        <div
          style={{
            flex: 0,
            opacity: timelineProgress,
            transform: `translateX(${interpolate(timelineProgress, [0, 1], [100, 0], { easing: Easing.easeOut })}px)`,
          }}
        >
          <Smartphone
            progress={1}
            yOffset={0}
            rotateX={0}
            rotateY={-5}
            rotateZ={0}
            scale={1.1}
            screenContent={
              <MobileAppMockup
                loadProgress={1}
                screen="detail"
                screenProgress={{
                  detail: 1,
                  tabs: 1,
                }}
                time={time}
              />
            }
          />
        </div>
      </div>

      {/* Timeline overlay */}
      <TimelineOverlay
        progress={timelineProgress}
        routeProgress={routeProgress}
        statusProgress={statusProgress}
        deliveryProgress={deliveryProgress}
        time={time}
      />

      {/* Status cards floating */}
      <StatusCards progress={statusProgress} time={time} />

      {/* Delivery confirmation */}
      <DeliveryConfirmation progress={deliveryProgress} time={time} />

      {/* Text overlays */}
      <TextOverlays
        progress={progress}
        routeProgress={routeProgress}
        deliveryProgress={deliveryProgress}
      />
    </AbsoluteFill>
  );
};

const MapGrid: React.FC<{ time: number }> = ({ time }) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.15,
        backgroundImage: `
          linear-gradient(rgba(167, 167, 174, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167, 167, 174, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        transform: `translate(${Math.sin(time * 0.05) * 20}px, ${Math.cos(time * 0.05) * 20}px)`,
      }}
    />
  );
};

const LogisticsMap: React.FC<{
  routeProgress: number;
  vehiclePosition: number;
  time: number;
  pulsePhase: number;
}> = ({ routeProgress, vehiclePosition, time, pulsePhase }) => {
  // Route points (Stuttgart -> Munich -> Vienna -> Budapest)
  const routePoints = [
    { x: 100, y: 300, label: "Stuttgart", country: "DE" },
    { x: 300, y: 220, label: "Munich", country: "DE" },
    { x: 500, y: 180, label: "Vienna", country: "AT" },
    { x: 700, y: 250, label: "Budapest", country: "HU" },
  ];

  const containerWidth = 800;
  const containerHeight = 500;

  // Calculate vehicle position along path
  const totalSegments = routePoints.length - 1;
  const segmentProgress = vehiclePosition * totalSegments;
  const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const segmentT = segmentProgress - currentSegment;

  const startPoint = routePoints[currentSegment];
  const endPoint = routePoints[currentSegment + 1];

  const vehicleX = startPoint.x + (endPoint.x - startPoint.x) * segmentT;
  const vehicleY = startPoint.y + (endPoint.y - startPoint.y) * segmentT;

  // Draw path up to current progress
  const pathLength = totalSegments;
  const drawnSegments = routeProgress * pathLength;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0d 0%, #0d0d12 100%)",
        borderRadius: "20px",
        border: `1px solid ${BrandColors.line}`,
        overflow: "hidden",
        position: "relative",
        boxShadow: `
          inset 0 0 60px rgba(0,0,0,0.5),
          0 0 80px rgba(200,16,46,0.1)
        `,
      }}
    >
      {/* Map background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(200,16,46,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(53,201,138,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Route path - drawn progressively */}
      <svg
        width={containerWidth}
        height={containerHeight}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Route line segments */}
        {routePoints.slice(0, -1).map((point, i) => {
          const nextPoint = routePoints[i + 1];
          const segmentDrawn = Math.max(0, Math.min(1, drawnSegments - i));

          return (
            <g key={i} style={{ opacity: segmentDrawn }}>
              <path
                d={`M${point.x},${point.y} Q${(point.x + nextPoint.x) / 2},${(point.y + nextPoint.y) / 2 - 30} ${nextPoint.x},${nextPoint.y}`}
                stroke={BrandColors.crimsonRed}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={segmentDrawn * 1000}
                strokeDashoffset={0}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(200,16,46,0.6))",
                  transition: "stroke-dashoffset 0.5s ease-out",
                }}
              />
              {/* Pulse on completed segments */}
              {segmentDrawn === 1 && (
                <path
                  d={`M${point.x},${point.y} Q${(point.x + nextPoint.x) / 2},${(point.y + nextPoint.y) / 2 - 30} ${nextPoint.x},${nextPoint.y}`}
                  stroke={BrandColors.green}
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.5 + 0.5 * Math.sin(time * 4 + i)}
                  style={{ animation: "pulseLine 2s ease-in-out infinite" }}
                />
              )}
            </g>
          );
        })}

        {/* Location markers */}
        {routePoints.map((point, i) => {
          const isPassed = i / totalSegments < routeProgress;
          const isCurrent = i === currentSegment && routeProgress < 1;
          const isDestination = i === routePoints.length - 1;

          return (
            <g key={i} style={{ transform: `translate(${point.x}px, ${point.y}px)` }}>
              {/* Pulse ring for current/upcoming */}
              {(isCurrent || (isDestination && routeProgress >= 1)) && (
                <circle
                  r={12 + 8 * Math.sin(time * 3)}
                  fill="none"
                  stroke={isDestination ? BrandColors.green : BrandColors.crimsonRed}
                  strokeWidth={2}
                  opacity={0.4 + 0.3 * Math.sin(time * 3)}
                  style={{ animation: "expandRing 2s ease-out infinite" }}
                />
              )}

              {/* Location pin */}
              <circle
                r={isCurrent ? 14 : isPassed ? 10 : 8}
                fill={isPassed ? BrandColors.green : isCurrent ? BrandColors.crimsonRed : BrandColors.line}
                stroke={BrandColors.nearBlack}
                strokeWidth={3}
                style={{
                  filter: isCurrent ? "drop-shadow(0 0 12px rgba(200,16,46,0.8))" : "none",
                  transition: "all 0.3s ease",
                }}
              />
              {isPassed && (
                <circle r={6} fill={BrandColors.nearBlack} />
              )}
              {isCurrent && (
                <circle r={5} fill={BrandColors.white} />
              )}

              {/* Label */}
              <text
                x={0}
                y={-20}
                textAnchor="middle"
                fontSize="10"
                fontWeight={isCurrent || isPassed ? "700" : "500"}
                fill={isPassed ? BrandColors.green : isCurrent ? BrandColors.crimsonRed : BrandColors.muted}
                style={{ fontFamily: BrandTypography.fontFamily }}
              >
                {point.label}
              </text>
              <text
                x={0}
                y={-8}
                textAnchor="middle"
                fontSize="8"
                fill={BrandColors.muted}
                style={{ fontFamily: BrandTypography.fontFamily }}
              >
                {point.country}
              </text>
            </g>
          );
        })}

        {/* Vehicle icon moving along path */}
        {routeProgress > 0 && (
          <g
            style={{
              transform: `translate(${vehicleX}px, ${vehicleY}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            {/* Trail effect */}
            <ellipse
              cx={0}
              cy={0}
              rx={20 + Math.sin(time * 10) * 5}
              ry={8}
              fill={BrandColors.crimsonRed}
              opacity={0.15}
              style={{ filter: "blur(8px)" }}
            />
            {/* Vehicle */}
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="28"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
              }}
            >
              🏁
            </text>
            {/* Direction indicator */}
            <polygon
              points="0,-25 8,-15 -8,-15"
              fill={BrandColors.crimsonRed}
              opacity={0.8}
              style={{
                animation: "bounce 0.5s ease-in-out infinite",
                transformOrigin: "center center",
              }}
            />
          </g>
        )}

        <style>{`
          @keyframes expandRing {
            0% { r: 12; opacity: 0.5; }
            100% { r: 30; opacity: 0; }
          }
          @keyframes pulseLine {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}</style>
      </svg>

      {/* Map legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "3px",
              background: `linear-gradient(90deg, ${BrandColors.crimsonRed}, ${BrandColors.green})`,
              borderRadius: "2px",
            }}
          />
          <span style={{ fontSize: "11px", color: BrandColors.muted }}>Route</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: BrandColors.green,
              boxShadow: `0 0 8px ${BrandColors.green}`,
            }}
          />
          <span style={{ fontSize: "11px", color: BrandColors.green }}>Completed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: BrandColors.crimsonRed,
              boxShadow: `0 0 8px ${BrandColors.crimsonRed}`,
            }}
          />
          <span style={{ fontSize: "11px", color: BrandColors.crimsonRed }}>In Transit</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: BrandColors.line,
            }}
          />
          <span style={{ fontSize: "11px", color: BrandColors.muted }}>Pending</span>
        </div>
      </div>
    </div>
  );
};

const TimelineOverlay: React.FC<{
  progress: number;
  routeProgress: number;
  statusProgress: number;
  deliveryProgress: number;
  time: number;
}> = ({ progress, routeProgress, statusProgress, deliveryProgress, time }) => {
  const events = [
    { id: 1, label: "Payment Confirmed", time: "2 min ago", status: "completed", icon: "💳", color: BrandColors.green },
    { id: 2, label: "Shipment Prepared", time: "1 hr ago", status: "completed", icon: "📦", color: BrandColors.green },
    { id: 3, label: "Pickup Scheduled", time: "3 hrs ago", status: "completed", icon: "🚛", color: BrandColors.green },
    { id: 4, label: "In Transit", time: "Now", status: "current", icon: "📍", color: BrandColors.crimsonRed },
    { id: 5, label: "Delivery Scheduled", time: "Tomorrow 2PM", status: "pending", icon: "📅", color: BrandColors.muted },
    { id: 6, label: "Delivered", time: "Pending", status: "pending", icon: "✅", color: BrandColors.muted },
  ];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "100px",
        paddingLeft: "100px",
      }}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateX(${interpolate(progress, [0, 1], [-50, 0], { easing: Easing.easeOut })}px)`,
          maxWidth: "380px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: BrandColors.crimsonRed,
            marginBottom: "16px",
          }}
        >
          SHIPMENT TIMELINE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {events.map((event, i) => {
            const eventProgress = Math.max(0, Math.min(1, (statusProgress - i * 0.12) / 0.8));
            const isCompleted = event.status === "completed";
            const isCurrent = event.status === "current";
            const isPending = event.status === "pending";

            return (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  minHeight: "68px",
                  padding: "8px 0",
                  opacity: eventProgress,
                  transform: `translateY(${interpolate(eventProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
                }}
              >
                {/* Timeline line */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "23px",
                      height: "23px",
                      borderRadius: "50%",
                      background: isCompleted ? "#183d30" : isCurrent ? "#35101a" : "#222",
                      border: `2px solid ${isCompleted ? BrandColors.green : isCurrent ? BrandColors.crimsonRed : "#555"}`,
                      display: "grid",
                      placeItems: "center",
                      fontSize: "11px",
                      flexShrink: 0,
                      zIndex: 2,
                      boxShadow: isCurrent ? `0 0 15px ${BrandColors.crimsonRed}` : "none",
                      animation: isCurrent ? "pulseDot 1.5s ease-in-out infinite" : "none",
                    }}
                  >
                    {isCompleted ? "✓" : isCurrent ? "🏁" : ""}
                  </div>
                  {i < events.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "23px",
                        left: "10px",
                        width: "2px",
                        height: "43px",
                        background: isCompleted ? "#426f5b" : "#555",
                      }}
                    />
                  )}
                </div>

                {/* Event content */}
                <div style={{ flex: 1, paddingTop: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>{event.icon}</span>
                    <b style={{ fontSize: "13px", color: isPending ? BrandColors.muted : BrandColors.white }}>
                      {event.label}
                    </b>
                    {isCurrent && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 800,
                          letterSpacing: "1px",
                          color: BrandColors.crimsonRed,
                          background: "rgba(200,16,46,0.2)",
                          padding: "2px 6px",
                          borderRadius: "20px",
                        }}
                      >
                        LIVE
                      </span>
                    )}
                  </div>
                  <p style={{ margin: "4px 0 0", color: BrandColors.muted, fontSize: "11px" }}>
                    {event.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          @keyframes pulseDot {
            0%, 100% { box-shadow: 0 0 10px currentColor; transform: scale(1); }
            50% { box-shadow: 0 0 20px currentColor; transform: scale(1.1); }
          }
        `}</style>
      </div>
    </AbsoluteFill>
  );
};

const StatusCards: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const cards = [
    { label: "PAYMENT", value: "CONFIRMED", icon: "💳", color: BrandColors.green, delay: 0 },
    { label: "PICKUP", value: "SCHEDULED", icon: "🚛", color: BrandColors.crimsonRed, delay: 0.1 },
    { label: "TRANSIT", value: "IN PROGRESS", icon: "📍", color: BrandColors.crimsonRed, delay: 0.2 },
    { label: "ETA", value: "TOMORROW 14:00", icon: "📅", color: "#F5A623", delay: 0.3 },
  ];

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 25,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: progress,
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: `rgba(19, 19, 25, 0.95)`,
              border: `1px solid ${card.color}`,
              borderRadius: "12px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              backdropFilter: "blur(16px)",
              minWidth: "140px",
              animation: `slideUp 0.4s ease-out ${card.delay + i * 0.08}s both`,
              boxShadow: `0 0 30px ${card.color}30`,
            }}
          >
            <span style={{ fontSize: "22px" }}>{card.icon}</span>
            <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", color: card.color }}>
              {card.label}
            </span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: BrandColors.white }}>
              {card.value}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </AbsoluteFill>
  );
};

const DeliveryConfirmation: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  if (progress < 0.5) return null;

  const revealProgress = interpolate(progress, [0.5, 1], [0, 1], { easing: Easing.elasticOut });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "200px",
      }}
    >
      <div
        style={{
          opacity: revealProgress,
          transform: `scale(${interpolate(revealProgress, [0, 1], [0.5, 1], { easing: Easing.backOut })})`,
        }}
      >
        <div
          style={{
            background: "rgba(21, 21, 29, 0.98)",
            border: `2px solid ${BrandColors.green}`,
            borderRadius: "20px",
            padding: "40px 60px",
            textAlign: "center",
            boxShadow: `
              0 0 80px rgba(53, 201, 138, 0.3),
              0 30px 100px rgba(0,0,0,0.6)
            `,
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${BrandColors.green}, #2ab87a)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "48px",
              animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            ✅
          </div>
          <h3 style={{ margin: "0 0 12px", fontSize: "28px", fontWeight: 900 }}>Vehicle Delivered</h3>
          <p style={{ color: BrandColors.muted, marginBottom: "24px", fontSize: "16px" }}>
            2024 Porsche 911 GT3 RS has arrived at destination.
          </p>
          <div
            style={{
              background: "rgba(53, 201, 138, 0.15)",
              border: `1px solid ${BrandColors.green}`,
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontSize: "11px", color: BrandColors.green, marginBottom: "8px", letterSpacing: "1px" }}>
              DELIVERY CONFIRMATION
            </div>
            <div style={{ fontSize: "14px", color: BrandColors.white, fontFamily: "monospace" }}>
              #{Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}
            </div>
          </div>
          <p style={{ fontSize: "12px", color: BrandColors.muted }}>
            Physical delivery fulfilled by external logistics partners
          </p>
          <style>{`
            @keyframes scaleIn {
              from { transform: scale(0); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TextOverlays: React.FC<{
  progress: number;
  routeProgress: number;
  deliveryProgress: number;
}> = ({ progress, routeProgress, deliveryProgress }) => {
  const titleProgress = interpolate(progress, [0, 0.25], [0, 1], { easing: Easing.easeOut });
  const taglineProgress = interpolate(progress, [0.85, 1], [0, 1], { easing: Easing.easeOut });

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
          LOGISTICS & TRACKING
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-1.5px", color: BrandColors.white, margin: 0 }}>
          From the First Bid<br/>to the Final Delivery.
        </h1>
      </div>

      {/* Live tracking badge */}
      {routeProgress > 0.3 && (
        <div
          style={{
            marginTop: "30px",
            opacity: routeProgress,
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
            LIVE SHIPMENT TRACKING
          </span>
        </div>
      )}

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
            FROM THE FIRST BID TO THE FINAL DELIVERY
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