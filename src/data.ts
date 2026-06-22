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
  { label: "Work", href: "/work" },
  { label: "Growth", href: "/#growth" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
];

export const FAQ_ITEMS = [
  {
    question: "How long does a thumbnail take?",
    answer: "Most single thumbnails are delivered within 24–48 hours. Packages and custom projects may take 3–5 business days depending on complexity and revision rounds."
  },
  {
    question: "How many revisions are included?",
    answer: "Single thumbnails include 2 revisions. Package deals include unlimited revisions within the project scope. I work until you're 100% satisfied."
  },
  {
    question: "What files do you deliver?",
    answer: "You receive a full 4K high-resolution PNG/JPG optimized for YouTube, plus the source PSD/AI file upon request for premium packages."
  },
  {
    question: "Do you work with any YouTube niche?",
    answer: "Absolutely. I specialize in football/sports content, tech, finance, gaming, and lifestyle channels. If you have a unique niche, I'll research and adapt my style to match your audience."
  },
  {
    question: "Can I see more work before deciding?",
    answer: "Yes! Head to the Work Archive for the full portfolio, or check my Instagram @skullgfx for the latest drops. You can also request a direct link to my Google Drive archive."
  },
  {
    question: "How do I get started?",
    answer: "Hit the 'Start a Project' or 'Contact Me' button anywhere on the site. Share your channel link, video topic, and any reference images — I'll get back to you within a few hours."
  }
];

