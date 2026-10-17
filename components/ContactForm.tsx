"use client";

import { FormEvent, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import styles from "./ContactForm.module.css";

type Errors = { email?: boolean };
type Status = "idle" | "loading" | "success" | "error";

// Web3Forms delivers the message by e-mail. The key is public by design.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const ENDPOINT = "https://api.web3forms.com/submit";

export function ContactForm() {
  const subjectFromLink = useSearchParams().get("amne") ?? "";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);

  function validateEmail(value: string) {
    return Boolean(value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!validateEmail(email)) {
      setErrors({ email: true });
      form.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      if (!ACCESS_KEY) throw new Error("NEXT_PUBLIC_WEB3FORMS_KEY is not set");
      // Sent as form data: a JSON body triggers a CORS preflight, which Web3Forms rejects.
      const payload = new FormData();
      payload.append("access_key", ACCESS_KEY);
      payload.append("subject", subject ? `Kongruens: ${subject}` : "Kongruens: nytt meddelande");
      payload.append("from_name", name || "Kongruens kontaktformulär");
      payload.append("name", name);
      payload.append("email", email);
      payload.append("ämne", subject);
      payload.append("message", message);
      if (data.get("botcheck")) payload.append("botcheck", "true");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || `HTTP ${res.status}`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    } finally {
      window.setTimeout(() => statusRef.current?.focus(), 0);
    }
  }

  return (
    <form
      className={`${styles.form} ${status === "success" ? styles.success : ""}`}
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "loading"}
    >
      {/* Left empty by people; bots that fill it are dropped by Web3Forms. */}
      <input
        type="checkbox"
        name="botcheck"
        className={styles.trap}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className={styles.row}>
        <label>
          Ditt namn
          <input name="name" type="text" autoComplete="name" />
        </label>
        <label>
          Din e-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email || undefined}
            aria-describedby={errors.email ? "email-fel" : undefined}
            onBlur={(e) => {
              if (e.target.value) setErrors({ email: !validateEmail(e.target.value) });
            }}
          />
          {errors.email ? (
            <span id="email-fel" className={styles.fieldError}>
              Skriv en e-postadress som namn@exempel.se, så att jag kan svara dig.
            </span>
          ) : null}
        </label>
      </div>
      <label>
        Ämne
        <input name="subject" type="text" defaultValue={subjectFromLink} key={subjectFromLink} />
      </label>
      <label>
        Meddelande
        <textarea name="message" rows={6} />
      </label>
      <div className={styles.actions}>
        <button className="btn" type="submit" disabled={status === "loading"}>
          Skicka
          {status === "idle" || status === "error" ? <Send aria-hidden="true" strokeWidth={1.75} /> : null}
          {status === "loading" ? <span className={styles.spinner} aria-hidden="true" /> : null}
          {status === "success" ? <span className={styles.check} aria-hidden="true" /> : null}
        </button>
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className={`${styles.status} ${status === "error" ? styles.statusError : ""}`}
        >
          {status === "loading" ? "Skickar…" : null}
          {status === "success" ? "Tack! Ditt meddelande är skickat. Jag hör av mig så snart jag kan." : null}
          {status === "error" ? (
            <>
              Meddelandet kunde inte skickas. Försök igen, eller ring{" "}
              <a href="tel:+46705536050">0705-536050</a> eller mejla{" "}
              <a href="mailto:info@kongruens.se">info@kongruens.se</a>.
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
