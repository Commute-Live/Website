import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

function unauthorizedResponse() {
  return new NextResponse("Welcome! Our site will be live soon!\nDeveloper password:", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Welcome! Our site will be live soon! Developer password:"',
    },
  })
}

export function proxy(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD?.trim()

  if (!sitePassword) {
    return NextResponse.next()
  }

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon") ||
    request.nextUrl.pathname.startsWith("/icon") ||
    request.nextUrl.pathname.startsWith("/apple-icon") ||
    request.nextUrl.pathname.startsWith("/site.webmanifest")
  ) {
    return NextResponse.next()
  }

  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse()
  }

  const encodedCredentials = authorization.slice(6)

  try {
    const decodedCredentials = atob(encodedCredentials)
    const separatorIndex = decodedCredentials.indexOf(":")
    const password = separatorIndex >= 0 ? decodedCredentials.slice(separatorIndex + 1) : ""

    if (password !== sitePassword) {
      return unauthorizedResponse()
    }
  } catch {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}
