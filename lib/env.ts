export function isSalesModeEnabled() {
  return process.env.NEXT_PUBLIC_SALES_MODE_ENABLED === "true"
}

export function getPublicApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? ""
  return apiBaseUrl.replace(/\/$/, "")
}
