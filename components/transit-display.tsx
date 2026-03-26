"use client"

import { cn } from "@/lib/utils"

interface TransitRoute {
  badge: string
  badgeColor: string
  destination: string
  eta: string
  etaMinutes?: number
}

interface TransitDisplayProps {
  routes: TransitRoute[]
  className?: string
  variant?: "default" | "compact"
}

const badgeColors: Record<string, string> = {
  // NYC Subway
  "1": "bg-[#EE352E]",
  "2": "bg-[#EE352E]",
  "3": "bg-[#EE352E]",
  "4": "bg-[#00933C]",
  "5": "bg-[#00933C]",
  "6": "bg-[#00933C]",
  "7": "bg-[#B933AD]",
  "A": "bg-[#0039A6]",
  "C": "bg-[#0039A6]",
  "E": "bg-[#0039A6]",
  "B": "bg-[#FF6319]",
  "D": "bg-[#FF6319]",
  "F": "bg-[#FF6319]",
  "M": "bg-[#FF6319]",
  "G": "bg-[#6CBE45]",
  "J": "bg-[#996633]",
  "Z": "bg-[#996633]",
  "L": "bg-[#A7A9AC]",
  "N": "bg-[#FCCC0A] text-black",
  "Q": "bg-[#FCCC0A] text-black",
  "R": "bg-[#FCCC0A] text-black",
  "W": "bg-[#FCCC0A] text-black",
  "S": "bg-[#808183]",
  // Chicago CTA
  "Red": "bg-[#C60C30]",
  "Blue": "bg-[#00A1DE]",
  "Brn": "bg-[#62361B]",
  "Grn": "bg-[#009B3A]",
  "Org": "bg-[#F9461C]",
  "Pink": "bg-[#E27EA6]",
  "Prp": "bg-[#522398]",
  // Boston MBTA
  "RL": "bg-[#DA291C]",
  "OL": "bg-[#ED8B00]",
  "BL": "bg-[#003DA5]",
  "GL": "bg-[#00843D]",
  // SEPTA
  "BSL": "bg-[#F58220]",
  "MFL": "bg-[#0070C0]",
  "NHSL": "bg-[#A30046]",
}

export function TransitDisplay({ routes, className, variant = "default" }: TransitDisplayProps) {
  return (
    <div
      className={cn(
        "transit-display rounded-lg overflow-hidden glow-cyan",
        variant === "compact" ? "p-3" : "p-4",
        className
      )}
    >
      <div className="space-y-1">
        {routes.map((route, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between",
              variant === "compact" ? "py-1.5" : "py-2",
              index !== routes.length - 1 && "border-b border-white/5"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "font-bold rounded text-white flex items-center justify-center",
                  variant === "compact" ? "w-7 h-7 text-sm" : "w-9 h-9 text-base",
                  badgeColors[route.badge] || route.badgeColor
                )}
              >
                {route.badge}
              </span>
              <span className={cn(
                "text-white/90 font-medium",
                variant === "compact" ? "text-sm" : "text-base"
              )}>
                {route.destination}
              </span>
            </div>
            <span
              className={cn(
                "font-mono font-bold",
                variant === "compact" ? "text-base" : "text-lg",
                route.eta === "DUE" || route.etaMinutes === 0
                  ? "text-transit-cyan glow-text-cyan animate-pulse-glow"
                  : "text-white"
              )}
            >
              {route.eta}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TransitDisplayFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Outer frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-xl" />
      {/* Inner bezel */}
      <div className="relative m-1 bg-black rounded-lg overflow-hidden">
        {/* Screen */}
        <div className="m-1">
          {children}
        </div>
      </div>
      {/* LED indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-transit-cyan glow-cyan" />
    </div>
  )
}
