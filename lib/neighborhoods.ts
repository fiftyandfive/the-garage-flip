export type Neighborhood = {
  slug: string;
  name: string;
  zips: string[];
  landmarks: string[];
  scenarios: string[];
};

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: "winter-park",
    name: "Winter Park",
    zips: ["32789", "32792"],
    landmarks: ["Park Avenue", "Rollins College", "Lake Virginia", "Hannibal Square"],
    scenarios: [
      "Retiree downsize on a bricked Park Ave street — tight access, careful haul.",
      "Pre-listing cleanout for a 2-car attached garage near Rollins.",
    ],
  },
  {
    slug: "lake-nona",
    name: "Lake Nona",
    zips: ["32827", "32832"],
    landmarks: ["Medical City", "Laureate Park", "Boxi Park"],
    scenarios: [
      "New-construction 3-car garage — organize from day one, overhead racks + zones.",
      "Relocation cleanout for a Medical City family moving out of state.",
    ],
  },
  {
    slug: "college-park",
    name: "College Park",
    zips: ["32804"],
    landmarks: ["Edgewater Drive", "Dubsdread Golf", "Lake Ivanhoe"],
    scenarios: [
      "1940s cottage with a detached single-car garage — decades of accumulated stuff.",
      "Flip-prep cleanout for an investor working the Edgewater corridor.",
    ],
  },
  {
    slug: "baldwin-park",
    name: "Baldwin Park",
    zips: ["32814"],
    landmarks: ["New Broad Street", "Lake Baldwin", "Enders Park"],
    scenarios: [
      "Townhome 2-car tandem — organize so both cars fit again.",
      "Growing-family cleanout: kids outgrew the bikes and the Pack 'n Plays.",
    ],
  },
  {
    slug: "dr-phillips",
    name: "Dr. Phillips",
    zips: ["32819", "32836"],
    landmarks: ["Restaurant Row (Sand Lake)", "Bay Hill", "Orange Tree"],
    scenarios: [
      "Gated-community 3-car garage — full reset before holiday guests.",
      "Estate / executor cleanout coordinated remotely with family out of state.",
    ],
  },
  {
    slug: "windermere",
    name: "Windermere",
    zips: ["34786"],
    landmarks: ["Butler Chain of Lakes", "Isleworth", "Main Street"],
    scenarios: [
      "Boat-and-ski-gear garage that needs wall systems and overhead racks.",
      "Luxury property pre-sale polish — white-glove haul, donation receipts.",
    ],
  },
  {
    slug: "thornton-park",
    name: "Thornton Park",
    zips: ["32801", "32803"],
    landmarks: ["Lake Eola", "Washington Street", "Summerlin Ave"],
    scenarios: [
      "Downtown bungalow with a single-car garage used as storage — reclaim it.",
      "Condo HOA-limited garage cleanout with same-day haul-away.",
    ],
  },
];

export const NEIGHBORHOOD_SLUGS = NEIGHBORHOODS.map((n) => n.slug);

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.slug === slug);
}
