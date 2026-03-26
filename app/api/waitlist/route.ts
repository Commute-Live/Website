import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const waitlistSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
})

type WaitlistEntry = z.infer<typeof waitlistSchema> & {
  createdAt: string
}

const dataDir = path.join(process.cwd(), "data")
const waitlistFile = path.join(dataDir, "waitlist-submissions.json")

async function readEntries() {
  try {
    const contents = await readFile(waitlistFile, "utf8")
    return JSON.parse(contents) as WaitlistEntry[]
  } catch {
    return []
  }
}

async function writeEntries(entries: WaitlistEntry[]) {
  await mkdir(dataDir, { recursive: true })
  await writeFile(waitlistFile, JSON.stringify(entries, null, 2), "utf8")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = waitlistSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter your name and email." },
        { status: 400 },
      )
    }

    const entries = await readEntries()
    const normalizedEmail = parsed.data.email.toLowerCase()

    if (entries.some((entry) => entry.email.toLowerCase() === normalizedEmail)) {
      return NextResponse.json(
        { error: "That email is already on the waitlist." },
        { status: 409 },
      )
    }

    entries.push({
      ...parsed.data,
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    })

    await writeEntries(entries)

    return NextResponse.json({
      message: "You are on the waitlist. We will reach out when CommuteLive is ready.",
    })
  } catch {
    return NextResponse.json(
      { error: "We could not save your waitlist request right now." },
      { status: 500 },
    )
  }
}
