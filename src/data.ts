const thumbnailsGlob = import.meta.glob('./Thumbnails/*.{jpg,jpeg,png,gif,webp}', { eager: true, query: '?url', import: 'default' });
export const THUMBNAILS = Object.values(thumbnailsGlob) as string[];

const postersGlob = import.meta.glob('./Posters/*.{jpg,jpeg,png,gif,webp}', { eager: true, query: '?url', import: 'default' });
export const POSTERS = Object.values(postersGlob) as string[];

export const CONTACT = {
  email: "vinayakpandey266@gmail.com",
  instagram: "https://www.instagram.com/skullgfx/",
  twitter: "https://x.com/skullaep"
};

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Work Archive", href: "/work" },
  { label: "Work", href: "/#work" },
  { label: "Posters", href: "/#posters" },
  { label: "Growth", href: "/#growth" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
];
