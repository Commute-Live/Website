"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Check, Sparkles } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { TransitDisplay, TransitDisplayFrame } from "@/components/transit-display"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const productImages = [
  {
    id: 1,
    label: "NYC Subway",
    routes: [
      { badge: "A", badgeColor: "bg-[#0039A6]", destination: "Far Rockaway", eta: "2 min" },
      { badge: "C", badgeColor: "bg-[#0039A6]", destination: "168 St", eta: "6 min" },
    ],
  },
  {
    id: 2,
    label: "Philadelphia SEPTA",
    routes: [
      { badge: "BSL", badgeColor: "bg-[#F58220]", destination: "NRG Station", eta: "3 min" },
      { badge: "MFL", badgeColor: "bg-[#0072CE]", destination: "69th St", eta: "8 min" },
    ],
  },
  {
    id: 3,
    label: "Boston T",
    routes: [
      { badge: "RL", badgeColor: "bg-[#DA291C]", destination: "Alewife", eta: "4 min" },
      { badge: "GL", badgeColor: "bg-[#00843D]", destination: "Boston College", eta: "7 min" },
    ],
  },
  {
    id: 4,
    label: "Chicago CTA",
    routes: [
      { badge: "Blue", badgeColor: "bg-[#00A1DE]", destination: "O'Hare", eta: "5 min" },
      { badge: "Red", badgeColor: "bg-[#C60C30]", destination: "Howard", eta: "9 min" },
    ],
  },
]

const launchNotes = [
  "Focused on home commuters who want ambient arrival information in one fixed place.",
  "Designed around a dedicated hardware display instead of generic ecommerce filler.",
  "Ready for real product photography, final pricing, and launch ordering when those exist.",
]

const realImages = [
  { src: "/display_images/front.png", alt: "CommuteLive front view" },
  { src: "/display_images/side.webp", alt: "CommuteLive side view" },
  { src: "/display_images/shelf.jpg", alt: "CommuteLive on a shelf" },
]

const included = [
  "CommuteLive display unit",
  "USB-C power setup",
  "Wall or shelf placement options",
  "Simple onboarding flow for stop selection",
]

const specs = [
  { label: "Display Type", value: "High-contrast LED matrix" },
  { label: "Launch Positioning", value: "Single-purpose home transit display" },
  { label: "Power", value: "USB-C" },
  { label: "Connectivity", value: "Wi-Fi setup flow" },
  { label: "Placement", value: "Desk, shelf, or wall-ready concept" },
  { label: "Supported Systems", value: "MTA, LIRR, Metro-North, NJ TRANSIT, MBTA, CTA, SEPTA" },
]

const faqs = [
  {
    question: "Is this a live product page or a launch preview?",
    answer:
      "This is a product preview page for the initial CommuteLive website direction. It shows the intended positioning and display behavior without pretending pricing or fulfillment details are finalized.",
  },
  {
    question: "What transit systems are currently represented?",
    answer:
      "The site currently highlights New York regional service, SEPTA, MBTA, and CTA as the active supported-system story for launch.",
  },
  {
    question: "Why remove pricing and fake reviews?",
    answer:
      "Because placeholder pricing, stock urgency, and invented testimonials weaken trust. The initial look is stronger when it only claims what the project can currently support.",
  },
  {
    question: "What should come next?",
    answer:
      "Real photos or renders, final hardware details, confirmed launch messaging, and a real conversion path such as email capture, preorder, or direct checkout.",
  },
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-16 pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-8">
                <TransitDisplayFrame className="mx-auto w-full max-w-md">
                  <TransitDisplay routes={productImages[selectedImage].routes} />
                </TransitDisplayFrame>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg border p-3 transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="text-center text-xs text-muted-foreground">
                      {img.label}
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Launch notes
                </div>
                <div className="mt-4 space-y-3">
                  {launchNotes.map((note) => (
                    <p key={note} className="text-sm leading-7 text-muted-foreground">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                  CommuteLive product preview
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  A cleaner page for showing what CommuteLive is meant to be without
                  fake urgency, fake social proof, or placeholder commerce blocks.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
                <p className="mb-2 text-sm font-medium text-primary">Current status</p>
                <p className="text-sm leading-7 text-foreground/80">
                  This preview is positioned as an early launch presentation. It is ready
                  for real preorder or sales details later, but it no longer pretends those
                  details already exist.
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/#waitlist">Join Waitlist</Link>
                </Button>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link href="/">Back to homepage</Link>
                </Button>
              </div>

              <div className="rounded-xl bg-secondary/50 p-5" id="details">
                <p className="mb-3 font-medium text-foreground">
                  What the page is communicating:
                </p>
                <ul className="space-y-2">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
              {realImages.map((image) => (
                <div
                  key={image.src}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Launch-facing specs
              </h2>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between p-4 ${
                      index !== specs.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Why this version is better
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
