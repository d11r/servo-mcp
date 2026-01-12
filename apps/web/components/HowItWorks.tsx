const steps = [
  {
    step: "1",
    title: "Download Servo",
    description: "Get the app for macOS or Windows. It's free and open source.",
  },
  {
    step: "2",
    title: "Grant Permissions",
    description:
      "Allow screen recording and accessibility access when prompted.",
  },
  {
    step: "3",
    title: "Add to Claude",
    description:
      "Configure Claude Code to use Servo as an MCP server. That's it.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 pt-10 pb-16">
      <div className="mx-auto max-w-5xl">
        {/* Divider */}
        <div className="mx-auto mb-6 h-px w-24 bg-foreground/10" />

        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Get started in minutes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted">
          Three simple steps to let Claude Code verify its changes on your
          actual desktop.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
