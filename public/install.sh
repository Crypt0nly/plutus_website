#!/bin/bash
# Plutus Installer for macOS / Linux
# Usage: curl -sSL https://useplutus.ai/install.sh | sh
#
# What this script does:
#   1. Ensures Python 3.14+ is available (auto-installs via Homebrew/apt/dnf if needed)
#   2. Creates a virtual environment and installs Plutus into it
#   3. Creates a launcher shortcut (macOS .app / Linux .desktop)
#   4. Launches Plutus in the background and opens the browser
#
# WSL is NOT installed by this script — it's a Windows-only feature.

set -e

echo ""
echo "  ____  _       _             "
echo " |  _ \| |_   _| |_ _   _ ___ "
echo " | |_) | | | | | __| | | / __|"
echo " |  __/| | |_| | |_| |_| \__ \\"
echo " |_|   |_|\__,_|\__|\__,_|___/"
echo ""
echo "  Plutus Installer"
echo "  ─────────────────────────────"
echo ""

OS="$(uname -s)"

# ── Step 1: Ensure Python 3.14+ is available ─────────────
# We auto-install Python if it's missing — the user should never
# have to do this manually.

PYTHON_CMD=""

check_python() {
    local cmd=$1
    if command -v "$cmd" &>/dev/null; then
        local version
        version=$("$cmd" --version 2>&1 | sed -n 's/Python \([0-9]*\.[0-9]*\).*/\1/p' | head -1)
        local major minor
        major=$(echo "$version" | cut -d. -f1)
        minor=$(echo "$version" | cut -d. -f2)
        if [ "$major" -ge 3 ] && [ "$minor" -ge 11 ]; then
            PYTHON_CMD="$cmd"
            return 0
        fi
    fi
    return 1
}

# Check common Python binary names — prefer newest first
for _py_candidate in python3.14 python3.13 python3.12 python3.11 python3 python; do
    if check_python "$_py_candidate"; then
        break
    fi
done

# Also check Homebrew-managed paths on macOS (not always on PATH in non-interactive shells)
if [ -z "$PYTHON_CMD" ] && [ "$OS" = "Darwin" ]; then
    for _brew_py in \
        /opt/homebrew/bin/python3.14 \
        /opt/homebrew/bin/python3.13 \
        /opt/homebrew/bin/python3.12 \
        /opt/homebrew/bin/python3.11 \
        /usr/local/bin/python3.14 \
        /usr/local/bin/python3.13 \
        /usr/local/bin/python3.12 \
        /usr/local/bin/python3.11; do
        if check_python "$_brew_py"; then
            break
        fi
    done
fi

