import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import {
  BrandColors,
  BrandTypography,
  BrandBorderRadius,
  Easing,
  sampleVehicles,
  categories,
  formatPrice,
} from "../brand";

interface WebsiteMockupProps {
  loadProgress: number; // 0-1
  heroProgress: number; // 0-1
  statsProgress: number; // 0-1
  marketplaceProgress: number; // 0-1
}

export const WebsiteMockup: React.FC<WebsiteMockupProps> = ({
  loadProgress,
  heroProgress,
  statsProgress,
  marketplaceProgress,
}) => {
  if (loadProgress === 0) return null;

  // Loading bar animation
  const loadingBarProgress = interpolate(loadProgress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const contentOpacity = interpolate(loadProgress, [0.25, 0.5], [0, 1], { easing: Easing.easeOut });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BrandColors.bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Loading bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: BrandColors.line,
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${loadingBarProgress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${BrandColors.crimsonRed}, ${BrandColors.red})`,
            boxShadow: `0 0 10px ${BrandColors.crimsonRed}`,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          opacity: contentOpacity,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navigation Bar */}
        <Navbar progress={heroProgress} />

        {/* Hero Section */}
        <HeroSection progress={heroProgress} />

        {/* Stats Section */}
        <StatsSection progress={statsProgress} />

        {/* Marketplace Section */}
        <MarketplaceSection progress={marketplaceProgress} />
      </div>

      {/* Cursor overlay for interactions */}
      <CursorOverlay sceneProgress={marketplaceProgress} />
    </div>
  );
};

const Navbar: React.FC<{ progress: number }> = ({ progress }) => {
  const navProgress = interpolate(progress, [0, 0.5], [0, 1], { easing: Easing.easeOut });

  return (
    <div
      style={{
        position: "relative",
        height: "88px",
        background: `rgba(9, 9, 13, 0.95)`,
        borderBottom: `1px solid ${BrandColors.line}`,
        backdropFilter: "blur(16px)",
        zIndex: 10,
        transform: `translateY(${interpolate(navProgress, [0, 1], [-100, 0], { easing: Easing.easeOut })}px)`,
        opacity: navProgress,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "205px",
            flexShrink: 0,
          }}
        >
          <LogoMark size={58} />
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "#bbb" }}>
              GROUP 2ONIA
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            gap: "22px",
            marginLeft: "auto",
          }}
        >
          {["Marketplace", "How it Works", "Shipments", "About"].map((link, i) => (
            <a
              key={i}
              href="#"
              style={{
                color: "#c9c9d1",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button
          style={{
            border: 0,
            borderRadius: "10px",
            padding: "11px 17px",
            background: BrandColors.red,
            color: "white",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Place a Bid
        </button>
      </div>
    </div>
  );
};

const LogoMark: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#E8E8ED" />
        <stop offset="50%" stopColor="#C8102E" />
        <stop offset="70%" stopColor="#8F001D" />
        <stop offset="100%" stopColor="#1A1A1F" />
      </linearGradient>
      <linearGradient id="logoRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF445A" />
        <stop offset="50%" stopColor="#C8102E" />
        <stop offset="100%" stopColor="#8F001D" />
      </linearGradient>
    </defs>

    <circle cx="100" cy="100" r="92" fill="none" stroke="url(#logoMetallic)" strokeWidth="4" />
    <circle cx="100" cy="100" r="78" fill="none" stroke={BrandColors.crimsonRed} strokeWidth="2" opacity="0.6" strokeDasharray="20 10" />

    <g transform="translate(100, 100)">
      <g stroke="url(#logoRed)" strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M-35 0 Q-20 -20 0 -15 Q20 -10 35 0" opacity="0.8" />
        <path d="M-35 0 Q-20 0 0 0 Q20 0 35 0" strokeWidth="8" />
        <path d="M-35 0 Q-20 20 0 15 Q20 10 35 0" opacity="0.8" />
      </g>
      <rect x="-4" y="-40" width="8" height="80" rx="4" fill="url(#logoMetallic)" />
    </g>
  </svg>
);

const HeroSection: React.FC<{ progress: number }> = ({ progress }) => {
  const copyProgress = interpolate(progress, [0, 0.6], [0, 1], { easing: Easing.easeOut });
  const artProgress = interpolate(progress, [0.3, 0.8], [0, 1], { easing: Easing.easeOut });
  const buttonProgress = interpolate(progress, [0.6, 1], [0, 1], { easing: Easing.easeOut });

  return (
    <section
      style={{
        position: "relative",
        minHeight: "380px",
        margin: "28px 24px",
        border: `1px solid #411522`,
        borderRadius: "24px",
        overflow: "hidden",
        background: BrandColors.heroGradient,
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        transform: `translateY(${interpolate(copyProgress, [0, 1], [50, 0], { easing: Easing.easeOut })}px)`,
        opacity: copyProgress,
      }}
    >
      {/* Hero Copy */}
      <div style={{ padding: "58px 48px", zIndex: 1 }}>
        <div
          style={{
            color: "#ff536b",
            textTransform: "uppercase",
            fontSize: "11px",
            fontWeight: 850,
            letterSpacing: "2.5px",
            marginBottom: "15px",
          }}
        >
          VEHICLE MARKETPLACE
        </div>
        <h1
          style={{
            fontSize: "clamp(38px, 5vw, 65px)",
            lineHeight: 1.02,
            letterSpacing: "-2.8px",
            margin: "15px 0",
            fontWeight: 900,
          }}
        >
          Discover Your <em style={{ color: BrandColors.red, fontStyle: "normal" }}>Next Vehicle</em>
        </h1>
        <p
          style={{
            maxWidth: "520px",
            color: "#c6c4cc",
            fontSize: "17px",
            lineHeight: 1.6,
            marginBottom: "25px",
          }}
        >
          The premier digital marketplace for verified buyers and sellers.
          Transparent bidding, secure transactions, and seamless shipment tracking.
        </p>

        {/* Hero Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            opacity: buttonProgress,
            transform: `translateY(${interpolate(buttonProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          }}
        >
          <button
            style={{
              border: 0,
              borderRadius: "10px",
              padding: "11px 17px",
              background: BrandColors.red,
              color: "white",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Explore Vehicles
          </button>
          <button
            style={{
              borderRadius: "10px",
              padding: "11px 17px",
              background: "transparent",
              border: "1px solid #5b5b67",
              color: "white",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            How It Works
          </button>
        </div>
      </div>

      {/* Hero Art / Vehicle Display */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: BrandColors.heroArtGradient,
          opacity: artProgress,
          transform: `scale(${interpolate(artProgress, [0, 1], [0.8, 1], { easing: Easing.easeOut })})`,
        }}
      >
        {/* Featured vehicle display */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Main vehicle - Porsche 911 GT3 RS */}
          <div
            style={{
              width: "320px",
              height: "180px",
              background: "linear-gradient(145deg, #292932, #101015)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: "120px", filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}>🏁</span>
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
              FEATURED
            </div>
          </div>

          {/* Vehicle info */}
          <div style={{ marginTop: "20px", textAlign: "center", color: "#ffffffb0" }}>
            <div style={{ fontSize: "11px", letterSpacing: "4px" }}>SHIFT FAST  •  BID SMART</div>
          </div>

          {/* Floating spec cards */}
          <FloatingSpecCards progress={artProgress} />
        </div>
      </div>
    </section>
  );
};

