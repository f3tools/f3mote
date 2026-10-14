# Using the Workspace

A tour of the f3mote Workspace on desktop and phone: how sessions, tabs and workspaces are organized, and how to work from the bottom input bar.

## Layout at a Glance

### Desktop

- **Left sidebar** - Groups of workspaces (for example one per project). Each workspace lists its sessions, such as `Claude 1`, `Claude 2`, `Claude 3`. A green dot means the session is running. **Add workspace** creates a new group. **History** lists earlier sessions, and **Settings** is at the bottom.
- **Tab bar** - One tab per terminal session. Use **+** to open a new session in the current workspace.
- **Pane area** - Terminal panes, shown side by side when you open several sessions. Each pane has its own input line at the bottom.
- **Top-right icons** - Remote desktop, site browser, notifications (with a count when something needs attention) and a toggle for the side panel.
- **Status bar** - The active session, its working directory, the git branch, and the connection state (for example `WS` for a local connection).

### Phone

- **Tab strip** - Sessions across the top, with a back arrow and a **+** button. The gear icon opens Settings.
- **Header row** - The active session name, with shortcuts to the remote desktop and site browser.
- **Floating buttons** - A refresh button (reconnect) and a folder button (file explorer) sit on the right edge of the terminal.
- **Special keys** - A bar above the keyboard with `Esc`, arrow keys, `Ctrl`, `Opt`, `Shift`, `Tab` and `/`. Use it for keys a phone keyboard doesn't have.
- **Input bar** - A message box with attach, command history and microphone buttons, and a send button.

## Working With Sessions

1. Pick a workspace in the sidebar (desktop) or the tab strip (phone).
2. Open a new session with **+**. Start your agent or shell in it, for example `claude`.
3. To switch sessions on desktop, click the tab or use the keyboard shortcut shown in the input bar: `Opt` with the left or right arrow, or `Opt` with `1` to `9` to jump to a tab.
4. Close the app or lock your phone freely. Sessions keep running on the host (see [Background Services & Daemon](guides/services)).

## Sending Commands

- Type in the input bar and press the send button (or Enter) to run the line.
- Use the history button to reuse an earlier command.
- Use the attach button to send a file to the session.
- Use the microphone button to dictate a command or prompt.
- Use the special keys bar for interactive programs: `Esc` to cancel a prompt, `Ctrl` + a letter for control keys, arrow keys to move through a menu.

## Using Several Agents At Once

Run one agent per session. A typical layout is three sessions in one workspace, each on a different branch or task, with all three panes visible on desktop. On the phone, switch between them from the tab strip. The active session's status shows in the header row.

## Remote Desktop and Site Browser

- **Remote desktop** - The monitor icon opens a live view of your computer's screen. See [Remote Desktop](features/remote-desktop).
- **Site browser** - The globe icon opens local dev servers, for example `localhost:3000`, on your phone. See [Site Browser](features/site-browser).

## Files

The folder icon opens the file explorer for the session's working directory. You can browse, upload and download files there. See [File Explorer](features/file-explorer).

## Tips

- Keep one workspace per project so each project's sessions stay together.
- Use the status bar's git branch to confirm which worktree a session is in before running changes.
- If a session looks stuck after a network drop, use the refresh button on the phone or click the tab on desktop to reattach.
- For faster navigation on desktop, learn the `Opt` shortcuts shown in the input bar.

## Next Steps

- [Terminal](features/terminal) - Session persistence and Git worktree support
- [Advanced AI Workflow](guides/ai-workflow) - A full mobile coding loop with agents
- [Troubleshooting](troubleshooting) - Common connection and session problems