if [ -z "$PYTHON_CMD" ]; then
    echo "[1/4] Python 3.14+ not found — installing automatically..."
    echo ""

    if [ "$OS" = "Darwin" ]; then
        # ── macOS: 3-tier strategy ──────────────────────────────
        # Tier 1: Try Homebrew (works on macOS 13 Ventura+)
        # Tier 2: Try Homebrew Legacy (works on older macOS)
        # Tier 3: Direct python.org .pkg installer (works on macOS 10.9+)
        # ────────────────────────────────────────────────────────

        _brew_ok=false

        # ── Tier 1: Standard Homebrew ──
        if ! command -v brew &>/dev/null; then
            echo "       Trying Homebrew..."
            NONINTERACTIVE=1 /bin/bash -c \
                "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
                2>&1 | grep -E '(Installing|Downloading|==>|Error|already installed)' || true
            if [ -f /opt/homebrew/bin/brew ]; then
                eval "$(/opt/homebrew/bin/brew shellenv)"
            elif [ -f /usr/local/bin/brew ]; then
                eval "$(/usr/local/bin/brew shellenv)"
            fi
        fi

        if command -v brew &>/dev/null; then
            echo "       Installing Python 3.14 via Homebrew..."
            brew install python@3.14 > /tmp/plutus_brew.log 2>&1 &
            _BREW_PID=$!
            _SPIN='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
            _i=0
            while kill -0 "$_BREW_PID" 2>/dev/null; do
                _char=$(printf '%s' "$_SPIN" | cut -c$(( (_i % 10) + 1 )))
                printf "\r       %s  Installing Python 3.14 via Homebrew... (this may take a minute)" "$_char"
                sleep 0.12
                _i=$(( _i + 1 ))
            done
            wait "$_BREW_PID" || true
            printf "\r       ✓  Homebrew Python install complete.                              \n"
            rm -f /tmp/plutus_brew.log
            brew link --overwrite python@3.14 2>/dev/null || true
            for _brew_py in \
                "$(brew --prefix python@3.14 2>/dev/null)/bin/python3.14" \
                /opt/homebrew/bin/python3.14 \
                /usr/local/bin/python3.14; do
                if check_python "$_brew_py"; then
                    _brew_ok=true
                    break
                fi
            done
            check_python python3.14 || check_python python3 || true
            [ -n "$PYTHON_CMD" ] && _brew_ok=true
        fi

        # ── Tier 2: Homebrew Legacy (for macOS < 13 Ventura) ──
        if [ "$_brew_ok" = false ] && ! command -v brew &>/dev/null; then
            echo "       Standard Homebrew failed (likely an older macOS)."
            echo "       Trying Homebrew Legacy for older Macs..."
            NONINTERACTIVE=1 /bin/bash -c \
                "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
                2>&1 | grep -E '(Installing|Downloading|==>|Error|already installed)' || true
            if [ -f /usr/local/bin/brew ]; then
                eval "$(/usr/local/bin/brew shellenv)"
                brew install python@3.14 > /tmp/plutus_brew_legacy.log 2>&1 &
                _BREW_PID=$!
                _SPIN='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
                _i=0
                while kill -0 "$_BREW_PID" 2>/dev/null; do
                    _char=$(printf '%s' "$_SPIN" | cut -c$(( (_i % 10) + 1 )))
                    printf "\r       %s  Installing Python 3.14 via Homebrew Legacy..." "$_char"
                    sleep 0.12
                    _i=$(( _i + 1 ))
                done
                wait "$_BREW_PID" || true
                printf "\r       ✓  Homebrew Legacy Python install complete.                   \n"
                rm -f /tmp/plutus_brew_legacy.log
                check_python python3.14 || check_python python3 || true
                [ -n "$PYTHON_CMD" ] && _brew_ok=true
            fi
        fi

        # ── Tier 3: Direct python.org .pkg installer ──
        # Supports macOS 10.9 (Mavericks) and later — covers all Macs
        # from the last ~12 years without needing Homebrew at all.
        if [ -z "$PYTHON_CMD" ]; then
            echo ""
            echo "       Homebrew unavailable on this Mac."
            echo "       Downloading Python 3.14.3 installer from python.org..."
            echo "       (This is a one-time ~43 MB download)"
            echo ""
            _PKG_URL="https://www.python.org/ftp/python/3.14.3/python-3.14.3-macos11.pkg"
            _PKG_FILE="/tmp/python-3.14.3-installer.pkg"
            if curl -L --progress-bar -o "$_PKG_FILE" "$_PKG_URL"; then
                echo "       Installing Python 3.14.3 (you may be prompted for your password)..."
                echo ""
                # Run the installer in the background and show a spinner so the
                # user knows it hasn't stalled (the .pkg can take 1-3 minutes).
                sudo installer -pkg "$_PKG_FILE" -target / \
                    > /tmp/plutus_pkg_install.log 2>&1 &
                _PKG_PID=$!
                _SPIN='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
                _i=0
                printf "       "
                while kill -0 "$_PKG_PID" 2>/dev/null; do
                    _char=$(printf '%s' "$_SPIN" | cut -c$(( (_i % 10) + 1 )))
                    printf "\r       %s  Installing Python 3.14.3... (this takes about a minute)" "$_char"
                    sleep 0.12
                    _i=$(( _i + 1 ))
                done
                wait "$_PKG_PID"
                _PKG_EXIT=$?
                printf "\r       ✓  Python 3.14.3 installed.                                    \n"
                echo ""
                if [ "$_PKG_EXIT" -ne 0 ]; then
                    echo "[ERROR] Python installer failed. Log:"
                    cat /tmp/plutus_pkg_install.log
                    exit 1
                fi
                rm -f "$_PKG_FILE" /tmp/plutus_pkg_install.log
                # python.org installer puts Python in /Library/Frameworks
                for _fw_py in \
                    /Library/Frameworks/Python.framework/Versions/3.14/bin/python3.14 \
                    /usr/local/bin/python3.14; do
                    if check_python "$_fw_py"; then
                        break
                    fi
                done
                check_python python3.14 || check_python python3 || true
            else
                echo ""
                echo "[ERROR] Could not download the Python installer."
                echo "  Please install Python 3.14.3 manually:"
                echo "    https://www.python.org/ftp/python/3.14.3/python-3.14.3-macos11.pkg"
                echo "  Then re-run this installer."
                exit 1
            fi
        fi

    else
        # ── Linux: detect package manager and install ──
        if command -v apt-get &>/dev/null; then
            echo "       Installing Python 3.14 via apt..."
            sudo apt-get update -qq 2>/dev/null || true
            sudo apt-get install -y python3.14 python3.14-venv python3-pip 2>&1 \
                | grep -E '(Installing|Unpacking|Setting up|already)' || true
        elif command -v dnf &>/dev/null; then
            echo "       Installing Python 3.14 via dnf..."
            sudo dnf install -y python3.14 2>&1 | grep -E '(Installing|Installed|already)' || true
        elif command -v pacman &>/dev/null; then
            echo "       Installing Python via pacman..."
            sudo pacman -Sy --noconfirm python 2>&1 | grep -E '(installing|installed|already)' || true
        elif command -v zypper &>/dev/null; then
            echo "       Installing Python 3.14 via zypper..."
            sudo zypper install -y python314 2>&1 | grep -E '(Installing|already)' || true
        else
            echo ""
            echo "[ERROR] Could not auto-install Python — no supported package manager found."
            echo "  Please install Python 3.14+ manually and re-run this installer:"
            echo "    https://www.python.org/downloads/"
            exit 1
        fi

        # Re-check after install
        for _py_candidate in python3.14 python3.13 python3.12 python3.11 python3; do
            if check_python "$_py_candidate"; then
                break
            fi
        done
    fi

    if [ -z "$PYTHON_CMD" ]; then
        echo ""
        echo "[ERROR] Python installation completed but Python 3.11+ still not found."
        echo "  Please open a new terminal window and re-run this installer."
        exit 1
    fi

    echo "       Python installed successfully."
    echo ""
