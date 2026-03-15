# Plutus Installer for Windows
# Usage: iwr -useb https://useplutus.ai/install.ps1 | iex
# (The -useb flag is short for -UseBasicParsing, which avoids the security warning prompt)
#
# What this script does:
#   1. Checks if Python 3.11+ is installed (installs via winget if not)
#   2. Installs Plutus via pip
#   3. Creates Desktop & Start Menu shortcuts for easy launching
#   4. Launches Plutus in the background and opens the browser
#
# WSL is NOT installed by this script. Plutus will walk you through
# setting up WSL from inside the app if you want Linux superpowers.

function Exit-WithPause($code) {
    Write-Host ""
    Write-Host "  Press Enter to close this window..." -ForegroundColor DarkGray
    $null = Read-Host
    exit $code
}

Write-Host ""
Write-Host "  ____  _       _             " -ForegroundColor Magenta
Write-Host " |  _ \| |_   _| |_ _   _ ___ " -ForegroundColor Magenta
Write-Host " | |_) | | | | | __| | | / __|" -ForegroundColor Magenta
Write-Host " |  __/| | |_| | |_| |_| \__ \" -ForegroundColor Magenta
Write-Host " |_|   |_|\__,_|\__|\__,_|___/" -ForegroundColor Magenta
Write-Host ""
Write-Host "  Plutus Installer" -ForegroundColor White
Write-Host "  ─────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# ── Step 1: Check Python ──────────────────────────────────

function Get-PythonCommand {
    # Try python first, then python3
    foreach ($cmd in @("python", "python3")) {
        try {
            $version = & $cmd --version 2>&1
            if ($version -match "Python (\d+)\.(\d+)") {
                $major = [int]$Matches[1]
                $minor = [int]$Matches[2]
                if ($major -ge 3 -and $minor -ge 11) {
                    return $cmd
                }
            }
        } catch {
            continue
        }
    }
    return $null
}

$pythonCmd = Get-PythonCommand

