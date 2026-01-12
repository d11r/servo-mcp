export function UseCase() {
  return (
    <section className="px-6 py-16 bg-foreground/[0.02]">
      <div className="mx-auto max-w-3xl">
        {/* MCP Explainer */}
        <div className="mb-16 rounded-xl border border-foreground/10 bg-background p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What is MCP?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            <span className="text-foreground font-medium">Model Context Protocol (MCP)</span> is an open standard that lets AI assistants connect to external tools.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted">
            Servo is an MCP server that provides desktop automation tools. Claude Code connects to it and gains the ability to see your screen and interact with your apps.
          </p>
        </div>

        {/* Use Case */}
        <h3 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
          Built for verification
        </h3>
        <div className="mt-6 rounded-xl border border-foreground/10 bg-background p-6">
          <p className="text-base leading-relaxed text-muted">
            <span className="text-foreground font-medium">&ldquo;Add a dark mode toggle to the preferences window.&rdquo;</span>
            {" "}Claude Code writes the code, but how does it know the toggle actually works?
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Servo provides tools that let Claude launch your app, take a screenshot, click the toggle,
            take another screenshot, and confirm dark mode is working. If something looks off, it can iterate
            until it&apos;s right.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            No more &ldquo;I made the change, please build and verify manually.&rdquo;
            {" "}<span className="text-foreground font-medium">Claude can verify its own work using your actual desktop.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
