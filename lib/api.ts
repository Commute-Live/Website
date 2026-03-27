import { getPublicApiBaseUrl } from "@/lib/env"

export function toApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const baseUrl = getPublicApiBaseUrl()

  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath
}
