import OpenAI from "openai";

const client = new OpenAI();
export const MODEL = "gpt-4.1-mini";

export async function generatePersonalizedRecommendation(user) {
  const {
    name,
    accountId,
    accountTier,
    preferences = [],
    recentPurchases = [],
  } = user;

  if (!name || !accountId || !accountTier) {
    throw new Error("name, accountId, and accountTier are required.");
  }

  // Construct a new, user-specific prompt for every call.
  const personalizedPrompt = `
Create a helpful product recommendation for this customer.
Name: ${name}
Account ID: ${accountId}
Account tier: ${accountTier}
Preferences: ${preferences.join(", ") || "none provided"}
Recent purchases: ${recentPurchases.join(", ") || "none"}
Explain briefly why the recommendation fits this individual account.
`.trim();

  const response = await client.responses.create({
    model: MODEL,
    input: [
      { role: "system", content: "You are a personalized shopping assistant." },
      { role: "user", content: personalizedPrompt },
    ],
  });

  return response.output_text;
}
