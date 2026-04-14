import { FLAGS } from "./brand";

export type QA = { q: string; a: string };

const ALL: QA[] = [
  {
    q: "How much does a garage cleanout cost in Orlando?",
    a: "Most 2-car garages run $600–$900 depending on volume and weight. Every quote is free and fixed in writing before we start. No day-of surprises.",
  },
  {
    q: "What happens to the items you haul away?",
    a: "Anything reusable is donated (we work with Orlando Rescue Mission, Habitat ReStore, Mustard Seed). Metal and electronics are recycled. Only what's left goes to the transfer station. We give you receipts and addresses — you'll know exactly where your stuff went.",
  },
  {
    q: "How fast can you schedule a cleanout in Orlando?",
    a: "Usually within the same week. For urgent jobs (pre-listing, estate, move-out), we can often be onsite within 48 hours. Text (407) 735-6450 for fastest response.",
  },
  {
    q: "Do I need to be home during the cleanout?",
    a: "No. Many clients give us access and leave. We document before/after with photos and send them to you as we work.",
  },
  {
    q: "What neighborhoods do you serve?",
    a: "Orlando proper, Winter Park, Lake Nona, Dr. Phillips, College Park, Windermere, Baldwin Park, Thornton Park, and surrounding Orange County. Outside this area? Ask — we'll quote fairly or refer you.",
  },
  {
    q: "What about epoxy floors, cabinets, EV chargers, or AC?",
    a: "Not our scope — and we won't pretend it is. We focus on cleanout and organization because that's what we do well. If you want a referral to a local Orlando pro for epoxy or electrical, we're happy to share who we've seen do good work. But you'll book and pay them directly. We don't mark up other people's labor.",
  },
  {
    q: "What if I'm not happy with the cleanout?",
    a: "Our first-10-customers promise: free haul-away on your next cleanout if the first one doesn't meet expectations. Long-term, we stand by every job — call Lucas directly at (407) 735-6450.",
  },
];

// Coverage question only renders if license OR insurance is bound.
export function buildFaq(): QA[] {
  const items = [...ALL];
  if (FLAGS.licenseBound || FLAGS.insuranceBound) {
    const parts: string[] = [];
    if (FLAGS.licenseBound) {
      parts.push("The Garage Flip is a Florida-registered LLC, licensed in Orange County.");
    }
    if (FLAGS.insuranceBound) {
      parts.push("We carry general liability coverage for all residential and commercial work.");
    }
    items.splice(5, 0, {
      q: "Are you covered for residential work?",
      a: parts.join(" "),
    });
  }
  return items;
}
