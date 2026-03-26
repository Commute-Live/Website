import Image from "next/image"
import { cn } from "@/lib/utils"

type AgencyId = "mta" | "mbta" | "cta" | "septa" | "njt"

const imageLogoMap: Partial<Record<AgencyId, { src: string; alt: string; width: number; height: number }>> = {
  mta: {
    src: "/provider_logos/mta.png",
    alt: "MTA logo",
    width: 120,
    height: 120,
  },
  cta: {
    src: "/provider_logos/cta.png",
    alt: "CTA logo",
    width: 160,
    height: 120,
  },
  septa: {
    src: "/provider_logos/septa.svg",
    alt: "SEPTA logo",
    width: 180,
    height: 120,
  },
  njt: {
    src: "/provider_logos/nj-transit.png",
    alt: "NJ Transit logo",
    width: 220,
    height: 120,
  },
}

export function TransitAgencyLogo({
  agency,
  className,
}: {
  agency: AgencyId
  className?: string
}) {
  const imageLogo = imageLogoMap[agency]
  const imageClassName =
    agency === "njt"
      ? "h-10 w-auto object-contain brightness-0 invert md:h-11"
      : "h-10 w-auto object-contain md:h-11"

  if (imageLogo) {
    return (
      <div
        className={cn(
          "inline-flex min-h-18 items-center justify-center rounded-[1.35rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(18,28,42,0.88),rgba(10,16,27,0.92))] px-5 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_28px_rgba(87,229,255,0.08)] backdrop-blur-sm",
          className,
        )}
      >
        <Image
          src={imageLogo.src}
          alt={imageLogo.alt}
          width={imageLogo.width}
          height={imageLogo.height}
          className={imageClassName}
        />
      </div>
    )
  }

  if (agency === "mbta") {
    return (
      <div
        className={cn(
          "inline-flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(114,244,255,0.22),rgba(18,28,42,0.98)_58%)] text-[2rem] font-black text-white shadow-[0_0_24px_rgba(87,229,255,0.18)]",
          className,
        )}
      >
        T
      </div>
    )
  }

  return null
}
