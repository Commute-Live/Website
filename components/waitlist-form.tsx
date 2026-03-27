"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toApiUrl } from "@/lib/api"

type FormState = {
  name: string
  email: string
}

const initialState: FormState = {
  name: "",
  email: "",
}

type WaitlistFormProps = {
  salesModeEnabled: boolean
}

export function WaitlistForm({ salesModeEnabled }: WaitlistFormProps) {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")

    try {
      const response = await fetch(toApiUrl(salesModeEnabled ? "/checkout/session" : "/waitlist"), {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const contentType = response.headers.get("content-type") ?? ""
      const rawBody = await response.text()
      const data = contentType.includes("application/json")
        ? (JSON.parse(rawBody) as { error?: string; message?: string; url?: string })
        : null

      if (!data && !response.ok) {
        throw new Error("The server returned HTML instead of JSON. Check NEXT_PUBLIC_API_BASE_URL and your API deployment.")
      }

      if (!data) {
        throw new Error("The server returned an unexpected response format.")
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.")
      }

      if (salesModeEnabled && data.url) {
        window.location.assign(data.url)
        return
      }

      setStatus("success")
      setMessage(data.message ?? "You are on the waitlist.")
      setForm(initialState)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong.")
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-white/10 bg-black/30 p-6 backdrop-blur"
    >
      <div className="mb-5">
        <p className="text-sm leading-6 text-muted-foreground">
          {salesModeEnabled
            ? "Enter your details to start checkout for the first CommuteLive release."
            : "Get launch updates and early access when CommuteLive is ready."}
        </p>
      </div>

      <div className="grid gap-4">
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="h-11"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="h-11"
          required
        />

        <Button type="submit" size="lg" disabled={status === "submitting"} className="h-12">
          {status === "submitting"
            ? salesModeEnabled
              ? "Opening Checkout..."
              : "Joining..."
            : salesModeEnabled
              ? "Continue to Checkout"
              : "Join Waitlist"}
        </Button>

        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-primary" : "text-destructive"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
