export function UseCase() {
  return (
    <section className="px-6 py-16 bg-foreground/[0.02]">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Built for verification
        </h2>
        <div className="mt-8 rounded-xl border border-foreground/10 bg-background p-6">
          <p className="text-base leading-relaxed text-muted">
            <span className="text-foreground font-medium">&ldquo;Fix the button alignment on the settings page.&rdquo;</span>
            {" "}Claude Code edits your CSS, but how does it know the fix actually worked?
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            With Servo, Claude takes a screenshot after the change, sees the result,
            and confirms the button is now aligned. If something looks off, it iterates
            until it&apos;s right.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            No more &ldquo;I made the change, please verify manually.&rdquo;
            {" "}<span className="text-foreground font-medium">Claude verifies its own work.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
