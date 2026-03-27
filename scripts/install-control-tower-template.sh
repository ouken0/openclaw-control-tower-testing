#!/bin/bash

# OpenClaw Control Tower - One-Line Installation Script
# Version: 5.5.0-testing
# Example template for your friend testing

echo "🚀 Installing OpenClaw Control Tower..."
echo "====================================="

# Check Node.js version
echo "📋 Checking system requirements..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required (found: $(node -v))"
    exit 1
fi

echo "✅ Node.js $(node -v) - OK"

# Installation directory
INSTALL_DIR="$HOME/openclaw-control-tower"
echo "📁 Installing to: $INSTALL_DIR"

# Create installation directory
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# Download from GitHub
echo "📦 Downloading Control Tower from GitHub..."
curl -s https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/releases/latest | \
    grep '"browser_download_url":.*\.zip' | \
    cut -d '"' -f 4 | \
    head -1 | \
    xargs -I {} curl -L {} -o control-tower.zip

# Or use git clone
if [ ! -f control-tower.zip ]; then
    echo "🔄 Using git clone method..."
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
fi

# Install dependencies
echo "🔧 Installing dependencies..."
npm install --progress=false

# Create start script
echo "📝 Creating startup script..."
cat > start.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
npm run dev
EOF

chmod +x start.sh

echo ""
echo "🎉 Installation Complete!"
echo "========================="
echo "📂 Installation directory: $INSTALL_DIR"
echo "🚀 Start the Control Tower: $INSTALL_DIR/start.sh"
echo "🌐 Access at: http://localhost:18805"
echo ""
echo "📋 Next Steps:"
echo "1. Start: $INSTALL_DIR/start.sh"
echo "2. Open http://localhost:18805"
echo "3. Test all features and provide feedback"
echo ""
echo "🔧 Troubleshooting:"
echo "- Check logs: tail -f $INSTALL_DIR/logs/control-tower.log"
echo "- Restart: $INSTALL_DIR/start.sh"
echo "- Uninstall: rm -rf $INSTALL_DIR"