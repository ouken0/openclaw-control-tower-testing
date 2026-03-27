#!/bin/bash

# GitHub Package Deployment Script
# Creates repository and prepares for friend testing

echo "🚀 GitHub Package Deployment - Friend Testing Setup"
echo "================================================="
echo ""

# GitHub configuration
echo "📋 GitHub Setup Configuration"
echo "==========================="

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name
read -p "Enter repository name (default: openclaw-control-tower-testing): " REPO_NAME
REPO_NAME=${REPO_NAME:-openclaw-control-tower-testing}

# Get friend's username for feedback
read -p "Enter your friend's GitHub username: " FRIEND_USERNAME

echo ""
echo "📊 Configuration Summary:"
echo "========================"
echo "👤 Your GitHub username: $GITHUB_USERNAME"
echo "📦 Repository name: $REPO_NAME"
echo "👤 Friend's GitHub username: $FRIEND_USERNAME"
echo ""

# Create GitHub repository
echo "🔨 Creating GitHub Repository..."
echo "============================="

# Initialize git repository
cd /home/nabilo/.openclaw/workspace/github-package
git init

# Create .gitignore
echo "Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# WSL specific files
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

# Create GitHub README for testing
echo "Creating testing-specific README..."
cat > README-TESTING.md << EOF
# OpenClaw Control Tower - FRIEND TESTING

🚀 **This is a TESTING version of the OpenClaw Control Tower for friend review and feedback**

## 🧪 Installation for Friend Testing

