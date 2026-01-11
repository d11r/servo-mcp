import { GITHUB_URL } from "@servo/shared";

export function OpenSource() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Free, Open Source, and Private
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
          Servo runs entirely on your machine. No telemetry, no cloud services,
          no data collection. Your screen stays yours. The code is open source
          under the MIT license.
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          View source on GitHub
        </a>
      </div>
    </section>
  );
}
