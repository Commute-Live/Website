import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BellRing } from "lucide-react"
import { Footer } from "@/components/footer"
import { HeroGallery } from "@/components/hero-gallery"
import { Navbar } from "@/components/navbar"
import { SetupFlow } from "@/components/setup-flow"
import { TransitAgencyLogo } from "@/components/transit-agency-logos"
import { Section, SectionHeader } from "@/components/section"
import { WaitlistForm } from "@/components/waitlist-form"
import { Button } from "@/components/ui/button"
import { isSalesModeEnabled } from "@/lib/env"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const supportedSystems = [
  {
    region: "New York + New Jersey",
    title: "MTA, LIRR, Metro-North, NJ TRANSIT",
    detail:
      "The backend currently supports MTA subway and bus, Long Island Rail Road, Metro-North, and NJ Transit rail and bus coverage.",
    agencies: ["mta", "njt"] as const,
    image: "/display_images/close-up.png",
  },
  {
    region: "Philadelphia",
    title: "SEPTA",
    detail:
      "SEPTA support covers rail, trolley, and bus, making it one of the deepest systems in the current project.",
    agencies: ["septa"] as const,
    image: "/display_images/multiple.png",
  },
  {
    region: "Boston",
    title: "MBTA",
    detail:
      "MBTA support is already represented in the backend, giving Boston riders a real launch-day place in the product story.",
    agencies: ["mbta"] as const,
    image: "/display_images/shelf.jpg",
  },
  {
    region: "Chicago",
    title: "CTA",
    detail:
      "CTA rail and bus support are already mapped in the server, so Chicago stands on its own in the supported systems lineup.",
    agencies: ["cta"] as const,
    image: "/display_images/front.png",
  },
]

const faqItems = [
  {
    question: "What cities are supported?",
    answer:
      "Right now the launch story covers New York and New Jersey regional support, Philadelphia, Boston, and Chicago, all based on systems already represented in the backend today.",
  },
  {
    question: "Does it need Wi-Fi?",
    answer:
      "Yes. Once setup is complete, CommuteLive uses Wi-Fi to keep arrivals live and continuously updated.",
  },
  {
    question: "How do I set it up?",
    answer:
      "It is designed to feel fast: create your account, power on the display, connect over Bluetooth, pick your stop in the app, and you are live.",
  },
  {
    question: "Can I change my station later?",
    answer:
      "Absolutely. The setup flow is built around being able to update your stop and presets in the companion experience.",
  },
  {
    question: "Can I save multiple displays or presets?",
    answer:
      "Yes, that is a core part of the product direction and one of the reasons the setup and account flow matter so much.",
  },
  {
    question: "Does it work with bus and train lines?",
    answer:
      "Yes. That is one of the best parts of the project: the backend already spans both rail and bus coverage across the supported agencies shown here.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "The site is in waitlist mode right now, so final pricing and launch packaging are still being finalized.",
  },
  {
    question: "What comes in the box?",
    answer:
      "The core package is centered on the display and power setup, with final hardware and packaging details to be locked in closer to launch.",
  },
  {
    question: "How long does setup take?",
    answer:
      "The goal is a setup experience that takes just a few minutes, which is exactly why it is featured so prominently on the site.",
  },
  {
    question: "Can I control brightness and quiet hours?",
    answer:
      "Yes, both are functional. Brightness control and quiet hours are part of the experience.",
  },
]

export default function HomePage() {
  const salesModeEnabled = isSalesModeEnabled()
  const ctaLabel = salesModeEnabled ? "Buy Now" : "Join Waitlist"
  const heroBadgeLabel = salesModeEnabled ? "Checkout live now" : "Waitlist open now"
  const waitlistLabel = salesModeEnabled ? "Checkout" : "Waitlist"
  const waitlistTitle = salesModeEnabled ? "Buy CommuteLive" : "Join the waitlist"
  const waitlistDescription = salesModeEnabled
    ? "Start checkout for the first CommuteLive release."
    : "Be first to hear when CommuteLive is ready."
  const subscriptionAnswer = salesModeEnabled
    ? "No. This launch flow is configured as a one-time purchase through Stripe Checkout."
    : "The site is in waitlist mode right now, so final pricing and launch packaging are still being finalized."
  const pageFaqItems = faqItems.map((item) =>
    item.question === "Is this a subscription?"
      ? { ...item, answer: subscriptionAnswer }
      : item,
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar ctaLabel={ctaLabel} />
      <main className="overflow-hidden">
        <section className="relative isolate pt-24 md:pt-[7.5rem]">
          <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.24),transparent_42%),linear-gradient(180deg,rgba(9,14,25,0.96),rgba(9,14,25,0.78),transparent)]" />
          <div className="container mx-auto px-4 pb-20 md:px-6 md:pb-28">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                  <BellRing className="h-4 w-4 text-primary" />
                  {heroBadgeLabel}
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                    <span className="block text-balance">Your commute,</span>
                    <span className="glow-text-cyan mt-1 block text-balance text-cyan-300">
                      on your wall.
                    </span>
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-white/68 md:text-[1.7rem] md:leading-[1.35]">
                    Live arrivals at a glance
                    <br />
                    for your home or office.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="h-12 px-6 text-base" asChild>
                    <Link href="#waitlist">
                      {ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-white/20 bg-white/10 px-6 text-base text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.18)] hover:border-cyan-300/35 hover:bg-white/16"
                    asChild
                  >
                    <Link href="#how-it-works">See How It Works</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-white/55">Supported providers</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <TransitAgencyLogo agency="mta" />
                    <TransitAgencyLogo agency="septa" />
                    <TransitAgencyLogo agency="mbta" />
                    <TransitAgencyLogo agency="cta" />
                    <TransitAgencyLogo agency="njt" />
                  </div>
                </div>
              </div>

              <HeroGallery />
            </div>
          </div>
        </section>

        <SetupFlow />

        <Section id="supported-systems" className="bg-secondary/20">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              label="Supported Providers"
              title="Built for the systems people actually ride"
              description="The launch story is tied directly to the providers already represented in the backend."
            />

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <TransitAgencyLogo agency="mta" />
              <TransitAgencyLogo agency="njt" />
              <TransitAgencyLogo agency="septa" />
              <TransitAgencyLogo agency="mbta" />
              <TransitAgencyLogo agency="cta" />
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-5 min-w-max pr-4">
                {supportedSystems.map((system) => (
                  <div
                    key={system.title}
                    className="w-[340px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-card/80"
                  >
                    <div className="aspect-[16/8] overflow-hidden border-b border-white/10">
                      <Image
                        src={system.image}
                        alt={system.title}
                        width={1600}
                        height={800}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-sm text-primary">{system.region}</div>
                      <h3 className="mt-1 text-xl font-semibold text-white">{system.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{system.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="waitlist">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeader
                label={waitlistLabel}
                title={waitlistTitle}
                description={waitlistDescription}
                className="mb-8"
              />
            </div>

            <div className="mx-auto max-w-xl">
              <WaitlistForm salesModeEnabled={salesModeEnabled} />
            </div>
          </div>
        </Section>

        <Section id="faq">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              label="FAQ"
              title="Everything you need to know about CommuteLive."
              description="The essentials, without the clutter."
            />

            <div className="mx-auto max-w-6xl space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                {pageFaqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`item-${index}`}
                    className="rounded-3xl border border-white/10 bg-card/70 px-6"
                  >
                    <AccordionTrigger className="py-7 text-2xl font-semibold text-white hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-7 text-base leading-8 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
      </main>
      <Footer salesModeEnabled={salesModeEnabled} ctaLabel={ctaLabel} />
    </div>
  )
}
