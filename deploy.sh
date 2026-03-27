#!/bin/bash

echo "🚀 Deploying to GitHub..."
echo "====================="

# Configure git
git config user.name "OpenClaw User"
git config user.email "user@openclaw.local"

# Add files
git add .

# Commit
git commit -m "🚀 Add OpenClaw Control Tower for friend testing

- Simple one-line installation
- Complete dashboard functionality
- Ready for testing feedback

📝 Version: 5.5.0-testing"

# Create remote and push
echo "📤 Creating GitHub repository..."
gh repo create "/openclaw-control-tower-testing" --public --description "OpenClaw Control Tower - Friend Testing" || true

echo "📤 Pushing to GitHub..."
git push -u origin main || git push -u origin master || git push

echo ""
echo "🎉 Deployment Complete!"
echo "====================="
echo "📦 Repository: https://github.com//openclaw-control-tower-testing"
echo ""
echo "🚀 Your friend can install with:"
echo "curl -sSL https://raw.githubusercontent.com//openclaw-control-tower-testing/main/install.sh | bash"
echo ""
echo "📝 Share this link with your friend!"
echo "=================================="
echo "https://github.com//openclaw-control-tower-testing"
echo ""
echo "🎯 Testing Checklist for Friend:"
echo "- Installation works in 2-3 minutes"
echo "- Dashboard loads at localhost:18805"
echo "- All features accessible"
echo "- Mobile interface works"
echo "- No errors or crashes"
echo ""
echo "🤝 Thanks for testing! 🙏"
