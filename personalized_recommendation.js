import OpenAI from "openai";

const client = new OpenAI();
const MODEL = "gpt-4.1-mini";

export async function createPersonalizedRecommendation(user) {
  const {
    name,
    accountId,
    membershipTier,
    recentPurchases,
    preferredCategories,
  } = user;

  const prompt = [
    "Create one personalized product recommendation for this customer.",
    `Customer name: ${name}`,
    `Account ID: ${accountId}`,
    `Membership tier: ${membershipTier}`,
    `Recent purchases: ${recentPurchases.join(", ")}`,
    `Preferred categories: ${preferredCategories.join(", ")}`,
    "Explain briefly why the recommendation fits this specific account.",
  ].join("\n");

  return client.responses.create({
    model: MODEL,
    input: prompt,
  });
}
