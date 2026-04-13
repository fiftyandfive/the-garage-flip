#!/bin/bash
# Push updated Garage Flip site to GitHub
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMP_DIR=$(mktemp -d)

echo "🔧 Cloning repo..."
git clone https://github.com/fiftyandfive/the-garage-flip.git "$TEMP_DIR/repo"

echo "📦 Copying updated files..."
cp "$SCRIPT_DIR/src/App.jsx" "$TEMP_DIR/repo/src/App.jsx"
cp "$SCRIPT_DIR/index.html" "$TEMP_DIR/repo/index.html"
cp "$SCRIPT_DIR/package.json" "$TEMP_DIR/repo/package.json"
cp "$SCRIPT_DIR/public/robots.txt" "$TEMP_DIR/repo/public/robots.txt"
cp "$SCRIPT_DIR/public/sitemap.xml" "$TEMP_DIR/repo/public/sitemap.xml"

cd "$TEMP_DIR/repo"

echo "📝 Committing..."
git add -A
git commit -m "feat: outcome-based positioning, 4-tier offer ladder, blog pages

- Services rewritten to sell outcomes not commodities
- 4-tier offer ladder: Reset / Upgrade / Full Flip / Keep It Clean
- Recurring maintenance section (monthly + quarterly plans)
- 12 blog articles with dedicated /blog/:slug pages (react-router)
- City-specific articles (Winter Park, Windermere, Lake Nona, Dr. Phillips)
- Service-specific articles (cleanout, org, flooring, storage, EV, AC)
- Blog card grid with uniform heights
- GA4 tracking (G-RY0HBH06LR)
- Updated FAQ, schemas, sitemap for new positioning
- Phone updated to (407) 735-6450"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Done! Vercel will auto-deploy."

# Cleanup
rm -rf "$TEMP_DIR"
