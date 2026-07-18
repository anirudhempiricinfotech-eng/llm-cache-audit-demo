// MEDIUM REPEAT RATE: only the selected catalog category changes the prompt.

const CATEGORY_STYLES = Object.freeze({
  electronics: "precise and feature-led",
  "home-kitchen": "warm and practical",
  fitness: "energetic and motivating",
  beauty: "polished and sensory",
  books: "curious and editorial",
});

export async function generateProductDescription(category) {
  const style = CATEGORY_STYLES[category];

  if (!style) {
    throw new Error(`Unsupported category: ${category}`);
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      instructions:
        "Write a 90-word description for a generic demo catalog item. Never invent safety claims.",
      input: `Catalog category: ${category}. Writing style: ${style}.`,
      max_output_tokens: 180,
    }),
  });

  if (!response.ok) {
    throw new Error(`Product description LLM request failed: ${response.status}`);
  }

  return response.json();
}

