export type Neighborhood = {
  slug: string;
  name: string;
  zips: string[];
  landmarks: string[];
  scenarios: string[];
};

// Top 12 highest-LTV Orlando-area cities: ranked by garage-transformation lucrativeness
// (household income × garage inventory size × real-estate turnover).
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
    slug: "windermere",
    name: "Windermere",
    zips: ["34786"],
    landmarks: ["Butler Chain of Lakes", "Isleworth", "Keene's Pointe", "Main Street"],
    scenarios: [
      "Boat-and-ski-gear garage that needs wall systems and overhead racks.",
      "Luxury property pre-sale polish — white-glove haul, donation receipts.",
    ],
  },
  {
    slug: "dr-phillips",
    name: "Dr. Phillips",
    zips: ["32819", "32836"],
    landmarks: ["Restaurant Row (Sand Lake)", "Bay Hill", "Orange Tree", "Phillips Landing"],
    scenarios: [
      "Gated-community 3-car garage — full reset before holiday guests.",
      "Estate / executor cleanout coordinated remotely with family out of state.",
    ],
  },
  {
    slug: "lake-nona",
    name: "Lake Nona",
    zips: ["32827", "32832"],
    landmarks: ["Medical City", "Laureate Park", "Boxi Park", "Tavistock"],
    scenarios: [
      "New-construction 3-car garage — organize from day one, overhead racks + zones.",
      "Relocation cleanout for a Medical City family moving out of state.",
    ],
  },
  {
    slug: "lake-mary",
    name: "Lake Mary",
    zips: ["32746"],
    landmarks: ["Heathrow", "Lake Mary Boulevard", "Colonial TownPark", "Markham Woods"],
    scenarios: [
      "Corporate-exec 3-car garage with hobby gear — full Refresh with zones and racks.",
      "Empty-nester downsize before listing in the Heathrow corridor.",
    ],
  },
  {
    slug: "heathrow",
    name: "Heathrow",
    zips: ["32746"],
    landmarks: ["Heathrow Country Club", "AAA HQ", "Markham Woods Road"],
    scenarios: [
      "Gated luxury 3-car with golf gear, EV stall prep, and seasonal storage zoning.",
      "Pre-listing white-glove cleanout coordinated with the listing agent.",
    ],
  },
  {
    slug: "maitland",
    name: "Maitland",
    zips: ["32751"],
    landmarks: ["Lake Lily", "Maitland Art Center", "Independence Lane", "RDV Sportsplex"],
    scenarios: [
      "Mid-century 2-car detached crammed with decades of family inventory.",
      "Lake-house garage with kayaks and paddleboards — install hooks and racks.",
    ],
  },
  {
    slug: "winter-garden",
    name: "Winter Garden",
    zips: ["34787"],
    landmarks: ["Plant Street Market", "Hamlin", "Horizon West", "West Orange Trail"],
    scenarios: [
      "Horizon West 3-car garage — bikes, kid gear, holiday bins. Refresh with zones.",
      "Plant Street historic district cleanout for a tight downtown garage.",
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
    slug: "college-park",
    name: "College Park",
    zips: ["32804"],
    landmarks: ["Edgewater Drive", "Dubsdread Golf", "Lake Ivanhoe", "Princeton Street"],
    scenarios: [
      "1940s cottage with a detached single-car garage — decades of accumulated stuff.",
      "Flip-prep cleanout for an investor working the Edgewater corridor.",
    ],
  },
  {
    slug: "thornton-park",
    name: "Thornton Park",
    zips: ["32801", "32803"],
    landmarks: ["Lake Eola", "Washington Street", "Summerlin Avenue"],
    scenarios: [
      "Downtown bungalow with a single-car garage used as storage — reclaim it.",
      "Condo HOA-limited garage cleanout with same-day haul-away.",
    ],
  },
  {
    slug: "celebration",
    name: "Celebration",
    zips: ["34747"],
    landmarks: ["Town Center", "Celebration Hospital", "Lakeside Drive", "Reunion border"],
    scenarios: [
      "Vacation-home garage flip ahead of a short-term rental relaunch.",
      "Master-planned 2-car with hurricane supplies and beach gear — full Refresh.",
    ],
  },
];

export const NEIGHBORHOOD_SLUGS = NEIGHBORHOODS.map((n) => n.slug);

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.slug === slug);
}
