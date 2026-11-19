/**
 * SHIFTBID 6100 - Cinematic Promotional Video
 * Main entry point for Remotion
 */

export { ShiftBidPromoComposition, ShiftBidPromoPreview, ShiftBidPromoStill } from "./composition";
export { ShiftBidPromoVideo } from "./ShiftBidPromoVideo";
export { voiceoverSegments } from "./ShiftBidPromoVideo";

// Brand system
export * from "./brand";

// Components
export * from "./components/DesktopMonitor";
export * from "./components/Smartphone";
export * from "./components/WebsiteMockup";
export * from "./components/MobileAppMockup";

// Scenes
export * from "./scenes/Scene1BrandIntro";
export * from "./scenes/Scene2WebsiteReveal";
export * from "./scenes/Scene3VehicleDiscovery";
export * from "./scenes/Scene4SecureBidding";
export * from "./scenes/Scene5MobileAppReveal";
export * from "./scenes/Scene6LogisticsTracking";
export * from "./scenes/Scene7CompleteEcosystem";
export * from "./scenes/Scene8FinalBrandReveal";