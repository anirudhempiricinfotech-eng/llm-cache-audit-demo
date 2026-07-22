import OpenAI from "openai";

const client = new OpenAI();
const MODEL = "gpt-4.1-mini";
const PRODUCT_CATEGORIES = [
  "electronics",
  "home",
  "beauty",
  "fitness",
  "outdoors",
];

export async function generateProductDescription(category) {
  if (!PRODUCT_CATEGORIES.includes(category)) {
    throw new Error("category must be selected from PRODUCT_CATEGORIES");
  }

  const prompt = [
    "Write a concise ecommerce product description.",
    `Selected dropdown category: ${category}`,
    "Mention two category-relevant benefits and end with a short call to action.",
  ].join("\n");

  return client.responses.create({
    model: MODEL,
    input: prompt,
    temperature: 0.8,
  });
}

export { PRODUCT_CATEGORIES };
