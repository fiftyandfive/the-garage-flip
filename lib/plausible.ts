/**
 * Fire a Plausible custom event from the browser.
 * No-op if Plausible isn't loaded (dev/preview without domain match).
 */
export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    plausible?: (e: string, opts?: { props?: Record<string, unknown> }) => void;
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    gtag?: (command: string, target: string, params?: Record<string, unknown>) => void;
  };
  if (typeof w.plausible === "function") {
    w.plausible(event, props ? { props } : undefined);
  }
  // Also mirror to GA as a custom event for cross-check during the 30-day overlap.
  if (typeof w.gtag === "function") {
    w.gtag("event", event, props || {});
  }
}

export function trackLead(props?: Record<string, string | number | boolean>) {
  track("quote_submitted", props);
  if (typeof window !== "undefined") {
    const w = window as unknown as {
      fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    };
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", props || {});
    }
  }
}

export function trackContact(channel: "phone" | "sms") {
  track(channel === "phone" ? "phone_click" : "sms_click", { channel });
  if (typeof window !== "undefined") {
    const w = window as unknown as {
      fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    };
    if (typeof w.fbq === "function") {
      w.fbq("track", "Contact", { channel });
    }
  }
}
