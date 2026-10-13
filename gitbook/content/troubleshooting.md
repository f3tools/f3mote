# Troubleshooting

Common issues and solutions when setting up and using f3mote.

## 1. Installation Issues

**Problem:** `npm install -g f3mote` fails with permission or engine errors.

**Solutions:**
- **Node.js version:** Check your version with `node -v`. f3mote requires **Node.js 18 or higher**.
- **Permission errors (macOS/Linux):**
  ```bash
  sudo npm install -g f3mote
  ```
  Or better, configure an npm prefix without sudo or use `nvm`:
  ```bash
  nvm install 20
  nvm use 20
  npm install -g f3mote
  ```

---

## 2. Server Startup & Headless Environments

**Problem:** Server crashes or cannot open interactive menu.

**Solutions:**
- **Running over SSH / No TTY:**
  If you are connected to a remote server over SSH without an interactive TTY, running `f3mote` will show help text instead of the interactive menu. Use headless mode instead:
  ```bash
  f3mote start
  ```
- **Port 2208 already in use:**
  Another f3mote instance or process is using port 2208.
  ```bash
  # macOS/Linux: Kill process on port 2208
  lsof -ti:2208 | xargs kill -9
  
  # Windows (Command Prompt):
  netstat -ano | findstr :2208
  taskkill /PID <PID> /F
  
  # Then start again:
  f3mote start
  ```

---

## 3. Connection & "Waiting for Approval"

**Problem:** You entered the key or scanned the QR code, but the browser is stuck waiting or says invalid key.

**Solutions:**
- **Device Pending Approval (Security Feature):**
  When connecting a new phone or browser, f3mote requires host approval for security.
  - If you have access to the host screen: click **Approve** on the host notification.
  - If running headless/SSH on the host, run:
    ```bash
    f3mote devices
    f3mote approve <socketId>
    ```
  - To automatically accept all devices using your key in the future:
    ```bash
    f3mote auto-approve on
    ```
- **One-Time Key (OTK) Expired:**
  OTK keys are valid for 30 minutes. If expired, generate a fresh one:
  ```bash
  f3mote otk
  ```
- **Key Mismatch:** Check or regenerate your permanent key:
  ```bash
  f3mote key
  f3mote key --new  # Regenerate if needed
  ```

---

## 4. Terminal & Process Persistence

**Problem:** Terminal disconnects or browser refreshes.

**Behavior & Solution:**
- f3mote uses a persistent background PTY daemon (`ptyDaemon`). When your browser or mobile connection drops, your running processes (Docker builds, servers, Vim, tests) **do not die**.
- Simply refresh or reopen `https://relay.example.com` and tap into your terminal session; it will reattach immediately to the running shell.

---

## 5. Network Latency & WebRTC Fallback

**Problem:** Remote Desktop or Terminal feels slow or laggy.

**Solutions:**
- **Transport Modes:** f3mote automatically negotiates WebRTC for direct, low-latency streaming. If strict firewalls block WebRTC UDP ports, it automatically falls back to secure WebSocket over Cloudflare tunnel.
- **Remote Desktop Quality:** In the Remote Desktop settings bar, switch quality to **Performance** or **Balanced** to reduce bandwidth consumption on cellular connections.

---

## 6. Logs & Diagnostics

- **View Host Logs:**
  - Web UI: In web workspace → view "Pair Device" → section Logs.
  - File: Look for `agent.log` in your f3mote installation or working directory (or `~/.f3mote/logs/agent.log`).
- **Check Server Status:**
  ```bash
  f3mote devices    # Verifies server is active and responding to API calls
  ```

---

## Summary of Quick Commands

| Task | Command |
|---|---|
| Start server in background/headless | `f3mote start` |
| View current key and connect URL | `f3mote key` |
| Generate new 30-min one-time key | `f3mote otk` |
| List approved & pending devices | `f3mote devices` |
| Turn on automatic device approval | `f3mote auto-approve on` |
| Approve a pending device connection | `f3mote approve <socketId>` |
