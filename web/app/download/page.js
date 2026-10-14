import DownloadsPage from "@/features/landing/components/DownloadsPage";

export const metadata = {
  title: "Download f3mote - macOS & Windows",
  description: "Download the f3mote host app for macOS (.dmg) and Windows (.exe, installer or portable). Every version, direct from GitHub releases."
};

export default function DownloadRoute() {
  return <DownloadsPage />;
}
