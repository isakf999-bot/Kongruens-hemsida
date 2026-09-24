"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ContactForm.module.css";

type Errors = { email?: boolean };

export function ContactForm() {
  const subjectFromLink = useSearchParams().get("amne") ?? "";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validateEmail(value: string) {
    return Boolean(value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");

    if (!validateEmail(email)) {
      setErrors({ email: true });
      form.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");

    const body = encodeURIComponent(`Namn: ${name}\nE-post: ${email}\n\n${message}`);
    window.setTimeout(() => {
      window.location.href = `mailto:info@kongruens.se?subject=${encodeURIComponent(subject || "Kontakt")}&body=${body}`;
      setStatus("success");
      form.reset();
    }, 400);
  }

  return (
    <form
      className={`${styles.form} ${status === "success" ? styles.success : ""}`}
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "loading"}
    >
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
            onBlur={(e) => {
              if (e.target.value) setErrors({ email: !validateEmail(e.target.value) });
            }}
          />
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
          {status === "loading" ? <span className={styles.spinner} aria-hidden="true" /> : null}
          {status === "success" ? <span className={styles.check} aria-hidden="true" /> : null}
        </button>
      </div>
    </form>
  );
}
