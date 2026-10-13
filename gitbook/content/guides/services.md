# Background Services & Daemon

Keep f3mote running 24/7 as an unattended background service on Linux, macOS, and cloud servers.

## Overview

When using f3mote for remote development or server management, you typically want the host running permanently in the background, starting automatically on boot and recovering from crashes without keeping a terminal open.

---

## 1. Linux: systemd (Recommended for Servers & VPS)

For Ubuntu, Debian, CentOS, Fedora, Arch, and most modern Linux distributions, `systemd` is the cleanest and most robust approach.

### Step 1: Create the systemd Service File
Create a new service file at `/etc/systemd/system/f3mote.service`:

```ini
[Unit]
Description=f3mote Host Service
After=network.target

[Service]
Type=simple
User=YOUR_USERNAME
Environment=PATH=/usr/local/bin:/usr/bin:/bin:/home/YOUR_USERNAME/.nvm/versions/node/$(node -v)/bin
WorkingDirectory=/home/YOUR_USERNAME
ExecStart=/usr/bin/env f3mote start
Restart=always
RestartSec=5

# Optional: ensure file descriptors and processes for PTY
LimitNOFILE=65536
LimitNPROC=4096

[Install]
WantedBy=multi-user.target
```

> **Tip:** Replace `YOUR_USERNAME` with your actual Linux username. Run `which f3mote` to ensure the path matches your Node.js global binaries.

### Step 2: Enable & Start the Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable f3mote
sudo systemctl start f3mote
```

### Step 3: Check Status & Retrieve Your Key
```bash
sudo systemctl status f3mote

# View logs to get your QR code or access key:
journalctl -u f3mote -f -n 50

# Or query directly using the headless CLI:
f3mote key
```

---

## 2. macOS: launchd (LaunchAgent)

On macOS, running f3mote as a user `LaunchAgent` allows it to start automatically when you log into your Mac and maintain access to screen recording and terminal permissions.

### Step 1: Create the Plist File
Create `~/Library/LaunchAgents/cc.f3mote.agent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>cc.f3mote.agent</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/sh</string>
        <string>-c</string>
        <string>source ~/.zshrc; f3mote start</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/f3mote.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/f3mote.err</string>
</dict>
</plist>
```

### Step 2: Load the Service
```bash
launchctl load ~/Library/LaunchAgents/cc.f3mote.agent.plist
```

To stop or unload:
```bash
launchctl unload ~/Library/LaunchAgents/cc.f3mote.agent.plist
```

---

## 3. Cross-Platform: PM2 Process Manager

If you already use `pm2` for Node.js microservices:

```bash
# Start f3mote in headless start mode
pm2 start "f3mote start" --name "f3mote"

# Save configuration for automatic system boot
pm2 save
pm2 startup
```

Monitor logs with:
```bash
pm2 logs f3mote
```

---

## 4. Headless Server Maintenance

Once f3mote is running as a service, manage it from your terminal using headless commands:

```bash
# View current access key and URL
f3mote key

# View approved and pending devices
f3mote devices

# Automatically approve all incoming devices using your key
f3mote auto-approve on

# Create a temporary one-time connection key
f3mote otk
```

---

## Next Steps

- Set up an [Advanced AI Workflow](ai-workflow)
- Learn how to [Self-Host f3mote Backend](self-hosting)
