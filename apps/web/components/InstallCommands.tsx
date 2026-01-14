"use client";

import { useState, useEffect } from "react";

type Platform = "macos" | "windows" | null;

function detectOS(): Platform {
  if (typeof window === "undefined") return null;

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || "";

  if (ua.includes("win") || platform.includes("win")) {
    return "windows";
  }
  if (ua.includes("mac") || platform.includes("mac")) {
    return "macos";
  }
  return null;
}

function CopyButton({
  text,
  copied,
  onCopy,
}: {
  text: string;
  copied: boolean;
  onCopy: () => void;
}) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    onCopy();
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 flex-shrink-0 text-slate-400 hover:text-white transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-400"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

const MAC_COMMAND = "curl -fsSL https://getservo.app/install.sh | bash";
const WIN_COMMAND = "irm https://getservo.app/install.ps1 | iex";

export function InstallCommands() {
  const [detectedOS, setDetectedOS] = useState<Platform>(null);
  const [copiedMac, setCopiedMac] = useState(false);
  const [copiedWin, setCopiedWin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDetectedOS(detectOS());
  }, []);

  const handleCopyMac = () => {
    setCopiedMac(true);
    setTimeout(() => setCopiedMac(false), 2000);
  };

  const handleCopyWin = () => {
    setCopiedWin(true);
    setTimeout(() => setCopiedWin(false), 2000);
  };

  // Order commands based on detected platform
  const showMacFirst = !mounted || detectedOS !== "windows";

  const macCommand = (
    <div className="text-left" key="mac">
      <p className="text-sm text-muted mb-2">
        macOS (Terminal)
        {mounted && detectedOS === "macos" && (
          <span className="ml-2 text-xs text-green-400">Detected</span>
        )}
      </p>
      <div className="flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3 font-mono text-sm">
        <code className="text-green-400 overflow-x-auto whitespace-nowrap">
          {MAC_COMMAND}
        </code>
        <CopyButton text={MAC_COMMAND} copied={copiedMac} onCopy={handleCopyMac} />
      </div>
    </div>
  );

  const winCommand = (
    <div className="text-left" key="win">
      <p className="text-sm text-muted mb-2">
        Windows (PowerShell)
        {mounted && detectedOS === "windows" && (
          <span className="ml-2 text-xs text-green-400">Detected</span>
        )}
      </p>
      <div className="flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3 font-mono text-sm">
        <code className="text-green-400 overflow-x-auto whitespace-nowrap">
          {WIN_COMMAND}
        </code>
        <CopyButton text={WIN_COMMAND} copied={copiedWin} onCopy={handleCopyWin} />
      </div>
    </div>
  );

  return (
    <div className="space-y-4 w-full max-w-xl mx-auto">
      {showMacFirst ? (
        <>
          {macCommand}
          {winCommand}
        </>
      ) : (
        <>
          {winCommand}
          {macCommand}
        </>
      )}
    </div>
  );
}
