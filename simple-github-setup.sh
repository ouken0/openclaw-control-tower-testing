#!/bin/bash

# Simple GitHub Deployment Script
# Very straightforward deployment for friend testing

echo "🚀 Simple GitHub Deployment for Friend Testing"
echo "=============================================="
echo ""

# Simple prompt for GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Simple repository name
REPO_NAME="openclaw-control-tower-testing"

echo ""
echo "📋 Simple Setup Summary:"
echo "======================="
echo "👤 Your GitHub username: $GITHUB_USERNAME"
echo "📦 Repository name: $REPO_NAME"
echo ""

# Go to package directory
cd /home/nabilo/.openclaw/workspace/github-package

# Initialize git
echo "🔨 Setting up git repository..."
git init

# Create simple .gitignore
echo "Creating .gitignore..."
cat > .gitignore << 'EOF'
node_modules
.next
out
*.log
.env
coverage
.nyc_output
.cache
.DS_Store
.vscode
.idea
*.swp
*.swo
EOF

# Create README
echo "Creating simple README..."
cat > README.md << EOF
# OpenClaw Control Tower - Friend Testing

🚀 Simple one-command installation for OpenClaw Control Tower

## Quick Install

\`\`\`bash
curl -sSL https://raw.githubusercontent.com/$GITHUB_USERNAME/$REPO_NAME/main/install.sh | bash
\`\`\`

## What This Does

- Downloads Control Tower from GitHub
- Installs all dependencies automatically
- Starts the dashboard on localhost:18805
- Ready to test within 2-3 minutes

## Testing Instructions

1. Run the one-line command above
2. Wait for installation to complete
3. Open http://localhost:18805 in your browser
4. Test all features and let me know how it works!

## Features to Test

- Dashboard loads correctly
- Agent status shows properly
- Navigation between tabs works
- Mobile interface looks good
- No errors or crashes

## Feedback

Just reply with:
- ✅ Works great!
- ❌ Found this issue: [description]
- 💡 Suggestion: [your idea]

---

*Version: 5.5.0-testing*
*Created for friend testing*
EOF

# Create simple install script
echo "Creating one-line install script..."
cat > install.sh << 'EOF'
#!/bin/bash

echo "🚀 Installing OpenClaw Control Tower..."
echo "====================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

if [ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]; then
    echo "❌ Node.js 18+ required (found: $(node -v))"
    exit 1
fi

echo "✅ Node.js $(node -v) OK"

# Install directory
INSTALL_DIR="$HOME/openclaw-control-tower"
echo "📁 Installing to: $INSTALL_DIR"

mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# Clone repository
echo "📦 Downloading from GitHub..."
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git .

# Install dependencies
echo "🔧 Installing..."
npm install

# Create start script
cat > start.sh << 'START_EOF'
#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting OpenClaw Control Tower..."
npm run dev
START_EOF

chmod +x start.sh

echo ""
echo "🎉 Installation Complete!"
echo "========================="
echo "🚀 Start: $INSTALL_DIR/start.sh"
echo "🌐 Open: http://localhost:18805"
echo ""
echo "Test everything and let me know how it works!"
echo "=========================================="
echo "✅ Dashboard loads?"
echo "✅ Agent status shows?"
echo "✅ Navigation works?"
echo "✅ Mobile looks good?"
echo "✅ No errors?"
echo ""
echo "Just reply with feedback! Thanks! 🙏"
EOF

# Update the install script with actual repo info
sed -i "s/YOUR_USERNAME/$GITHUB_USERNAME/g" install.sh
sed -i "s/YOUR_REPO_NAME/$REPO_NAME/g" install.sh

# Make install script executable
chmod +x install.sh

# Create simple deployment script
echo "Creating simple deployment script..."
cat > deploy.sh << EOF
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
EOF

chmod +x deploy.sh

echo ""
echo "✅ Simple GitHub Setup Complete!"
echo "================================"
echo ""
echo "📋 What's Ready:"
echo "================"
echo "✅ install.sh - One-line installation script"
echo "✅ README.md - Simple instructions"
echo "✅ deploy.sh - Deployment script"
echo ""
echo "🚀 Next Steps:"
echo "=============="
echo "1. Review files in this directory"
echo "2. Run: ./deploy.sh"
echo "3. Share the install command with your friend:"
echo "   curl -sSL https://raw.githubusercontent.com/$GITHUB_USERNAME/$REPO_NAME/main/install.sh | bash"
echo ""
echo "🎯 That's it! Super simple for your friend! 🚀"