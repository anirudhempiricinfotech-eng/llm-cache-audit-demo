import OpenAI from "openai";

const client = new OpenAI();
export const MODEL = "gpt-4.1-mini";

export const PRODUCT_CATEGORIES = [
  "electronics",
  "home-and-kitchen",
  "beauty",
  "sports-and-outdoors",
  "books",
];

const BASE_INSTRUCTIONS =
  "Write a vivid 90-word ecommerce description. Mention two benefits and end with a short call to action.";

export async function generateProductDescription(category) {
  if (!PRODUCT_CATEGORIES.includes(category)) {
    throw new Error("Choose a category from the supported dropdown options.");
  }

  const categoryPrompt = `${BASE_INSTRUCTIONS}
Selected category: ${category}
Adapt vocabulary, benefits, and tone to this category.`;

  const response = await client.responses.create({
    model: MODEL,
    input: [
      { role: "system", content: "You are an ecommerce copywriter." },
      { role: "user", content: categoryPrompt },
    ],
  });

  return response.output_text;
}