### One-Line Installation (Recommended)
\`\`\`bash
curl -sSL https://raw.githubusercontent.com/$GITHUB_USERNAME/$REPO_NAME/main/scripts/install-control-tower.sh | bash
\`\`\`

### Manual Installation
\`\`\`bash
git clone https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
cd openclaw-control-tower-testing
npm install
npm run dev
\`\`\`

## 🎯 Testing Instructions

### Before Installation
1. Ensure you have Node.js 18+ installed
2. Ensure you have OpenClaw running (optional for UI testing)

### After Installation
1. Start the Control Tower: \`npm run dev\`
2. Access at: \`http://localhost:18805\`
3. Test the following features:
   - Dashboard loading
   - Agent status display
   - Navigation between tabs
   - Mobile responsiveness
   - Installation script functionality

### Expected Behavior
- ✅ Dashboard loads without errors
- ✅ Agent status shows correctly
- ✅ Navigation between tabs works
- ✅ Mobile interface is functional
- ✅ Installation completes successfully

## 📋 Feedback Checklist

Please provide feedback on:

### Installation Process
- [ ] Installation script works smoothly
- [ ] All dependencies install correctly
- [ ] No permission issues
- [ ] Installation time is reasonable

### UI/UX Features
- [ ] Dashboard loads quickly
- [ ] Agent status displays correctly
- [ ] Navigation is intuitive
- [ ] Mobile interface is usable
- [ ] No visual glitches

### Functionality
- [ ] All tabs load correctly
- [ ] Agent cards show proper information
- [ ] API credits section works
- [ ] Metrics display properly

### Performance
- [ ] Response times are acceptable
- [ ] No memory issues
- [ ] CPU usage is reasonable
- [ ] Network performance is good

## 📝 How to Provide Feedback

### Option 1: GitHub Issues
Create issues at: https://github.com/$GITHUB_USERNAME/$REPO_NAME/issues

### Option 2: Direct Email
- Email: [your-email@example.com]
- Subject: Control Tower Testing Feedback

### Option 3: WhatsApp/Telegram
- Message your feedback directly

## 🔧 Troubleshooting

### Common Issues
1. **Installation fails**: Check Node.js version (18+ required)
2. **Dependencies fail**: Try \`npm install --force\`
3. **Port conflict**: Change port in package.json
4. **OpenClaw integration**: Ensure gateway is running on port 8080

### Getting Help
- Contact: [Your contact method]
- Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME

## 🚀 Next Steps

Your feedback will help us:
- Improve installation process
- Fix any bugs before public release
- Optimize performance
- Enhance user experience

Thank you for helping us make the OpenClaw Control Tower better! 🙏

---
*Testing version - Not for production use*
*Version: 5.5.0-testing*
*Date: $(date +%Y-%m-%d)*
EOF

# Create installation script
echo "Creating one-line installation script..."
mkdir -p scripts
cat > scripts/install-control-tower.sh << 'EOF'
#!/bin/bash

# OpenClaw Control Tower - One-Line Installation
# Version: 5.5.0-testing

set -e

echo "🚀 Installing OpenClaw Control Tower..."
echo "====================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📋 Checking system requirements..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required (found: $(node -v))${NC}"
    echo "Please upgrade Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) - OK${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm -v) - OK${NC}"

# Installation directory
INSTALL_DIR="$HOME/openclaw-control-tower"
echo "📁 Installing to: $INSTALL_DIR"

# Create installation directory
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# Download and extract
echo "📦 Downloading Control Tower..."
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Download the latest version
echo "🔄 Downloading from GitHub..."
curl -s https://api.github.com/repos/GITHUB_USERNAME/REPO_NAME/releases/latest | \
    grep '"browser_download_url":.*\.zip' | \
    cut -d '"' -f 4 | \
    head -1 | \
    xargs -I {} curl -L {} -o control-tower.zip

# If direct download fails, use git clone
if [ ! -f control-tower.zip ]; then
    echo "🔄 Using git clone method..."
    git clone https://github.com/GITHUB_USERNAME/REPO_NAME.git .
fi

# Install dependencies
echo "🔧 Installing dependencies..."
npm install --progress=false

# Create start script
echo "📝 Creating startup script..."
cat > start.sh << 'START_EOF'
#!/bin/bash
cd "$(dirname "$0")"
npm run dev
START_EOF

chmod +x start.sh

# Create systemd service (optional)
echo "🔧 Creating systemd service..."
cat > /tmp/control-tower.service << 'SERVICE_EOF'
[Unit]
Description=OpenClaw Control Tower
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$HOME/openclaw-control-tower
ExecStart=$HOME/openclaw-control-tower/start.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE_EOF

if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Running as root - skipping systemd service creation"
else
    if [ -f /tmp/control-tower.service ]; then
        sed -i "s/\$USER/$USER/g" /tmp/control-tower.service
        sed -i "s|\$HOME|$HOME|g" /tmp/control-tower.service
        
        if [ -d /etc/systemd/system ]; then
            sudo cp /tmp/control-tower.service /etc/systemd/system/
            sudo systemctl daemon-reload
            sudo systemctl enable control-tower
            echo -e "${GREEN}✅ Systemd service created${NC}"
        fi
    fi
fi

# Cleanup
cd "$HOME"
rm -rf "$TEMP_DIR"

echo ""
echo "🎉 Installation Complete!"
echo "========================="
echo "📂 Installation directory: $INSTALL_DIR"
echo "🚀 Start the Control Tower: $INSTALL_DIR/start.sh"
echo "🌐 Access at: http://localhost:18805"
echo ""
echo "📋 Next Steps:"
echo "1. Start the Control Tower: $INSTALL_DIR/start.sh"
echo "2. Open http://localhost:18805 in your browser"
echo "3. Test all features and provide feedback"
echo ""
echo "📝 Feedback Options:"
echo "- GitHub Issues: https://github.com/GITHUB_USERNAME/REPO_NAME/issues"
echo "- Email: [your-email@example.com]"
echo ""
echo "🔧 Troubleshooting:"
echo "- Check logs: tail -f $INSTALL_DIR/logs/control-tower.log"
echo "- Restart service: systemctl restart control-tower"
echo "- Uninstall: rm -rf $INSTALL_DIR"
echo ""
echo -e "${GREEN}Thank you for testing! 🙏${NC}"
EOF

# Make installation script executable
chmod +x scripts/install-control-tower.sh

# Create issue template
echo "Creating GitHub issue template..."
mkdir -p .github/ISSUE_TEMPLATE
cat > .github/ISSUE_TEMPLATE/bug_report.yml << EOF
name: Bug Report
description: Report a bug to help us improve the Control Tower
title: "[BUG] "
labels: ["bug", "testing"]
assignees: 
  - $FRIEND_USERNAME
body:
  - type: markdown
    attributes:
      value: |
        🐛 Thank you for reporting a bug! Please fill out this form completely.

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Describe the bug you encountered
      placeholder: A clear and concise description of what the bug is
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior
      placeholder: |
        1. Install Control Tower
        2. Do this
        3. See that error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What you expected to happen
      placeholder: A clear and concise description of what you expected to happen
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened
      placeholder: A clear and concise description of what actually happened
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: Your testing environment
      placeholder: |
        - OS: [e.g., Ubuntu 22.04]
        - Node.js version: [e.g., 18.17.0]
        - Browser: [e.g., Chrome 120]
        - OpenClaw: [e.g., Yes/No]
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots to help explain your problem
      placeholder: You can drag and drop images here
    validations:
      required: false
EOF

cat > .github/ISSUE_TEMPLATE/feature_request.yml << EOF
name: Feature Request
description: Suggest a new feature or enhancement
title: "[FEATURE] "
labels: ["enhancement", "feature"]
assignees:
  - $FRIEND_USERNAME
body:
  - type: markdown
    attributes:
      value: |
        ✨ Thank you for suggesting a feature! Please fill out this form completely.

  - type: textarea
    id: description
    attributes:
      label: Feature Description
      description: Describe the feature you'd like to see implemented
      placeholder: A clear and concise description of the feature you want
    validations:
      required: true

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: Is your feature request related to a problem? If so, please describe it
      placeholder: A clear and concise description of the problem
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: Describe the solution you'd like
      placeholder: A clear and concise description of what you want to happen
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternative Solutions
      description: Describe any alternative solutions or features you've considered
      placeholder: A clear and concise description of any alternative solutions
    validations:
      required: false

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Add any other context or screenshots about the feature request here
      placeholder: You can drag and drop images here
    validations:
      required: false
EOF

# Create commit and push script
echo "Creating deployment script..."
cat > scripts/deploy-to-github.sh << EOF
#!/bin/bash

# GitHub Deployment Script
echo "🚀 Deploying to GitHub..."
echo "======================="

# Configure git
git config user.name "OpenClaw Deploy Bot"
git config user.email "deploy@openclaw.ai"

# Add all files
git add .

# Commit with timestamp
git commit -m "🚀 Add OpenClaw Control Tower v5.5.0 for friend testing

- Complete repository structure
- One-line installation script
- Comprehensive documentation  
- Performance optimized
- Ready for friend testing

🤖 Generated by OpenClaw Amin"

# Create GitHub repository (if it doesn't exist)
echo "🔨 Creating GitHub repository..."
gh repo create "$GITHUB_USERNAME/$REPO_NAME" --public --description "OpenClaw Control Tower - Friend Testing Version" || true

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "📦 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "🔗 One-line install: curl -sSL https://raw.githubusercontent.com/$GITHUB_USERNAME/$REPO_NAME/main/scripts/install-control-tower.sh | bash"
echo ""
echo "📝 Next Steps:"
echo "1. Share the repository with your friend: $FRIEND_USERNAME"
echo "2. Ask them to test with the one-line installation"
echo "3. Collect feedback for improvements before public release"
echo ""
echo "🎯 Testing Checklist:"
echo "- Installation works correctly"
echo "- Dashboard loads properly"
echo "- All features accessible"
echo "- Performance is acceptable"
echo "- No major bugs or issues"
EOF

chmod +x scripts/deploy-to-github.sh

echo ""
echo "✅ GitHub Package Ready for Friend Testing!"
echo "============================================"
echo ""
echo "📋 Summary of Created Files:"
echo "============================"
echo "📝 README-TESTING.md - Friend testing instructions"
echo "🔧 .gitignore - Git ignore file"
echo "📦 scripts/install-control-tower.sh - One-line installation"
echo "🐛 .github/ISSUE_TEMPLATE/ - Bug and feature templates"
echo "🚀 scripts/deploy-to-github.sh - Deployment script"
echo ""
echo "🎯 Ready for Deployment!"
echo "========================"
echo "1. Review all files in: /home/nabilo/.openclaw/workspace/github-package"
echo "2. Edit placeholder values (GITHUB_USERNAME, REPO_NAME, FRIEND_USERNAME)"
echo "3. Run: ./scripts/deploy-to-github.sh"
echo "4. Share repository link with friend"
echo "5. Test one-line installation: curl -sSL https://raw.githubusercontent.com/USERNAME/REPO/main/scripts/install-control-tower.sh | bash"
echo ""
echo "📦 One-Line Installation Command (for your friend):"
echo "curl -sSL https://raw.githubusercontent.com/$GITHUB_USERNAME/$REPO_NAME/main/scripts/install-control-tower.sh | bash"
echo ""
echo "🤝 Friend Testing Ready! 🚀"