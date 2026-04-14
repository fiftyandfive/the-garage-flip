"use client";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { trackContact } from "@/lib/plausible";

export function StickyMobileCTA() {
  return (
    <div className="sticky-cta" aria-label="Quick contact">
      <a
        className="cta-call"
        href={`tel:${BRAND.phoneTel}`}
        onClick={() => trackContact("phone")}
        data-plausible-event="phone_click"
      >
        📞 Call
      </a>
      <a
        className="cta-text"
        href={`sms:${BRAND.phoneSms}&body=${encodeURIComponent("Garage cleanout quote request")}`}
        onClick={() => trackContact("sms")}
        data-plausible-event="sms_click"
      >
        💬 Text
      </a>
      <Link className="cta-quote" href="/book" data-plausible-event="package_select_reset">
        Get quote →
      </Link>
    </div>
  );
}
