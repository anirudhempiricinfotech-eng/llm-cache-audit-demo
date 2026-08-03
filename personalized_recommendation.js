import OpenAI from "openai";

// Prompt type 3: rebuilt for every customer from personal account data.
export const PROMPT_NAME = "personalized_recommendation";
export const MODEL = "gpt-4.1-mini";
export const PROVIDER = "OpenAI";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function buildPersonalizedInput(customer) {
  return [
    `Customer name: ${customer.name}`,
    `Demo account: ${customer.accountId}`,
    `Tier: ${customer.tier}`,
    `Recent purchases: ${customer.recentPurchases.join(" and ")}`,
    `Reward balance: ${customer.rewardPoints} points`
  ].join("\n");
}

export async function generatePersonalizedRecommendation(customer) {
  const input = buildPersonalizedInput(customer);
  const response = await client.responses.create({
    model: MODEL,
    instructions:
      "Recommend two relevant products for this individual customer using their account tier, purchase history, and reward balance.",
    input,
    temperature: 0.7
  });

  return response.output_text;
}
