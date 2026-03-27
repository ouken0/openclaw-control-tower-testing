#!/bin/bash

# Deploy OpenClaw Control Tower to GitHub
# GitHub username: ouken0

echo "🚀 Deploying OpenClaw Control Tower..."
echo "===================================="
echo "GitHub: ouken0/openclaw-control-tower-testing"
echo ""

# Configure git
git config user.name "OpenClaw User"
git config user.email "user@openclaw.local"

# Add files
git add .

# Commit
git commit -m "🚀 Add OpenClaw Control Tower for friend testing

- Complete dashboard functionality
- Simple one-line installation
- Ready for testing feedback

📝 Version: 5.5.0-testing
👤 GitHub: ouken0"

# Create repository and push
echo "📤 Creating GitHub repository..."
gh repo create "ouken0/openclaw-control-tower-testing" --public --description "OpenClaw Control Tower - Friend Testing" || true

echo "📤 Pushing to GitHub..."
git push -u origin main || git push -u origin master || git push

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================"
echo ""
echo "📦 Repository: https://github.com/ouken0/openclaw-control-tower-testing"
echo ""
echo "🚀 Your friend can install with:"
echo "curl -sSL https://raw.githubusercontent.com/ouken0/openclaw-control-tower-testing/main/install.sh | bash"
echo ""
echo "📝 Share this repository link:"
echo "https://github.com/ouken0/openclaw-control-tower-testing"
echo ""
echo "🎯 Simple testing checklist for your friend:"
echo "- Installation takes 2-3 minutes"
echo "- Dashboard loads at localhost:18805"
echo "- All features work properly"
echo "- Mobile interface looks good"
echo "- No errors or crashes"
echo ""
echo "🤝 Thanks for helping test! 🙏"