import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "CommuteLive | Transit Arrivals At Home",
  description:
    "CommuteLive brings real-time transit arrivals into your space with a dedicated display built for daily commuters.",
  keywords: [
    "transit display",
    "commute",
    "real-time arrivals",
    "MTA",
    "SEPTA",
    "MBTA",
    "CTA",
    "home display",
  ],
  openGraph: {
    title: "CommuteLive | Transit Arrivals At Home",
    description:
      "A dedicated display for live transit arrivals in the spaces where you plan your day.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
