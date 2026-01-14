import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadButtons } from "@/components/DownloadButtons";
import { InstallCommands } from "@/components/InstallCommands";

export const metadata: Metadata = {
  title: "Install Servo",
  description:
    "Install Servo for macOS or Windows. Give AI the ability to see and control your desktop.",
};

const GITHUB_REPO = "d11r/getservo";

export default function DownloadPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Install Servo
          </h1>
          <p className="mt-4 text-base text-muted">
            One command to install. Works globally in Claude Code.
          </p>

          {/* One-liner install commands */}
          <div className="mt-8">
            <InstallCommands />
          </div>

          {/* Manual download section */}
          <div className="mt-10 pt-8 border-t border-foreground/10">
            <p className="text-sm text-muted mb-4">Or download manually:</p>
            <DownloadButtons />
            <p className="mt-4 text-xs text-muted">
              After manual download, run{" "}
              <code className="bg-foreground/10 px-1.5 py-0.5 rounded">
                Servo --setup
              </code>{" "}
              to configure Claude Code.
            </p>
          </div>

          <p className="mt-8 text-xs text-muted">
            <a
              href={`https://github.com/${GITHUB_REPO}/releases`}
              className="underline hover:text-foreground"
            >
              View all releases on GitHub
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
