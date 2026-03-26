"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormState = {
  name: string
  email: string
}

const initialState: FormState = {
  name: "",
  email: "",
}

export function WaitlistForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = (await response.json()) as { error?: string; message?: string }

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.")
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
          Get launch updates and early access when CommuteLive is ready.
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
          {status === "submitting" ? "Joining..." : "Join Waitlist"}
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
