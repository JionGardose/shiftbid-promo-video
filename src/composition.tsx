import { Composition, AbsoluteFill, registerRoot } from "remotion";
import React from "react";
import { ShiftBidPromoVideo } from "./ShiftBidPromoVideo";

const AllCompositions = () => {
  return (
    <>
      <Composition
        id="ShiftBidPromoVideo"
        component={ShiftBidPromoVideo}
        durationInFrames={2700} // 90 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          preview: false,
        }}
      />
      <Composition
        id="ShiftBidPromoPreview"
        component={ShiftBidPromoVideo}
        durationInFrames={2700} // 90 seconds at 30fps (was 900)
        fps={30}
        width={1280}   // 720p (was 854)
        height={720}   // 720p (was 480)
        defaultProps={{
          preview: true,
        }}
      />
      <Composition
        id="ShiftBidPromoStill"
        component={ShiftBidPromoVideo}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          preview: false,
        }}
      />
    </>
  );
};

export const ShiftBidPromoComposition = () => (
  <Composition
    id="ShiftBidPromoVideo"
    component={ShiftBidPromoVideo}
    durationInFrames={2700}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ preview: false }}
  />
);

export const ShiftBidPromoPreview = () => (
  <Composition
    id="ShiftBidPromoPreview"
    component={ShiftBidPromoVideo}
    durationInFrames={2700}  // 90s
    fps={30}
    width={1280}   // 720p
    height={720}   // 720p
    defaultProps={{ preview: true }}
  />
);

export const ShiftBidPromoStill = () => (
  <Composition
    id="ShiftBidPromoStill"
    component={ShiftBidPromoVideo}
    durationInFrames={1}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ preview: false }}
  />
);

// Register all compositions for Remotion 4.x
registerRoot(AllCompositions);