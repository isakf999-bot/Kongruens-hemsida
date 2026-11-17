"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Reports clicks that lead to contact: phone and e-mail links anywhere on the
 * site, and "Kontakta mig"-style links to the contact page. Mounted once, in the layout.
 */
export function ContactTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const page = window.location.pathname;
      if (href.startsWith("tel:")) {
        track("click_to_call", { page, link_text: link.textContent?.trim() });
      } else if (href.startsWith("mailto:")) {
        track("click_email", { page, link_text: link.textContent?.trim() });
      } else if (href.startsWith("/kontakt")) {
        const service = new URL(href, window.location.origin).searchParams.get("amne") || undefined;
        track("contact_cta_click", { page, service, link_text: link.textContent?.trim() });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
