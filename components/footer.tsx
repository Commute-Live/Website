import Image from "next/image"
import Link from "next/link"

const baseFooterLinks = [
  { label: "What It Is", href: "#what-it-is" },
  { label: "Supported Systems", href: "#supported-systems" },
  { label: "FAQ", href: "#faq" },
]

type FooterProps = {
  salesModeEnabled: boolean
  ctaLabel: string
}

export function Footer({ salesModeEnabled, ctaLabel }: FooterProps) {
  const footerLinks = [...baseFooterLinks, { label: ctaLabel, href: "#waitlist" }]

  return (
    <footer className="border-t border-border bg-card/50" id="contact">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="CommuteLive"
                width={136}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              CommuteLive is a dedicated display for real-time arrivals at home.
              {salesModeEnabled
                ? " This site is focused on explaining the product clearly and sending buyers into checkout."
                : " This site is focused on explaining the product clearly and collecting launch interest through the waitlist."}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CommuteLive.
          </p>
          <p className="text-sm text-muted-foreground">
            {salesModeEnabled
              ? "Checkout is live. Product details will keep evolving."
              : "Waitlist phase. Product details will keep evolving."}
          </p>
        </div>
      </div>
    </footer>
  )
}