fi

PY_VER=$($PYTHON_CMD --version 2>&1)
PYTHON_FULL_PATH=$(command -v "$PYTHON_CMD")
echo "[1/4] $PY_VER found."

# ── Step 2: Install Plutus (inside a virtual environment) ─

echo "[2/4] Installing Plutus..."

PLUTUS_DIR="$HOME/.plutus"
VENV_DIR="$PLUTUS_DIR/venv"
mkdir -p "$PLUTUS_DIR"

# Create (or re-use) a virtual environment so we never hit
# PEP 668 "externally-managed-environment" errors on macOS/Homebrew
# or modern Linux distros.
if [ ! -d "$VENV_DIR/bin" ]; then
    echo "       Creating virtual environment..."
    $PYTHON_CMD -m venv "$VENV_DIR"
fi

# From here on, use the venv Python for all pip operations
VENV_PYTHON="$VENV_DIR/bin/python"

$VENV_PYTHON -m pip install --upgrade pip >/dev/null 2>&1 || true

# On Intel Macs (x86_64) running macOS 12+, older PyPI releases may only have
# arm64 wheels.  We attempt a normal install first; if that fails we retry with
# an explicit platform tag so pip can find the correct wheel.
if ! $VENV_PYTHON -m pip install --upgrade "plutus-ai[all]" 2>/dev/null; then
    ARCH="$(uname -m)"
    if [ "$OS" = "Darwin" ] && [ "$ARCH" = "x86_64" ]; then
        echo "       Retrying with explicit Intel Mac platform tag..."
        $VENV_PYTHON -m pip install --upgrade \
            --platform macosx_10_9_x86_64 \
            --only-binary :all: \
            "plutus-ai[all]" 2>/dev/null \
        || $VENV_PYTHON -m pip install --upgrade "plutus-ai[all]"
    else
        $VENV_PYTHON -m pip install --upgrade "plutus-ai[all]"
    fi
fi

echo "       Plutus installed."

# ── Step 3: Create Launcher & Shortcut ────────────────────

echo "[3/4] Creating launcher..."

# The launcher always uses the venv Python so Plutus and all its
# dependencies are found regardless of system Python configuration.
LAUNCHER="$PLUTUS_DIR/start.sh"
cat > "$LAUNCHER" << LAUNCHER_EOF
#!/bin/bash
# Plutus Launcher — double-click or run to start Plutus

PYTHON="$VENV_DIR/bin/python"

# ── Open browser helper ──
_open_browser() {
    if [ "\$(uname -s)" = "Darwin" ]; then
        open "http://localhost:7777"
    else
        xdg-open "http://localhost:7777" 2>/dev/null || sensible-browser "http://localhost:7777" 2>/dev/null || true
    fi
}

# Check if Plutus is already running
if curl -sf http://localhost:7777/api/config > /dev/null 2>&1; then
    # Already running — just open the browser
    _open_browser
