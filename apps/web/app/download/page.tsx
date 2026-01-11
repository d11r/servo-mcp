import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Download Servo",
  description:
    "Download Servo for macOS or Windows. Give AI the ability to see and control your desktop.",
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Download Servo
          </h1>
          <p className="mt-4 text-base text-muted">
            Choose your platform to get started. Servo is free and open source.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              disabled
              className="inline-flex h-12 w-56 cursor-not-allowed items-center justify-center rounded-lg bg-accent/50 px-6 text-sm font-medium text-white"
            >
              <span className="flex flex-col items-start">
                <span className="text-xs opacity-80">Download for</span>
                <span>macOS (Apple Silicon)</span>
              </span>
            </button>
            <button
              disabled
              className="inline-flex h-12 w-56 cursor-not-allowed items-center justify-center rounded-lg bg-accent/50 px-6 text-sm font-medium text-white"
            >
              <span className="flex flex-col items-start">
                <span className="text-xs opacity-80">Download for</span>
                <span>macOS (Intel)</span>
              </span>
            </button>
          </div>
          <div className="mt-3">
            <button
              disabled
              className="inline-flex h-12 w-56 cursor-not-allowed items-center justify-center rounded-lg border border-foreground/20 px-6 text-sm font-medium opacity-50"
            >
              <span className="flex flex-col items-start">
                <span className="text-xs opacity-80">Download for</span>
                <span>Windows</span>
              </span>
            </button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Downloads coming soon. Star the repository on GitHub to get notified
            when releases are available.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
