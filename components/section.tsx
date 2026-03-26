"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  animate?: boolean
}

export function Section({ id, className, children, animate = true }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animate])

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "py-16 md:py-24",
        animate && "transition-all duration-700",
        animate && (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"),
        className
      )}
    >
      {children}
    </section>
  )
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "center",
}: {
  label?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn(
      "max-w-3xl mb-12 md:mb-16",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}>
      {label && (
        <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wider uppercase">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
