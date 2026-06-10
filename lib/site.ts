/*
  Central site configuration: navigation, social links, and shared copy.
  TODO: replace the placeholder social URLs with the real Breaking Magic profiles.
*/

export const SITE_NAME = "Breaking Magic";
export const SITE_TAGLINE =
  "A live breaking collective. We handle the cards. You run the show.";

// TODO: set this to the production domain once it exists (used for OG/social tags).
export const SITE_URL = "https://breakingmagic.example.com";

export const NAV_LINKS = [
  { href: "/streamers", label: "For Streamers" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = [
  // TODO: replace each placeholder URL with the real profile link.
  { label: "Whatnot", href: "https://www.whatnot.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "X", href: "https://x.com/" },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
