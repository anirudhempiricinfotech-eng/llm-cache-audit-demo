import OpenAI from "openai";

// Prompt type: SEMI-DYNAMIC — varies only with a controlled category dropdown.
const MODEL = "gpt-4.1-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CATEGORY_PROFILES = {
  electronics: { style: "precise and feature-led", audience: "tech shoppers" },
  "home-kitchen": { style: "warm and practical", audience: "busy households" },
  fitness: { style: "energetic and motivating", audience: "active customers" },
  beauty: { style: "polished and sensory", audience: "self-care shoppers" },
  books: { style: "curious and editorial", audience: "avid readers" },
};

export async function generateProductDescription(category) {
  const categoryProfile = CATEGORY_PROFILES[category];
  if (!categoryProfile) throw new Error(`Unsupported category: ${category}`);

  const prompt = `Write a 45-word product description.
Catalog category: ${category}.
Writing style: ${categoryProfile.style}.
Target audience: ${categoryProfile.audience}.
Do not invent prices, discounts, or certifications.`;

  const response = await openai.responses.create({
    model: MODEL,
    input: prompt,
  });

  return response.output_text;
}
