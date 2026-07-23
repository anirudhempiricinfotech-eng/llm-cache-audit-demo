import OpenAI from "openai";

const client = new OpenAI();

// prompt_name in llm_call_logs: product_description_generator
export const MODEL = "gpt-4.1-mini";
export const CATEGORY_STYLES = {
  beauty: "polished and sensory",
  books: "curious and editorial",
  electronics: "precise and feature-led",
  fitness: "energetic and motivating",
  "home-kitchen": "warm and practical",
};

export function buildProductInput(category) {
  const style = CATEGORY_STYLES[category];
  if (!style) {
    throw new Error("Select a supported catalog category.");
  }
  return `Catalog category: ${category}. Writing style: ${style}.`;
}

export async function generateProductDescription(category) {
  const inputText = buildProductInput(category);

  return client.responses.create({
    model: MODEL,
    input: [
      {
        role: "system",
        content:
          "Write a concise ecommerce product description in the requested category and style.",
      },
      { role: "user", content: inputText },
    ],
    temperature: 0.8,
  });
}