if (-not $pythonCmd) {
    Write-Host "[1/4] Python 3.11+ not found. Installing..." -ForegroundColor Yellow

    # Check if winget is available
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "       Using winget to install Python 3.11..." -ForegroundColor DarkGray
        winget install Python.Python.3.11 --accept-package-agreements --accept-source-agreements

        # Give the installer a moment to finalize registry/PATH changes
        Start-Sleep -Seconds 3

        # Refresh PATH from registry so this session sees the new install
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + `
                     [System.Environment]::GetEnvironmentVariable("Path", "User")

        $pythonCmd = Get-PythonCommand

        # Fallback: probe common install directories if PATH refresh didn't work
        if (-not $pythonCmd) {
            $probePaths = @(
                "$env:LOCALAPPDATA\Programs\Python\Python311",
                "$env:LOCALAPPDATA\Programs\Python\Python312",
                "$env:LOCALAPPDATA\Programs\Python\Python313",
                "C:\Python311",
                "C:\Python312",
                "C:\Python313"
            )
            foreach ($dir in $probePaths) {
                $probe = Join-Path $dir "python.exe"
                if (Test-Path $probe) {
                    try {
                        $version = & $probe --version 2>&1
                        if ($version -match "Python (\d+)\.(\d+)") {
                            $major = [int]$Matches[1]; $minor = [int]$Matches[2]
                            if ($major -ge 3 -and $minor -ge 11) {
                                # Add to user PATH permanently so it works after install too
                                $userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
                                if ($userPath -notlike "*$dir*") {
                                    [System.Environment]::SetEnvironmentVariable("Path", "$userPath;$dir", "User")
                                }
                                $env:Path = "$env:Path;$dir"
                                $pythonCmd = $probe
                                break
                            }
                        }
                    } catch { continue }
                }
            }
        }

        if (-not $pythonCmd) {
            Write-Host ""
            Write-Host "[ERROR] Python was installed but could not be found." -ForegroundColor Red
            Write-Host "        Close this terminal, open a new one, and run this installer again." -ForegroundColor Yellow
            Exit-WithPause 1
        }
        Write-Host "       Python installed successfully." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "[ERROR] Python 3.11+ is required but not installed." -ForegroundColor Red
        Write-Host "        Install it from https://www.python.org/downloads/" -ForegroundColor Yellow
        Write-Host "        Make sure to check 'Add Python to PATH' during install." -ForegroundColor Yellow
        Exit-WithPause 1
    }
} else {
    $pyVer = & $pythonCmd --version 2>&1
    Write-Host "[1/4] $pyVer found." -ForegroundColor Green
}

# ── Step 2: Install Plutus ────────────────────────────────

Write-Host "[2/4] Installing Plutus..." -ForegroundColor Cyan

$frames = @('|', '/', '-', '\')

# ── Upgrade pip (with spinner) ──
$pipUpgradeJob = Start-Job -ScriptBlock {
    param($py)
    & $py -m pip install --upgrade pip 2>&1 | Out-Null
    $LASTEXITCODE
} -ArgumentList $pythonCmd

$frameIdx = 0
Write-Host "`r       Updating pip... " -NoNewline -ForegroundColor DarkGray
while ($pipUpgradeJob.State -eq 'Running') {
    Write-Host "`r       Updating pip... $($frames[$frameIdx])" -NoNewline -ForegroundColor DarkGray
    $frameIdx = ($frameIdx + 1) % $frames.Count
    Start-Sleep -Milliseconds 120
}
Receive-Job -Job $pipUpgradeJob | Out-Null
Remove-Job -Job $pipUpgradeJob -Force
Write-Host "`r       Updating pip... done.  " -ForegroundColor DarkGray

# ── Install plutus-ai (with spinner) ──
$pipInstallJob = Start-Job -ScriptBlock {
    param($py)
    $output = & $py -m pip install --upgrade "plutus-ai[all]" 2>&1
    $LASTEXITCODE
} -ArgumentList $pythonCmd

$frameIdx = 0
Write-Host "`r       Downloading and installing packages... " -NoNewline -ForegroundColor DarkGray
while ($pipInstallJob.State -eq 'Running') {
    Write-Host "`r       Downloading and installing packages... $($frames[$frameIdx])" -NoNewline -ForegroundColor DarkGray
    $frameIdx = ($frameIdx + 1) % $frames.Count
    Start-Sleep -Milliseconds 120
}
$pipResult = Receive-Job -Job $pipInstallJob
Remove-Job -Job $pipInstallJob -Force
Write-Host "`r       Downloading and installing packages... done.  " -ForegroundColor DarkGray

try {
    if ($pipResult -ne 0) {
        # If upgrade failed (e.g. missing RECORD file), force-reinstall just plutus, then install deps
        Write-Host "       Retrying with --force-reinstall..." -ForegroundColor Yellow

        $retryJob1 = Start-Job -ScriptBlock {
            param($py)
            & $py -m pip install --force-reinstall --no-deps plutus-ai 2>&1 | Out-Null
            $LASTEXITCODE
        } -ArgumentList $pythonCmd

        $frameIdx = 0
        Write-Host "`r       Reinstalling Plutus... " -NoNewline -ForegroundColor DarkGray
        while ($retryJob1.State -eq 'Running') {
            Write-Host "`r       Reinstalling Plutus... $($frames[$frameIdx])" -NoNewline -ForegroundColor DarkGray
            $frameIdx = ($frameIdx + 1) % $frames.Count
            Start-Sleep -Milliseconds 120
        }
        Receive-Job -Job $retryJob1 | Out-Null
        Remove-Job -Job $retryJob1 -Force
        Write-Host "`r       Reinstalling Plutus... done.  " -ForegroundColor DarkGray

        $retryJob2 = Start-Job -ScriptBlock {
            param($py)
            $output = & $py -m pip install "plutus-ai[all]" 2>&1
            if ($LASTEXITCODE -ne 0) {
                throw "pip install failed: $output"
            }
            $LASTEXITCODE
        } -ArgumentList $pythonCmd

        $frameIdx = 0
        Write-Host "`r       Installing dependencies... " -NoNewline -ForegroundColor DarkGray
        while ($retryJob2.State -eq 'Running') {
            Write-Host "`r       Installing dependencies... $($frames[$frameIdx])" -NoNewline -ForegroundColor DarkGray
            $frameIdx = ($frameIdx + 1) % $frames.Count
            Start-Sleep -Milliseconds 120
        }
        $retryResult = Receive-Job -Job $retryJob2 -ErrorAction Stop
        Remove-Job -Job $retryJob2 -Force
        Write-Host "`r       Installing dependencies... done.  " -ForegroundColor DarkGray
    }
    Write-Host "       Plutus installed successfully." -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "[ERROR] Failed to install Plutus." -ForegroundColor Red
    Write-Host "        $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "        Try running manually: $pythonCmd -m pip install --force-reinstall plutus-ai[all]" -ForegroundColor Yellow
    Exit-WithPause 1
}

# Ensure Python Scripts directory is on the user's PATH (so 'plutus' command works)
$scriptsDir = & $pythonCmd -c "import sysconfig; print(sysconfig.get_path('scripts'))" 2>&1
if ($scriptsDir -and (Test-Path $scriptsDir)) {
    $userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    if ($userPath -notlike "*$scriptsDir*") {
        Write-Host "       Adding Python Scripts to PATH..." -ForegroundColor DarkGray
        [System.Environment]::SetEnvironmentVariable("Path", "$userPath;$scriptsDir", "User")
    }
}

# Refresh PATH so the plutus command is available in this session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + `
             [System.Environment]::GetEnvironmentVariable("Path", "User")

# ── Step 3: Create Shortcuts ─────────────────────────────

Write-Host "[3/4] Creating shortcuts..." -ForegroundColor Cyan

$plutusDir = "$env:USERPROFILE\.plutus"
if (-not (Test-Path $plutusDir)) {
    $null = New-Item -ItemType Directory -Path $plutusDir -Force
}

# Create the workspace directory — Plutus uses this as its default
# working directory for projects, code, downloads, and generated files.
$workspaceDir = "$env:USERPROFILE\plutus-workspace"
if (-not (Test-Path $workspaceDir)) {
    $null = New-Item -ItemType Directory -Path $workspaceDir -Force
    Write-Host "       Workspace created at $workspaceDir" -ForegroundColor Green
}

# Get the full path to the Python executable (so shortcuts work from any context)
$pythonFullPath = (Get-Command $pythonCmd).Source

# Create launcher VBS script.
# This runs Plutus without a visible console window.
# If Plutus is already running, it just opens the browser instead.
#
# NOTE: --no-browser is passed to `plutus start` because this VBS launcher
# handles opening the browser itself, preventing a duplicate tab.
$vbsPath = "$plutusDir\start.vbs"
$vbsContent = @"
' Plutus Launcher
' Double-click to start Plutus or open it in your browser.

Set WshShell = CreateObject("WScript.Shell")

' Check if Plutus is already running
alreadyRunning = False
On Error Resume Next
Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "http://localhost:7777/api/config", False
http.Send
If Err.Number = 0 Then
    If http.Status = 200 Then alreadyRunning = True
End If
On Error GoTo 0

If alreadyRunning Then
    ' Already running - just open the browser
    WshShell.Run "http://localhost:7777"
Else
    ' Start Plutus in the background (hidden console window)
    ' --no-browser: we open the browser ourselves below to avoid duplicate tabs
    WshShell.Run """$pythonFullPath"" -m plutus start --no-browser", 0, False

    ' Wait a moment, then open the browser
    WScript.Sleep 2000
    WshShell.Run "http://localhost:7777"
End If
"@
Set-Content -Path $vbsPath -Value $vbsContent -Encoding ASCII

# Create Desktop shortcut
$shortcutCreated = $false
try {
    $WshShell = New-Object -ComObject WScript.Shell

    # Desktop shortcut
    $desktopPath = [System.Environment]::GetFolderPath("Desktop")
    $shortcut = $WshShell.CreateShortcut("$desktopPath\Plutus.lnk")
    $shortcut.TargetPath = "wscript.exe"
    $shortcut.Arguments = "`"$vbsPath`""
    $shortcut.Description = "Launch Plutus AI Agent"
    $shortcut.WorkingDirectory = $plutusDir
    $shortcut.Save()

    # Start Menu shortcut
    $startMenuPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs"
    $startShortcut = $WshShell.CreateShortcut("$startMenuPath\Plutus.lnk")
    $startShortcut.TargetPath = "wscript.exe"
    $startShortcut.Arguments = "`"$vbsPath`""
    $startShortcut.Description = "Launch Plutus AI Agent"
    $startShortcut.WorkingDirectory = $plutusDir
    $startShortcut.Save()

    $shortcutCreated = $true
    Write-Host "       Desktop shortcut created." -ForegroundColor Green
    Write-Host "       Start Menu shortcut created." -ForegroundColor Green
} catch {
    Write-Host "       Could not create shortcuts (non-critical)." -ForegroundColor Yellow
    Write-Host "       You can always start Plutus by running: plutus start" -ForegroundColor DarkGray
}

# ── Step 4: Launch ────────────────────────────────────────

Write-Host "[4/4] Launching Plutus..." -ForegroundColor Cyan
Write-Host ""
Write-Host "  ─────────────────────────────" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Plutus is starting in the background..." -ForegroundColor White
Write-Host "  Your browser will open to http://localhost:7777" -ForegroundColor White
Write-Host "  First time? The setup wizard will guide you through everything." -ForegroundColor DarkGray
Write-Host ""

if ($shortcutCreated) {
    Write-Host "  To start Plutus anytime:" -ForegroundColor White
    Write-Host "    - Double-click 'Plutus' on your Desktop" -ForegroundColor DarkGray
    Write-Host "    - Or search 'Plutus' in the Start Menu" -ForegroundColor DarkGray
} else {
    Write-Host "  To start Plutus anytime, run:" -ForegroundColor White
    Write-Host "    plutus start" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "  Tip: After setup, go to Settings to enable Linux Superpowers (WSL)." -ForegroundColor DarkGray
Write-Host "  ─────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# Launch Plutus - try VBS launcher first, fall back to direct start
# The VBS launcher handles opening the browser, so we don't open it here.
$launched = $false

# Try the VBS launcher (hidden console window)
if (Test-Path $vbsPath) {
    Start-Process "wscript.exe" -ArgumentList "`"$vbsPath`""

    # Wait a few seconds and check if Plutus is actually running
    Start-Sleep -Seconds 4
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:7777/api/config" -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
        if ($response.StatusCode -eq 200) { $launched = $true }
    } catch {}
}

# Fallback: launch directly if VBS didn't work
if (-not $launched) {
    Write-Host "       Starting Plutus directly..." -ForegroundColor DarkGray
    Start-Process -FilePath $pythonFullPath -ArgumentList "-m plutus start" -WindowStyle Hidden

    Start-Sleep -Seconds 4
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:7777/api/config" -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
        if ($response.StatusCode -eq 200) { $launched = $true }
    } catch {}
}

if ($launched) {
    # VBS launcher already opened the browser; only open here if we used the
    # direct fallback (which doesn't have the VBS browser-open logic).
    Write-Host "  Plutus is running at http://localhost:7777" -ForegroundColor Green
} else {
    Write-Host "  Plutus may take a moment to start..." -ForegroundColor Yellow
    Write-Host "  If your browser doesn't open, visit http://localhost:7777" -ForegroundColor Yellow
    Start-Process "http://localhost:7777"
}
