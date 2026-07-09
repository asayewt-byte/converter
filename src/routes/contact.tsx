import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { z } from "zod";
import { SiteShell, Card } from "@/components/SiteShell";
import { Mail, MessageSquare, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ethiopia Today" },
      {
        name: "description",
        content:
          "Get in touch with Ethiopia Today — suggest a tool, report an issue, or partner with us.",
      },
      { property: "og:title", content: "Contact — Ethiopia Today" },
      {
        property: "og:description",
        content: "Send a message to the Ethiopia Today team.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Add a short subject").max(150),
  message: z.string().trim().min(10, "Message is a bit short").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Local-only submission for now (no backend wired).
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setSent(true);
    form.reset();
  };

  return (
    <SiteShell icon={Mail}
      eyebrow="Contact"
      title="Send us a note."
      intro="Questions, suggestions, or a wrong number spotted? Drop a message and we'll get back within a couple of days."
    >
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <Card className="p-6 md:p-8">
          {sent ? (
            <div className="flex flex-col items-start gap-3 py-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                <Check className="h-4 w-4" strokeWidth={2} />
              </span>
              <h2 className="text-lg font-semibold tracking-tight">Message sent</h2>
              <p className="text-sm text-muted-foreground">
                Thanks — we'll reply to your email soon.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-80"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <Field label="Name" name="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  className="input"
                />
              </Field>
              <Field label="Email" name="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  className="input"
                />
              </Field>
              <Field label="Subject" name="subject" error={errors.subject}>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  maxLength={150}
                  className="input"
                />
              </Field>
              <Field label="Message" name="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  className="input resize-y min-h-[140px]"
                />
              </Field>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center rounded-[14px] bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
              <style>{`
                .input {
                  width: 100%;
                  border-radius: 14px;
                  border: 1px solid hsl(var(--border));
                  background: hsl(var(--background));
                  padding: 0.625rem 0.875rem;
                  font-size: 0.875rem;
                  color: hsl(var(--foreground));
                  outline: none;
                  transition: border-color .15s, box-shadow .15s;
                }
                .input:focus {
                  border-color: hsl(var(--ring, var(--foreground)));
                  box-shadow: 0 0 0 3px color-mix(in oklab, hsl(var(--foreground)) 12%, transparent);
                }
              `}</style>
            </form>
          )}
        </Card>

        <div className="space-y-4">
          <Card>
            <Mail className="h-5 w-5" strokeWidth={1.75} />
            <h3 className="mt-4 font-semibold tracking-tight">Email</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              hello@ethiopiatoday.online
            </p>
          </Card>
          <Card>
            <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
            <h3 className="mt-4 font-semibold tracking-tight">Response time</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Usually within 1–2 business days.
            </p>
          </Card>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
          })
        : children}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
