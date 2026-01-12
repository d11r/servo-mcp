const features = [
  {
    title: "See Your Screen",
    description:
      "Provides screenshot tools so AI can see your entire desktop or specific windows.",
  },
  {
    title: "Click & Type",
    description:
      "Enables mouse clicks, text input, and keyboard shortcuts in any desktop application on macOS or Windows.",
  },
  {
    title: "Control Apps",
    description:
      "Tools to launch desktop applications, switch windows, and navigate your system programmatically.",
  },
  {
    title: "Verify Work",
    description:
      "Gives AI agents the ability to confirm their changes worked by seeing actual results on your desktop.",
  },
  {
    title: "100% Local",
    description:
      "Runs entirely on your machine. No cloud, no data sharing, no third-party servers.",
  },
  {
    title: "Open Source",
    description:
      "MIT licensed. Audit the code, contribute improvements, or fork it for your needs.",
  },
];

export function Features() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Tools for verification
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted">
          Servo provides MCP tools that give AI agents the ability to see and interact with
          your desktop, so they can verify their work actually works.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-foreground/10 p-5"
            >
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
