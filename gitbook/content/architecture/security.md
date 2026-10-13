# Security & Authentication

Learn how f3mote protects your computer with two-step device approval, path-jail boundaries, and zero open inbound ports.

## Core Security Principles

f3mote was built from the ground up to eliminate the security risks of traditional remote desktop (RDP) and SSH servers:

1. **Zero Open Inbound Ports:** No public IP, no firewall holes, no port forwarding.
2. **Two-Layer Device Approval:** A valid key alone is not enough; new devices must be approved on the host.
3. **Strict Path Jail (`pathGuard`):** File access is cryptographically and logically jailed to designated workspaces.
4. **End-to-End Transport Encryption:** All communications use WebRTC DTLS or TLS 1.3 tunnels.

---

## 1. Two-Step Authentication & Device Approval

Most remote tools rely solely on a password or API key. If that key leaks, your entire machine is exposed. f3mote prevents this with mandatory **Device Approval**:

```text
[ Connecting Device ]                      [ Host Machine (You) ]
         │                                            │
         ├─── Presents Permanent Access Key ─────────►│
         │                                            ▼
         │                                   [ Verify Device ID ]
         │                                            │
         │   Device in "Pending" State                ├── Unknown Device?
         │◄───────────────────────────────────────────┤   Hold connection
         │                                            │
         │                                            ▼
         │                                    [ User Approves ]
         │                                   (UI Popup / CLI Command)
         │                                            │
         │   Connection Established                   ▼
         │◄─────────────────────────────────── Approved! Device ID
         │                                     whitelisted in DB
```

### How to Approve Devices
- **Desktop / TUI Mode:** A notification appears on the host screen asking: *"Allow connection from Safari on iOS?"*
- **Headless Mode:** Check and approve devices via the CLI:
  ```bash
  f3mote devices               # View pending devices and socket IDs
  f3mote approve <socketId>    # Grant access to this device
  ```
- **Auto-Approve Toggle:** If you are running f3mote on a private VM or trusted environment and want keys to connect immediately:
  ```bash
  f3mote auto-approve on
  ```

---

## 2. One-Time Keys (OTK)

For connecting from temporary machines (a friend's laptop, a public computer, or sharing access with a coworker):

```bash
f3mote otk
```

- Generates an ephemeral access key and QR code.
- Automatically expires after **30 minutes** or after its first successful connection.
- Leaves your permanent master key safe and secret.

---

## 3. Path Jail Boundary (`pathGuard`)

The File Explorer, Code Editor, and File Transfer engines enforce strict jail boundaries on every filesystem request:

- **Directory Traversal Defense:** Prevents relative path manipulation (e.g., `../../../../etc/passwd` or `C:\Windows\System32`).
- **Symlink Traversal Check:** Symlinks pointing outside authorized workspace directories are rejected before file operations occur.
- **Root Security:** File write, edit, and execution privileges cannot escape configured workspace paths.

---

## 4. Zero Inbound Exposure

Traditional remote tools (SSH on port 22, VNC on port 5900, RDP on port 3389) are constantly targeted by botnets and automated scanners.

With f3mote:
- Your host machine makes an **outbound** encrypted connection to Cloudflare edge infrastructure.
- Zero inbound ports are open on your router or computer.
- Attackers scanning your IP address will find all ports closed.

---

## Best Security Practices

1. **Regenerate Master Key if Compromised:**
   ```bash
   f3mote key --new
   ```
2. **Review Approved Devices Regularly:**
   ```bash
   f3mote devices
   ```
3. **Use One-Time Keys on Untrusted Devices:** Never enter your permanent key on a shared or public computer.
4. **Enable Biometrics on Mobile:** Protect the f3mote mobile app with Face ID or fingerprint locking.

---

## Next Steps

- Set up [Background Services & Daemon](../guides/services)
- Explore [Advanced AI Workflow](../guides/ai-workflow)
