import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import {
  BrandColors,
  BrandTypography,
  Easing,
  sampleVehicles,
  categories,
  formatPrice,
} from "../brand";

interface MobileAppMockupProps {
  loadProgress: number; // 0-1
  screen: "home" | "explore" | "detail" | "bids" | "profile";
  screenProgress: Record<string, number>;
  time: number;
}

export const MobileAppMockup: React.FC<MobileAppMockupProps> = ({
  loadProgress,
  screen,
  screenProgress,
  time,
}) => {
  if (loadProgress === 0) return null;

  const contentOpacity = interpolate(loadProgress, [0.2, 0.5], [0, 1], { easing: Easing.easeOut });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BrandColors.appBg,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: "35px",
          padding: "9px 20px 0",
          display: "flex",
          justifyContent: "space-between",
          color: "#ddd",
          fontSize: "11px",
          background: BrandColors.appBg,
        }}
      >
        <span>9:41</span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "12px" }}>📶</span>
          <span style={{ fontSize: "12px" }}>🔋</span>
        </div>
      </div>

      {/* Header */}
      <header
        style={{
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid #24242c`,
          background: BrandColors.appBg,
        }}
      >
        <div className="logo" style={{ fontSize: "20px", fontWeight: 950, fontStyle: "italic", letterSpacing: "-1px" }}>
          ShiftBid <span style={{ color: BrandColors.appRed }}>6100</span>
          <small style={{ fontSize: "9px", letterSpacing: "3px", display: "block", textAlign: "right", marginTop: "-5px" }}>
            GROUP 2ONIA
          </small>
        </div>
        <div style={{ fontSize: "22px" }}>👤</div>
      </header>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "18px",
          overflowY: "auto",
          opacity: contentOpacity,
        }}
      >
        {screen === "home" && <HomeScreen progress={screenProgress.home || 0} time={time} />}
        {screen === "explore" && <ExploreScreen progress={screenProgress.explore || 0} time={time} />}
        {screen === "detail" && <DetailScreen progress={screenProgress.detail || 0} time={time} />}
        {screen === "bids" && <BidsScreen progress={screenProgress.bids || 0} time={time} />}
        {screen === "profile" && <ProfileScreen progress={screenProgress.profile || 0} time={time} />}
      </div>

      {/* Bottom Tabs */}
      <BottomTabs activeTab={screen} progress={screenProgress.tabs || 1} />
    </div>
  );
};

