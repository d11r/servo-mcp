const features = [
  {
    title: "See Your Screen",
    description:
      "Take screenshots of your entire screen or specific windows to let AI understand what you're working on.",
  },
  {
    title: "Click & Type",
    description:
      "Click buttons, type text, and press keyboard shortcuts. Let AI interact with any application.",
  },
  {
    title: "Control Apps",
    description:
      "Launch applications, switch windows, and navigate your desktop programmatically.",
  },
  {
    title: "Verify Work",
    description:
      "Let AI agents confirm their changes worked correctly by seeing the results on screen.",
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
          Everything you need
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted">
          Servo gives AI agents complete visibility and control over your
          desktop environment.
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
