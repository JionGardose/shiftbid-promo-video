#!/bin/bash
# Render script for SHIFTBID 6100 Promotional Video

set -e

echo "🎬 SHIFTBID 6100 - Cinematic Promotional Video Renderer"
echo "======================================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Parse arguments
RENDER_TYPE="full"
while [[ $# -gt 0 ]]; do
    case $1 in
        --preview)
            RENDER_TYPE="preview"
            shift
            ;;
        --still)
            RENDER_TYPE="still"
            shift
            ;;
        --help)
            echo "Usage: ./render.sh [options]"
            echo ""
            echo "Options:"
            echo "  --preview    Render 30-second preview (faster)"
            echo "  --still      Extract single frame at 60s"
            echo "  --help       Show this help"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

echo "🎯 Render type: $RENDER_TYPE"
echo ""

case $RENDER_TYPE in
    "preview")
        echo "🔄 Rendering 30-second preview..."
        npx remotion render --concurrency=4 ShiftBidPromoPreview out/shiftbid-promo-preview.mp4 --props '{"preview":true}'
        echo "✅ Preview rendered: out/shiftbid-promo-preview.mp4"
        ;;
    "still")
        echo "📸 Extracting frame at 60 seconds (frame 1800)..."
        npx remotion still ShiftBidPromoStill out/frame.png --frame=1800
        echo "✅ Still extracted: out/frame.png"
        ;;
    "full")
        echo "🔄 Rendering full 90-second video (this may take several minutes)..."
        npx remotion render --concurrency=4 ShiftBidPromoVideo out/shiftbid-promo.mp4
        echo "✅ Full video rendered: out/shiftbid-promo.mp4"
        ;;
esac

echo ""
echo "🎉 Done! Output files are in the 'out/' directory."