const HomeScreen: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const greetingProgress = interpolate(progress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const titleProgress = interpolate(progress, [0.2, 0.5], [0, 1], { easing: Easing.easeOut });
  const searchProgress = interpolate(progress, [0.4, 0.7], [0, 1], { easing: Easing.easeOut });
  const categoriesProgress = interpolate(progress, [0.6, 0.85], [0, 1], { easing: Easing.easeOut });
  const featuredProgress = interpolate(progress, [0.8, 1], [0, 1], { easing: Easing.easeOut });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Greeting */}
      <div
        style={{
          opacity: greetingProgress,
          transform: `translateY(${interpolate(greetingProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ color: "#ff526c", fontSize: "11px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>
          Welcome back
        </div>
        <h1 style={{ fontSize: "27px", lineHeight: 1.1, margin: "7px 0 16px", fontWeight: 900 }}>
          Find your next vehicle
        </h1>
      </div>

      {/* Search */}
      <div
        style={{
          opacity: searchProgress,
          transform: `translateY(${interpolate(searchProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <input
          type="text"
          placeholder="Search make or model"
          style={{
            width: "100%",
            padding: "13px",
            border: `1px solid ${BrandColors.appLine}`,
            borderRadius: "12px",
            background: "#15151c",
            color: "white",
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Categories */}
      <div
        style={{
          opacity: categoriesProgress,
          transform: `translateY(${interpolate(categoriesProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {categories.slice(0, 4).map((cat, i) => (
            <div
              key={i}
              style={{
                background: BrandColors.appPanel,
                border: `1px solid ${BrandColors.appLine}`,
                borderRadius: "12px",
                padding: "11px 4px",
                textAlign: "center",
                color: "#ddd",
                fontSize: "11px",
                animation: `popIn 0.3s ease-out ${i * 0.08}s both`,
              }}
            >
              <b style={{ display: "block", fontSize: "22px", marginBottom: "5px" }}>{cat.icon}</b>
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div
        style={{
          opacity: featuredProgress,
          transform: `translateY(${interpolate(featuredProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0 12px" }}>
          <h2 style={{ fontSize: "18px", margin: 0, fontWeight: 800 }}>Featured Listings</h2>
          <small style={{ color: "#ff6077" }}>View all</small>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sampleVehicles.slice(0, 3).map((vehicle, i) => (
            <MobileVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              progress={interpolate(featuredProgress, [i * 0.1, 1], [0, 1], { easing: Easing.easeOut })}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

const ExploreScreen: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const backProgress = interpolate(progress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const titleProgress = interpolate(progress, [0.2, 0.5], [0, 1], { easing: Easing.easeOut });
  const searchProgress = interpolate(progress, [0.4, 0.7], [0, 1], { easing: Easing.easeOut });
  const resultsProgress = interpolate(progress, [0.6, 1], [0, 1], { easing: Easing.easeOut });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <button
        style={{
          opacity: backProgress,
          background: "none",
          color: "#fff",
          border: "none",
          fontSize: "13px",
          padding: "0 0 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ‹ Back
      </button>

      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ color: "#ff526c", fontSize: "11px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>
          Marketplace
        </div>
        <h1 style={{ fontSize: "27px", lineHeight: 1.1, margin: "7px 0 16px", fontWeight: 900 }}>
          Explore vehicles
        </h1>
      </div>

      <div
        style={{
          opacity: searchProgress,
          transform: `translateY(${interpolate(searchProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <input
          type="text"
          placeholder="Search make or model"
          style={{
            width: "100%",
            padding: "13px",
            border: `1px solid ${BrandColors.appLine}`,
            borderRadius: "12px",
            background: "#15151c",
            color: "white",
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      <div
        style={{
          opacity: resultsProgress,
          transform: `translateY(${interpolate(resultsProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sampleVehicles.map((vehicle, i) => (
            <MobileVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              progress={interpolate(resultsProgress, [i * 0.08, 1], [0, 1], { easing: Easing.easeOut })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailScreen: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const vehicle = sampleVehicles[0];
  const backProgress = interpolate(progress, [0, 0.2], [0, 1], { easing: Easing.easeOut });
  const heroProgress = interpolate(progress, [0.1, 0.4], [0, 1], { easing: Easing.easeOut });
  const infoProgress = interpolate(progress, [0.3, 0.6], [0, 1], { easing: Easing.easeOut });
  const specsProgress = interpolate(progress, [0.5, 0.8], [0, 1], { easing: Easing.easeOut });
  const bidProgress = interpolate(progress, [0.7, 1], [0, 1], { easing: Easing.easeOut });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <button
        style={{
          opacity: backProgress,
          background: "none",
          color: "#fff",
          border: "none",
          fontSize: "13px",
          padding: "0 0 14px",
          cursor: "pointer",
        }}
      >
        ‹ Back to marketplace
      </button>

      {/* Detail Hero */}
      <div
        style={{
          opacity: heroProgress,
          transform: `translateY(${interpolate(heroProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          height: "180px",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #33333e, #111)",
          display: "grid",
          placeItems: "center",
          fontSize: "95px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))" }}>{vehicle.image}</span>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: BrandColors.appRed2,
            borderRadius: "7px",
            padding: "4px 8px",
            fontSize: "10px",
            fontWeight: 800,
          }}
        >
          {vehicle.category}
        </div>
      </div>

      {/* Vehicle Info */}
      <div
        style={{
          opacity: infoProgress,
          transform: `translateY(${interpolate(infoProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <div style={{ color: BrandColors.appMuted, fontSize: "12px", margin: "4px 0 12px" }}>
          {vehicle.mileage.toLocaleString()} mi • {vehicle.location}
        </div>
        <div style={{ fontWeight: 900, fontSize: "24px", margin: "8px 0", color: BrandColors.white }}>
          {formatPrice(vehicle.price)}
        </div>
      </div>

      {/* Specs Grid */}
      <div
        style={{
          opacity: specsProgress,
          transform: `translateY(${interpolate(specsProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "7px" }}>
          {vehicle.specs.map((spec, i) => (
            <div
              key={i}
              style={{
                background: "#20202a",
                borderRadius: "9px",
                padding: "9px",
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              <b style={{ display: "block", color: "#fff", fontSize: "12px" }}>{spec}</b>
              <span style={{ color: BrandColors.appMuted }}>SPEC</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bid Button */}
      <div
        style={{
          opacity: bidProgress,
          transform: `translateY(${interpolate(bidProgress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
          marginTop: "auto",
          paddingTop: "20px",
        }}
      >
        <button
          style={{
            width: "100%",
            border: 0,
            borderRadius: "10px",
            background: BrandColors.appRed,
            color: "white",
            fontWeight: 800,
            padding: "14px 15px",
            fontSize: "16px",
          }}
        >
          Place Bid
        </button>
      </div>
    </div>
  );
};

const BidsScreen: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const titleProgress = interpolate(progress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const contentProgress = interpolate(progress, [0.2, 0.6], [0, 1], { easing: Easing.easeOut });
  const noteProgress = interpolate(progress, [0.5, 0.8], [0, 1], { easing: Easing.easeOut });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ color: "#ff526c", fontSize: "11px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>
          Your activity
        </div>
        <h1 style={{ fontSize: "27px", lineHeight: 1.1, margin: "7px 0 16px", fontWeight: 900 }}>
          My bids
        </h1>
      </div>

      <div
        style={{
          opacity: contentProgress,
          transform: `translateY(${interpolate(contentProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div
          style={{
            background: BrandColors.appPanel,
            border: `1px solid ${BrandColors.appLine}`,
            borderRadius: "14px",
            padding: "15px",
            margin: "12px 0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
            <b>Active bids</b>
            <span
              style={{
                fontSize: "10px",
                border: `1px solid #305e4c`,
                color: "#6be2ae",
                padding: "4px 8px",
                borderRadius: "20px",
              }}
            >
              Demo
            </span>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                background: "rgba(200,16,46,0.1)",
                border: `1px solid ${BrandColors.crimsonRed}`,
                borderRadius: "10px",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700 }}>2024 Porsche 911 GT3 RS</div>
                <div style={{ fontSize: "11px", color: BrandColors.appMuted }}>Stuttgart, Germany</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "18px", fontWeight: 900, color: BrandColors.crimsonRed }}>
                  {formatPrice(310000)}
                </div>
                <div style={{ fontSize: "10px", fontWeight: 800, color: BrandColors.crimsonRed }}>LEADING</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: noteProgress,
          marginTop: "16px",
        }}
      >
        <div
          style={{
            background: "#27131a",
            border: `1px solid #632137`,
            color: "#efc4cd",
            borderRadius: "10px",
            padding: "11px",
            fontSize: "11px",
          }}
        >
          Bids are simulated in this browser session and are not legally binding offers.
        </div>
      </div>
    </div>
  );
};

const ProfileScreen: React.FC<{ progress: number; time: number }> = ({ progress, time }) => {
  const backProgress = interpolate(progress, [0, 0.3], [0, 1], { easing: Easing.easeOut });
  const profileProgress = interpolate(progress, [0.2, 0.5], [0, 1], { easing: Easing.easeOut });
  const verificationProgress = interpolate(progress, [0.4, 0.7], [0, 1], { easing: Easing.easeOut });
  const fieldsProgress = interpolate(progress, [0.6, 1], [0, 1], { easing: Easing.easeOut });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <button
        style={{
          opacity: backProgress,
          background: "none",
          color: "#fff",
          border: "none",
          fontSize: "13px",
          padding: "0 0 14px",
          cursor: "pointer",
        }}
      >
        ‹ Back
      </button>

      <div
        style={{
          opacity: profileProgress,
          transform: `translateY(${interpolate(profileProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#411321",
              display: "grid",
              placeItems: "center",
              fontSize: "23px",
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 800 }}>John Mueller</div>
            <div style={{ fontSize: "12px", color: BrandColors.appMuted }}>Verified Buyer</div>
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: verificationProgress,
          transform: `translateY(${interpolate(verificationProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
          background: "rgba(53, 201, 138, 0.15)",
          border: `1px solid ${BrandColors.appGreen}`,
          borderRadius: "10px",
          padding: "12px",
          margin: "12px 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "16px" }}>✓</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: BrandColors.appGreen }}>Identity Verified</span>
        </div>
        <div style={{ fontSize: "11px", color: BrandColors.appMuted }}>
          Your account has been verified. You can now bid on vehicles.
        </div>
      </div>

      <div
        style={{
          opacity: fieldsProgress,
          transform: `translateY(${interpolate(fieldsProgress, [0, 1], [20, 0], { easing: Easing.easeOut })}px)`,
        }}
      >
        <div style={{ background: BrandColors.appPanel, border: `1px solid ${BrandColors.appLine}`, borderRadius: "14px", padding: "15px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Account Details</div>
          {[
            { label: "Email", value: "john.mueller@email.com" },
            { label: "Phone", value: "+1 (555) 123-4567" },
            { label: "Location", value: "Munich, Germany" },
            { label: "Member Since", value: "March 2024" },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", color: BrandColors.appMuted, marginBottom: "4px" }}>{field.label}</div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileVehicleCard: React.FC<{ vehicle: typeof sampleVehicles[0]; progress: number }> = ({
  vehicle,
  progress,
}) => {
  return (
    <div
      style={{
        background: BrandColors.appPanel,
        border: `1px solid ${BrandColors.appLine}`,
        borderRadius: "15px",
        overflow: "hidden",
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [30, 0], { easing: Easing.easeOut })}px)`,
      }}
    >
      <div
        style={{
          height: "145px",
          background: "linear-gradient(135deg, #30303a, #101016)",
          display: "grid",
          placeItems: "center",
          fontSize: "75px",
          position: "relative",
        }}
      >
        <span style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}>{vehicle.image}</span>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: BrandColors.appRed2,
            borderRadius: "7px",
            padding: "4px 8px",
            fontSize: "10px",
            fontWeight: 800,
          }}
        >
          {vehicle.category}
        </div>
      </div>
      <div style={{ padding: "13px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <div style={{ color: BrandColors.appMuted, fontSize: "11px", margin: "4px 0 8px" }}>
          {vehicle.mileage.toLocaleString()} mi • {vehicle.location}
        </div>
        <div style={{ fontWeight: 900, fontSize: "19px", margin: "6px 0", color: BrandColors.white }}>
          {formatPrice(vehicle.price)}
        </div>
        <button
          style={{
            width: "100%",
            border: 0,
            borderRadius: "10px",
            background: BrandColors.appRed,
            color: "white",
            fontWeight: 800,
            padding: "12px 15px",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const BottomTabs: React.FC<{ activeTab: string; progress: number }> = ({ activeTab, progress }) => {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "explore", label: "Explore", icon: "🔍" },
    { id: "bids", label: "Bids", icon: "🔨" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: "440px",
        margin: "0 auto",
        background: "#111117",
        borderTop: `1px solid ${BrandColors.appLine}`,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "9px 4px 13px",
        zIndex: 5,
        opacity: progress,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          style={{
            border: 0,
            background: "none",
            color: tab.id === activeTab ? "#ff4c67" : "#999",
            fontSize: "10px",
            padding: "4px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "19px" }}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};