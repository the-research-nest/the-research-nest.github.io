export type ResearchPostStatus = "published" | "up-next";

export type ResearchPost = {
  slug: string;
  title: string;
  deck: string;
  excerpt: string;
  publishedOn: string;
  readingTime: string;
  status: ResearchPostStatus;
  tags: string[];
  component?: "research-guide";
};

const researchPosts: ResearchPost[] = [
  {
    slug: "minimum-brain-size-research-guide",
    title: "How Small Can an AI Brain Be and Still Actually Learn?",
    deck: "A plain-English map of the tiny-model agenda: scaling laws, grokking, data quality, and the 10K-parameter micro-lab.",
    excerpt:
      "This is the anchor piece for the current research program. It lays out the core question, the literature behind it, and the phased experiment plan we are using to probe minimum viable intelligence.",
    publishedOn: "March 2026",
    readingTime: "18 min read",
    status: "published",
    tags: ["Research Guide", "Tiny Models", "Grokking"],
    component: "research-guide"
  },
];

export const publishedResearchPosts = researchPosts.filter((post) => post.status === "published");

export function getResearchPost(slug: string) {
  return researchPosts.find((post) => post.slug === slug && post.status === "published");
}