const FloatingSpecCards: React.FC<{ progress: number }> = ({ progress }) => {
  const specs = [
    { label: "VERIFIED LISTINGS", value: "247", icon: "✓", color: BrandColors.green },
    { label: "ACTIVE BIDS", value: "1,834", icon: "🔨", color: BrandColors.crimsonRed },
    { label: "COMPLETED", value: "892", icon: "✓", color: BrandColors.metallicGray },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "16px",
        opacity: progress,
      }}
    >
      {specs.map((spec, i) => (
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
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            animation: `float 3s ease-in-out infinite ${i * 0.3}s`,
          }}
        >
          <span style={{ fontSize: "20px", color: spec.color }}>{spec.icon}</span>
          <span style={{ fontSize: "24px", fontWeight: 800, color: BrandColors.white }}>{spec.value}</span>
          <span style={{ fontSize: "9px", letterSpacing: "2px", color: BrandColors.muted }}>{spec.label}</span>
        </div>
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

const StatsSection: React.FC<{ progress: number }> = ({ progress }) => {
  const containerProgress = interpolate(progress, [0, 0.5], [0, 1], { easing: Easing.easeOut });
  const itemProgress = (index: number) =>
    interpolate(progress, [0.3 + index * 0.1, 0.6 + index * 0.1], [0, 1], { easing: Easing.elasticOut });

  const stats = [
    { label: "Verified-first", value: "Buyer and seller account checks", icon: "✓" },
    { label: "Open bidding", value: "Clear offers and bid history", icon: "🔨" },
    { label: "End-to-end", value: "Transaction and shipment updates", icon: "🚚" },
  ];

  return (
    <div
      style={{
        padding: "0 24px",
        opacity: containerProgress,
        transform: `translateY(${interpolate(containerProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: BrandColors.panel,
              border: `1px solid ${BrandColors.line}`,
              borderRadius: "16px",
              padding: "17px",
              opacity: itemProgress(i),
              transform: `translateY(${interpolate(itemProgress(i), [0, 1], [40, 0], { easing: Easing.easeOut })}px) scale(${interpolate(itemProgress(i), [0, 1], [0.8, 1], { easing: Easing.backOut })})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "24px", color: BrandColors.crimsonRed }}>{stat.icon}</span>
              <b style={{ fontSize: "24px", color: BrandColors.white }}>{stat.label}</b>
            </div>
            <span style={{ color: BrandColors.muted, fontSize: "12px" }}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketplaceSection: React.FC<{ progress: number }> = ({ progress }) => {
  const headerProgress = interpolate(progress, [0, 0.4], [0, 1], { easing: Easing.easeOut });
  const filtersProgress = interpolate(progress, [0.3, 0.6], [0, 1], { easing: Easing.easeOut });
  const gridProgress = interpolate(progress, [0.5, 0.8], [0, 1], { easing: Easing.easeOut });

  return (
    <div
      style={{
        padding: "0 24px 28px",
        opacity: gridProgress > 0 ? 1 : 0,
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "12px",
          margin: "34px 0 16px",
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "25px", fontWeight: 900 }}>Featured Vehicles</h2>
          <p style={{ margin: "4px 0 0", color: BrandColors.muted }}>
            {sampleVehicles.length} premium vehicles available
          </p>
        </div>
        <button
          style={{
            borderRadius: "10px",
            padding: "11px 17px",
            background: "transparent",
            border: "1px solid #5b5b67",
            color: "white",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          View All
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          margin: "15px 0",
          opacity: filtersProgress,
          transform: `translateY(${interpolate(filtersProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <input
          type="text"
          placeholder="Search make or model"
          style={{
            background: "#101016",
            border: `1px solid ${BrandColors.line}`,
            borderRadius: "10px",
            color: "white",
            padding: "11px 13px",
            minWidth: "250px",
            fontSize: "14px",
          }}
        />
        <select style={{ background: "#101016", border: `1px solid ${BrandColors.line}`, borderRadius: "10px", color: "white", padding: "11px 13px", minWidth: "150px" }}>
          <option>All Categories</option>
          {categories.map((c) => <option key={c.name}>{c.name} ({c.count})</option>)}
        </select>
        <select style={{ background: "#101016", border: `1px solid ${BrandColors.line}`, borderRadius: "10px", color: "white", padding: "11px 13px", minWidth: "150px" }}>
          <option>Price Range</option>
          <option>$50k - $100k</option>
          <option>$100k - $250k</option>
          <option>$250k - $500k</option>
          <option>$500k+</option>
        </select>
      </div>

      {/* Vehicle Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "17px",
          opacity: gridProgress,
          transform: `translateY(${interpolate(gridProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        {sampleVehicles.map((vehicle, i) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            progress={interpolate(gridProgress, [i * 0.08, 1], [0, 1], { easing: Easing.easeOut })}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

const VehicleCard: React.FC<{
  vehicle: typeof sampleVehicles[0];
  progress: number;
  index: number;
}> = ({ vehicle, progress, index }) => {
  const cardProgress = Math.max(0, Math.min(1, progress));

  return (
    <div
      style={{
        background: BrandColors.panel,
        border: `1px solid ${BrandColors.line}`,
        borderRadius: "16px",
        overflow: "hidden",
        opacity: cardProgress,
        transform: `translateY(${interpolate(cardProgress, [0, 1], [40, 0], { easing: Easing.easeOut })}px) scale(${interpolate(cardProgress, [0, 1], [0.9, 1], { easing: Easing.backOut })})`,
        transition: "all 0.3s ease",
      }}
    >
      {/* Vehicle Image Area */}
      <div
        style={{
          height: "165px",
          display: "grid",
          placeItems: "center",
          background: BrandColors.carArtGradient,
          position: "relative",
          fontSize: "74px",
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
      </div>

      {/* Vehicle Info */}
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0 0 3px", fontSize: "17px", fontWeight: 800 }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <div className="muted" style={{ color: BrandColors.muted, fontSize: "12px", marginBottom: "10px" }}>
          {vehicle.mileage.toLocaleString()} mi • {vehicle.location}
        </div>
        <div style={{ fontSize: "20px", fontWeight: 850, margin: "10px 0", color: BrandColors.white }}>
          {formatPrice(vehicle.price)}
        </div>

        {/* Specs chips */}
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", margin: "10px 0" }}>
          {vehicle.specs.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              style={{
                border: `1px solid ${BrandColors.line}`,
                borderRadius: "30px",
                padding: "5px 9px",
                color: "#c9c9d1",
                fontSize: "11px",
              }}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Seller info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            paddingTop: "10px",
            borderTop: `1px solid ${BrandColors.line}`,
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: vehicle.verified ? "linear-gradient(135deg, #35c98a, #2ab87a)" : BrandColors.panel2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              {vehicle.verified ? "✓" : vehicle.make[0]}
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: BrandColors.white }}>
                {vehicle.seller}
              </div>
              {vehicle.verified && (
                <span style={{ fontSize: "9px", color: BrandColors.green, fontWeight: 700 }}>VERIFIED</span>
              )}
            </div>
          </div>
          <span style={{ fontSize: "11px", color: BrandColors.crimsonRed, fontWeight: 800 }}>
            Current: {formatPrice(vehicle.currentBid)}
          </span>
        </div>

        {/* Bid Button */}
        <button
          style={{
            width: "100%",
            marginTop: "12px",
            border: 0,
            borderRadius: "10px",
            padding: "11px 17px",
            background: BrandColors.red,
            color: "white",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Place Bid
        </button>
      </div>
    </div>
  );
};

// Cursor overlay for demonstrating interactions
const CursorOverlay: React.FC<{ sceneProgress: number }> = ({ sceneProgress }) => {
  // Show cursor during marketplace section
  if (sceneProgress < 0.3) return null;

  const cursorProgress = interpolate(sceneProgress, [0.3, 0.5], [0, 1], { easing: Easing.easeOut });
  const cursorX = interpolate(cursorProgress, [0, 0.3, 0.6, 1], [100, 400, 800, 1200], { easing: Easing.easeInOut });
  const cursorY = interpolate(cursorProgress, [0, 0.4, 0.8, 1], [300, 350, 450, 500], { easing: Easing.easeInOut });
  const cursorScale = 1 + Math.sin(cursorProgress * Math.PI * 4) * 0.1;

  return (
    <div
      style={{
        position: "absolute",
        left: `${cursorX}px`,
        top: `${cursorY}px`,
        pointerEvents: "none",
        zIndex: 50,
        opacity: cursorProgress,
        transform: `scale(${cursorScale})`,
        transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 5L19 19M19 5L5 19"
          stroke={BrandColors.crimsonRed}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 5L19 19M19 5L5 19"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <style>{`
        @keyframes cursorPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};