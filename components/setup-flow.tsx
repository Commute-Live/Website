"use client"

import { Section, SectionHeader } from "@/components/section"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "1",
    title: "Create your account",
    description:
      "Sign up in seconds. Your account keeps your display and presets connected.",
    screen: "signup",
  },
  {
    number: "2",
    title: "Power on your display",
    description:
      "Plug in CommuteLive and let it start searching for setup.",
    screen: "bootup",
  },
  {
    number: "3",
    title: "Connect via Bluetooth",
    description:
      "Use the app to find the device and securely pass Wi-Fi credentials.",
    screen: "bluetooth",
  },
  {
    number: "4",
    title: "Pick your stop",
    description:
      "Choose your city, line, stop, and direction in the app.",
    screen: "station",
  },
  {
    number: "5",
    title: "Watch it update live",
    description:
      "Real-time arrivals start flowing automatically once setup is complete.",
    screen: "live",
  },
]

function AppScreen({ screen }: { screen: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[180px]">
      <div className="relative rounded-[28px] bg-zinc-800 p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.35)]">
        <div className="aspect-[9/19] overflow-hidden rounded-[24px] bg-black">
          <div className="flex h-7 items-center justify-between px-4 text-[8px] text-muted-foreground">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-3 rounded-sm bg-muted-foreground/50" />
              <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            </div>
          </div>

          <div className="h-full p-3">
            {screen === "signup" && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/20">
                    <span className="text-lg font-bold text-cyan-300">CL</span>
                  </div>
                  <p className="text-[10px] font-semibold text-white">Welcome to CommuteLive</p>
                </div>
                <div className="space-y-2">
                  <div className="h-8 rounded-md bg-zinc-900" />
                  <div className="h-8 rounded-md bg-zinc-900" />
                  <div className="flex h-9 items-center justify-center rounded-md bg-cyan-300 text-[10px] font-medium text-black">
                    Sign Up
                  </div>
                </div>
              </div>
            )}

            {screen === "bootup" && (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-cyan-300 border-t-transparent" />
                <p className="text-[10px] text-muted-foreground">Searching for display...</p>
              </div>
            )}

            {screen === "bluetooth" && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold text-white">Connect Display</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/20">
                      <div className="h-3 w-3 rounded-full bg-cyan-300" />
                    </div>
                    <div>
                      <p className="text-[9px] font-medium text-white">CommuteLive-A3F2</p>
                      <p className="text-[8px] text-muted-foreground">Ready to connect</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-zinc-950 p-2.5 opacity-45">
                    <div className="h-8 w-8 rounded-lg bg-zinc-900" />
                    <div>
                      <p className="text-[9px] font-medium text-white">CommuteLive-B7E1</p>
                      <p className="text-[8px] text-muted-foreground">Out of range</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {screen === "station" && (
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold text-white">Select Station</p>
                <div className="flex h-8 items-center rounded-md bg-zinc-900 px-2 text-[8px] text-muted-foreground">
                  Search stations...
                </div>
                {[
                  { line: "A", name: "14th St", color: "bg-[#0039A6]" },
                  { line: "L", name: "1st Avenue", color: "bg-[#A7A9AC]" },
                  { line: "6", name: "33rd St", color: "bg-[#00933C]" },
                ].map((station) => (
                  <div key={station.name} className="flex items-center gap-2 rounded-md bg-zinc-950 p-2">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded text-[9px] font-bold text-white",
                        station.color,
                      )}
                    >
                      {station.line}
                    </span>
                    <span className="text-[9px] text-white">{station.name}</span>
                  </div>
                ))}
              </div>
            )}

            {screen === "live" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-white">Live View</p>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="rounded-xl border border-white/10 bg-zinc-950 p-3">
                  {[
                    { line: "A", time: "2 min" },
                    { line: "A", time: "8 min" },
                    { line: "C", time: "12 min" },
                  ].map((train, index) => (
                    <div key={index} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-[#304ECF] text-[9px] font-bold text-white">
                          {train.line}
                        </span>
                        <span className="text-[9px] text-white">Uptown</span>
                      </div>
                      <span className={cn("text-[9px] font-bold", index === 0 ? "text-cyan-300" : "text-muted-foreground")}>
                        {train.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute left-1/2 top-1.5 h-4 w-[72px] -translate-x-1/2 rounded-b-xl bg-zinc-900" />
      </div>
    </div>
  )
}

export function SetupFlow() {
  return (
    <Section id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          label="How It Works"
          title="Set up in minutes"
          description="Getting started with CommuteLive is simple. No technical expertise required."
        />

        <div className="hidden lg:block">
          <div className="mb-8 grid grid-cols-5 gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <AppScreen screen={step.screen} />
              </div>
            ))}
          </div>

          <div className="relative mb-6 flex items-center justify-between px-[90px]">
            <div className="absolute left-[90px] right-[90px] top-1/2 h-px bg-white/10" />
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-300 text-2xl font-bold text-black shadow-[0_0_26px_rgba(102,240,255,0.28)]"
              >
                {step.number}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4 text-center">
            {steps.map((step) => (
              <div key={step.number}>
                <h3 className="mb-2 text-[1.65rem] font-semibold text-white">{step.title}</h3>
                <p className="text-lg leading-8 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 lg:hidden">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300 text-lg font-bold text-black">
                  {step.number}
                </div>
                {index < steps.length - 1 && <div className="mt-2 min-h-[180px] w-px bg-white/10" />}
              </div>

              <div className="flex-1 pb-4">
                <h3 className="mb-1 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mb-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
                <AppScreen screen={step.screen} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
