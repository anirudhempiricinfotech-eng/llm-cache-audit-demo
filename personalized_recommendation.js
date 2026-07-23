import OpenAI from "openai";

const client = new OpenAI();

// prompt_name in llm_call_logs: personalized_recommendation
export const MODEL = "gpt-4.1-mini";

export function buildPersonalizedInput(customer) {
  const { name, accountId, tier, recentPurchases, rewardBalance } = customer;
  return [
    `Customer name: ${name}`,
    `Demo account: ${accountId}`,
    `Tier: ${tier}`,
    `Recent purchases: ${recentPurchases.join(" and ")}`,
    `Reward balance: ${rewardBalance} points`,
  ].join("\n");
}

export async function createPersonalizedRecommendation(customer) {
  const inputText = buildPersonalizedInput(customer);

  return client.responses.create({
    model: MODEL,
    input: [
      {
        role: "system",
        content:
          "Recommend two relevant products and explain why they fit this specific customer.",
      },
      { role: "user", content: inputText },
    ],
  });
}
