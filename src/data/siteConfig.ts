// Single source of truth for this brief's identity.
// Everything topic-specific in Header/HeroBanner/Footer reads from here —
// update this file (plus driveResources.ts and public/assets/) to spin up a new brief.

export const SITE_CONFIG = {
  title: 'Pacing the Frontier',
  byline: 'By Chon "Choon" Chua · LiveStarLight',
  footerByline: 'A LiveStarLight Research Brief',
  // Must be www. The naked apex livestarlight.com has no TLS cert and 404s
  // over plain HTTP, so linking to it sends people to a browser error page.
  websiteUrl: 'https://www.livestarlight.com',
  // Where a reader lands when they finish a brief: the page listing the others.
  researchUrl: 'https://www.livestarlight.com/research',
  linkedinCompanyUrl: 'https://www.linkedin.com/company/livestarlight/',
  linkedinPersonalUrl: 'https://www.linkedin.com/in/chonchua',
  heroPillLabel: 'Google Drive Package • 4 Core Files',
  heroDescription: `Over 1,200 employees from major artificial intelligence labs have issued a collective warning titled "Pacing the Frontier" regarding the dangerous speed of AI development. These industry experts argue that the race to automate AI research could lead to capabilities that outpace our ability to maintain human control or ensure safety. Because individual companies face competitive pressures that prevent them from slowing down independently, the group is calling for international governance and government-supported tools to manage this growth. The signatories, including high-level leaders from OpenAI, Anthropic, and Meta, emphasize that while the technology offers immense potential, it also presents unprecedented social and existential risks. They ultimately advocate for a more intentional and coordinated approach to innovation to prevent a catastrophic lack of oversight.`,
};
