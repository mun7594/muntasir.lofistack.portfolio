export interface Agent {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  longDescription: string;
  createdDate: string;
  week: number;
  agentNumber: number;
  category: string;
  tags: string[];
  techStack: string[];
  prompt: string;
  codeLink: string;
  liveLink: string;
}

export const agents: Agent[] = [
  {
    id: "1",
    slug: "quote-generator",
    name: "Quote Generator Agent",
    type: "generator",
    description: "AI-powered quote generator across multiple categories",
    longDescription:
      "An intelligent agent that generates unique, witty quotes and jokes based on user-selected categories. Uses Claude AI to create personalized, memorable quotes for motivation, humor, wisdom, success, and inspiration.",
    createdDate: "2026-10-13",
    week: 3,
    agentNumber: 1,
    category: "Generator",
    tags: ["AI", "Generator", "Claude", "Quotes", "Interactive"],
    techStack: ["React", "TypeScript", "Next.js", "Claude API", "Tailwind CSS"],
    prompt: `Generate a single {category} quote or joke. Format: Just the quote/joke text, nothing else. Make it witty and memorable. Categories include: motivational, funny, inspirational, wisdom, success.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink:
      "https://muntasir-lofistack-portfolio.vercel.app/agents/quote-generator",
  },
];

export const getAgentBySlug = (slug: string): Agent | undefined => {
  return agents.find((a) => a.slug === slug);
};
