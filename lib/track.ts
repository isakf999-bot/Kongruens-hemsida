/**
 * Conversion events for Google Tag Manager. Each call pushes one event to the
 * dataLayer; Svensk Media Partner turns them into Google Ads conversions in GTM.
 * Does nothing until GTM has created window.dataLayer.
 */
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: string, params: Record<string, string | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
