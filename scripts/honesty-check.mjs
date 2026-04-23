// This script enforces honesty in public copy. Do NOT disable.
// Every banned string represents a legal or reputational risk with zero upside.
// If you genuinely need to add one (e.g., insurance policy was bound today),
// do it by flipping an env flag via <TrustStrip />, not by editing this allowlist.

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOTS = ["app", "components", "content"];
const TRUST_STRIP_FILE = "components/TrustStrip.tsx";
const FAQ_COMPONENT_FILE = "components/FAQ.tsx"; // pulls copy from lib/faq.ts — no banned literals here

const BANNED = [
  { pattern: /\b\d{3,}\+\s*garages?\b/i, label: "fake job count (e.g., 500+ garages)" },
  { pattern: /\b4\.\d\s*★/, label: "fake star rating (e.g., 4.9★)" },
  { pattern: /\b5[- ]star\s*rated\b/i, label: "5-star rated" },
  { pattern: /\btrusted by thousands\b/i, label: "trusted by thousands" },
  { pattern: /\bfully insured\b/i, label: "fully insured (unbound)" },
  { pattern: /\bbonded and insured\b/i, label: "bonded and insured (unbound)" },
  { pattern: /\blicensed and insured\b/i, label: "licensed and insured (unbound)" },
  { pattern: /\bJason\s*M\.?\b/, label: "fake testimonial name Jason M" },
  { pattern: /\bPriya\s*S\.?\b/, label: "fake testimonial name Priya S" },
  { pattern: /\bDaniel\s*R\.?\b/, label: "fake testimonial name Daniel R" },
  { pattern: /\bMeredith\s*K\.?\b/, label: "fake testimonial name Meredith K" },
  { pattern: /\bour team of experts\b/i, label: "our team of experts (overclaim)" },
  { pattern: /\bvetted partners\b/i, label: "vetted partners (no partners under contract)" },
  { pattern: /\bpartner network\b/i, label: "partner network (no partners under contract)" },
  { pattern: /\btrusted partners\b/i, label: "trusted partners (no partners under contract)" },
  { pattern: /\bour network of\b/i, label: "our network of (no partners under contract)" },
  { pattern: /\blicensed electrician\b/i, label: "licensed electrician (out of scope)" },
  { pattern: /\blicensed HVAC\b/i, label: "licensed HVAC (out of scope)" },
  { pattern: /\blicensed contractor\b/i, label: "licensed contractor (out of scope)" },
  { pattern: /\bepoxy floors?\b/i, label: "epoxy flooring (out of scope at launch; intent checkbox OK)" },
  { pattern: /\bgarage cabinets\b/i, label: "garage cabinets (out of scope at launch; intent checkbox OK)" },
  { pattern: /\bEV charger(?!s? install checkbox)\b/i, label: "EV charger (out of scope at launch; intent checkbox OK)" },
  { pattern: /\bmini[- ]split\b/i, label: "mini-split (out of scope at launch)" },
];

const SOFT = [
  { pattern: /\bsame[- ]day\b/i, label: "same-day (review context)" },
  { pattern: /\busually\b/i, label: "usually (review for accuracy)" },
];

// Intent checkboxes legitimately mention epoxy/cabinets/EV/AC in InstantQuoteForm — allow.
// The quote API route emits those same intent labels into Formspree/Airtable — allow.
const ALLOW_FILES = new Set([
  "components/InstantQuoteForm.tsx",
  "app/api/quote/route.ts",
  TRUST_STRIP_FILE,
]);

async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(tsx?|jsx?|mdx?)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

async function main() {
  const root = process.cwd();
  const files = (
    await Promise.all(ROOTS.map((r) => walk(path.join(root, r))))
  ).flat();

  let errors = 0;
  let warns = 0;

  for (const file of files) {
    const rel = path.relative(root, file);
    const src = await fs.readFile(file, "utf8");

    // Strip comment lines so we don't flag banned terms inside code comments/regex literals.
    const lines = src.split("\n");

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) return;

      for (const b of BANNED) {
        if (b.pattern.test(line)) {
          // Exception: TrustStrip file may contain "Licensed" / "Insured"
          if (ALLOW_FILES.has(rel) && /licensed|insured|epoxy|cabinet|ev charger|ac|climate/i.test(b.label)) {
            continue;
          }
          // Exception: FAQ component file pulls from lib (no literal banned string there)
          if (rel === FAQ_COMPONENT_FILE) continue;
          console.error(`✗ ${rel}:${i + 1}  BANNED  [${b.label}]`);
          console.error(`    ${line.trim()}`);
          errors++;
        }
      }

      for (const s of SOFT) {
        if (s.pattern.test(line)) {
          // Don't spam warnings — just a light nudge.
          warns++;
        }
      }
    });
  }

  if (warns > 0) {
    console.warn(`\n⚠  ${warns} soft-warn occurrence(s) of review-worthy phrases (same-day / usually). Not blocking.`);
  }

  if (errors > 0) {
    console.error(`\n✗ Honesty check FAILED with ${errors} banned string(s). Build aborted.`);
    console.error(`  Root-cause the copy or flip the env flag via <TrustStrip />. Do NOT edit the allowlist.`);
    process.exit(1);
  }

  console.log(`✓ Honesty check passed (${files.length} files scanned).`);
}

main().catch((e) => {
  console.error("honesty-check crashed:", e);
  process.exit(2);
});
