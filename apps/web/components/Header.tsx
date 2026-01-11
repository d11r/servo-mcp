import Link from "next/link";
import { GITHUB_URL } from "@servo/shared";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Servo
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/download"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Download
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