else
    # Start Plutus in the background
    nohup "\$PYTHON" -m plutus start > "\$HOME/.plutus/plutus.log" 2>&1 &
    disown 2>/dev/null || true

    # Wait for Plutus to be ready before opening the browser.
    # Poll /api/config every 0.5 s for up to 60 s.
    _MAX=120
    _i=0
    _SPIN='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    while [ \$_i -lt \$_MAX ]; do
        if curl -sf http://localhost:7777/api/config > /dev/null 2>&1; then
            printf "\r       ✓  Plutus is ready.                          \n"
            break
        fi
        _char=\$(printf '%s' "\$_SPIN" | cut -c\$(( (\$_i % 10) + 1 )))
        printf "\r       %s  Starting Plutus..." "\$_char"
        sleep 0.5
        _i=\$(( _i + 1 ))
    done

    _open_browser
fi
LAUNCHER_EOF
chmod +x "$LAUNCHER"

# Create a convenience wrapper so `plutus` command works from anywhere
# by delegating to the venv's entry point.
PLUTUS_BIN="$PLUTUS_DIR/plutus"
cat > "$PLUTUS_BIN" << BIN_EOF
#!/bin/bash
# Plutus CLI wrapper — delegates to the venv installation
exec "$VENV_DIR/bin/python" -m plutus "\$@"
BIN_EOF
chmod +x "$PLUTUS_BIN"

# Add ~/.plutus to PATH if not already there (for `plutus` command)
_SHELL_RC=""
if [ -n "$ZSH_VERSION" ] || [ -f "$HOME/.zshrc" ]; then
    _SHELL_RC="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    _SHELL_RC="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
    _SHELL_RC="$HOME/.bash_profile"
fi
if [ -n "$_SHELL_RC" ]; then
    if ! grep -q '\.plutus' "$_SHELL_RC" 2>/dev/null; then
        echo '' >> "$_SHELL_RC"
        echo '# Plutus CLI' >> "$_SHELL_RC"
        echo 'export PATH="$HOME/.plutus:$PATH"' >> "$_SHELL_RC"
    fi
fi
export PATH="$PLUTUS_DIR:$PATH"

ICON_PNG="$PLUTUS_DIR/plutus-icon.png"
ICON_ICNS="$PLUTUS_DIR/plutus-icon.icns"
curl -fsSL "https://useplutus.ai/plutus-icon.png" -o "$ICON_PNG" 2>/dev/null || true
curl -fsSL "https://useplutus.ai/plutus-icon.icns" -o "$ICON_ICNS" 2>/dev/null || true

if [ "$OS" = "Darwin" ]; then
    # ── macOS: create a double-clickable .app bundle ──
    APP_DIR="$HOME/Applications/Plutus.app"
    mkdir -p "$APP_DIR/Contents/MacOS" "$APP_DIR/Contents/Resources"
    cat > "$APP_DIR/Contents/MacOS/Plutus" << APP_EOF
#!/bin/bash
bash "$LAUNCHER"
APP_EOF
    chmod +x "$APP_DIR/Contents/MacOS/Plutus"
    cat > "$APP_DIR/Contents/Info.plist" << PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key><string>Plutus</string>
    <key>CFBundleExecutable</key><string>Plutus</string>
    <key>CFBundleIdentifier</key><string>ai.useplutus.plutus</string>
    <key>CFBundleVersion</key><string>1.0</string>
    <key>CFBundlePackageType</key><string>APPL</string>
    <key>CFBundleIconFile</key><string>plutus-icon</string>
    <key>LSUIElement</key><true/>
</dict>
</plist>
PLIST_EOF
    if [ -f "$ICON_ICNS" ]; then
        cp "$ICON_ICNS" "$APP_DIR/Contents/Resources/plutus-icon.icns"
    fi
    echo "       Launcher created: ~/Applications/Plutus.app"
else
    # ── Linux: create a .desktop shortcut ──
    DESKTOP_DIR="$HOME/.local/share/applications"
    mkdir -p "$DESKTOP_DIR"
    cat > "$DESKTOP_DIR/plutus.desktop" << DESKTOP_EOF
[Desktop Entry]
Name=Plutus
Comment=AI Assistant
Exec=bash $LAUNCHER
Icon=$ICON_PNG
Terminal=false
Type=Application
Categories=Utility;
DESKTOP_EOF
    chmod +x "$DESKTOP_DIR/plutus.desktop"
    echo "       Launcher created: ~/.local/share/applications/plutus.desktop"
fi

# ── Step 4: Launch Plutus ─────────────────────────────────

echo "[4/4] Starting Plutus..."
echo ""

bash "$LAUNCHER"

echo ""
echo "  ✓  Plutus is running at http://localhost:7777"
echo ""
echo "  To start Plutus in the future:"
if [ "$OS" = "Darwin" ]; then
    echo "    • Double-click Plutus in ~/Applications"
else
    echo "    • Search for 'Plutus' in your app launcher"
fi
echo "    • Or run: plutus start"
echo ""
