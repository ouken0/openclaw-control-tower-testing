#!/bin/bash

# OpenClaw Control Tower - GitHub CLI Installation & Deployment
# Run this script with sudo to install GitHub CLI and deploy

echo "🚀 OpenClaw Control Tower - GitHub CLI Setup"
echo "============================================"
echo ""

echo "📋 This script will:"
echo "1. Install GitHub CLI (gh)"
echo "2. Authenticate with your GitHub account"
echo "3. Deploy Control Tower to your GitHub repository"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root: sudo $0"
    echo ""
    echo "OR run these commands manually:"
    echo ""
    echo "# Install GitHub CLI"
    echo "curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg"
    echo ""
    echo "echo 'deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main' | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null"
    echo ""
    echo "sudo apt update"
    echo "sudo apt install gh"
    echo ""
    echo "# Then authenticate and deploy"
    echo "gh auth login"
    echo "cd /home/nabilo/.openclaw/workspace/github-package"
    echo "git config user.name 'Your Name'"
    echo "git config user.email 'your-email@example.com'"
    echo "git add ."
    echo "git commit -m '🚀 Add OpenClaw Control Tower for friend testing'"
    echo "gh repo create 'ouken0/openclaw-control-tower-testing' --public --description 'OpenClaw Control Tower - Friend Testing'"
    echo "git push -u origin main"
    exit 1
fi

echo "🔧 Installing GitHub CLI..."
echo "========================="

# Add GitHub CLI repository
echo "📦 Adding GitHub CLI repository..."
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# Update package list and install
apt update
apt install -y gh

echo ""
echo "✅ GitHub CLI installed successfully!"
echo ""
echo "🔐 GitHub Authentication"
echo "========================="
echo "Run this command to authenticate with your GitHub account:"
echo "gh auth login"
echo ""
echo "Choose these options:"
echo "- GitHub.com"
echo "- Login with web browser"
echo "- Yes (for authentication)"
echo ""
echo "🚀 After Authentication"
echo "======================"
echo "Then run these commands to deploy:"
echo ""
echo "cd /home/nabilo/.openclaw/workspace/github-package"
echo "git config user.name 'Your Name'"
echo "git config user.email 'your-email@example.com'"
echo "git add ."
echo "git commit -m '🚀 Add OpenClaw Control Tower for friend testing'"
echo ""
echo "📤 Create and push repository:"
echo "gh repo create 'ouken0/openclaw-control-tower-testing' --public --description 'OpenClaw Control Tower - Friend Testing'"
echo "git push -u origin main"
echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📋 What your friend needs:"
echo "Repository: https://github.com/ouken0/openclaw-control-tower-testing"
echo "Install command: curl -sSL https://raw.githubusercontent.com/ouken0/openclaw-control-tower-testing/main/install.sh | bash"