"use client";
import { track } from "@/lib/plausible";
import type { QA } from "@/lib/faq";

export function FAQ({ items }: { items: QA[] }) {
  return (
    <div>
      {items.map((x, i) => (
        <details
          key={i}
          className="faq-item"
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) {
              track("faq_expand", { question: x.q });
            }
          }}
        >
          <summary>{x.q}</summary>
          <p>{x.a}</p>
        </details>
      ))}
    </div>
  );
}
