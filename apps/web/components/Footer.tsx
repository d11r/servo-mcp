import Link from "next/link";
import { GITHUB_URL, AUTHOR, AUTHOR_GITHUB } from "@servo/shared";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight"
            >
              Servo
            </Link>
            <nav className="flex items-center gap-3 text-sm text-muted">
              <Link
                href="/download"
                className="transition-colors hover:text-foreground"
              >
                Download
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </nav>
          </div>
          <div className="text-sm text-muted">
            Made by{" "}
            <a
              href="https://dragosstrugar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {AUTHOR}
            </a>
            {" "}(
            <a
              href={`https://github.com/${AUTHOR_GITHUB}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              @{AUTHOR_GITHUB}
            </a>
            ){" "}&middot; MIT License
          </div>
        </div>
      </div>
    </footer>
  );
}
