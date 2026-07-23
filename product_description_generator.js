import OpenAI from "openai";

// Prompt type 2: low variation from a five-option category dropdown.
export const PROMPT_NAME = "product_description_generator";
export const MODEL = "gpt-4.1-mini";
export const PROVIDER = "OpenAI";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const STYLE_BY_CATEGORY = {
  beauty: "polished and sensory",
  books: "curious and editorial",
  electronics: "precise and feature-led",
  fitness: "energetic and motivating",
  "home-kitchen": "warm and practical"
};

export function buildProductInput(category) {
  const style = STYLE_BY_CATEGORY[category];
  if (!style) {
    throw new Error(`Unsupported category: ${category}`);
  }

  return `Catalog category: ${category}. Writing style: ${style}.`;
}

export async function generateProductDescription(category) {
  const input = buildProductInput(category);
  const response = await client.responses.create({
    model: MODEL,
    instructions:
      "Write one short catalog description for the selected category and style. Vary the wording and product details naturally.",
    input,
    temperature: 0.8
  });

  return response.output_text;
}
