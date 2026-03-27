#!/bin/bash

# OpenClaw Control Tower Deployment
# Using GitHub username: ouken0

GITHUB_USERNAME="ouken0"
REPO_NAME="openclaw-control-tower-testing"

echo "🚀 Deploying OpenClaw Control Tower to GitHub..."
echo "============================================="
echo "👤 GitHub Username: $GITHUB_USERNAME"
echo "📦 Repository: $REPO_NAME"
echo ""

# Configure git
echo "🔨 Configuring git..."
git config user.name "OpenClaw User"
git config user.email "user@openclaw.local"

# Add files
echo "📂 Adding files..."
git add .

# Commit
echo "💾 Committing..."
git commit -m "🚀 Add OpenClaw Control Tower for friend testing

- Simple one-line installation
- Complete dashboard functionality
- Ready for testing feedback

📝 Version: 5.5.0-testing
👤 GitHub: $GITHUB_USERNAME"

# Create remote and push
echo "📤 Creating GitHub repository..."
gh repo create "$GITHUB_USERNAME/$REPO_NAME" --public --description "OpenClaw Control Tower - Friend Testing" || true

echo "📤 Pushing to GitHub..."
git push -u origin main || git push -u origin master || git push

echo ""
echo "🎉 Deployment Complete!"
echo "====================="
echo "📦 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "🚀 Your friend can install with:"
echo "curl -sSL https://raw.githubusercontent.com/$GITHUB_USERNAME/$REPO_NAME/main/install.sh | bash"
echo ""
echo "📝 Share this link with your friend!"
echo "=================================="
echo "https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "🎯 Testing Checklist for Friend:"
echo "- Installation works in 2-3 minutes"
echo "- Dashboard loads at localhost:18805"
echo "- All features accessible"
echo "- Mobile interface works"
echo "- No errors or crashes"
echo ""
echo "🤝 Thanks for testing! 🙏"