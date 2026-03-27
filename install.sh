#!/bin/bash

# OpenClaw Control Tower - One-Line Installation
# Version: 5.5.0-testing

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
git clone https://github.com/ouken0/openclaw-control-tower-testing.git .

# Install dependencies
echo "🔧 Installing..."
npm install

# Create start script
cat > start.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting OpenClaw Control Tower..."
npm run dev
EOF

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