import OpenAI from "openai";

// Prompt type: FULLY DYNAMIC — rebuilt from personal account data on every call.
const MODEL = "gpt-4.1-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createPersonalizedRecommendation({
  name,
  accountTier,
  recentPurchases,
  preferences,
  budget,
}) {
  const prompt = `Create a personalized recommendation for this customer.
Name: ${name}
Account tier: ${accountTier}
Recent purchases: ${recentPurchases.join(", ")}
Preferences: ${preferences.join(", ")}
Budget: ${budget}
Explain why the recommendation fits this specific account.
Do not reveal or infer any information not supplied above.`;

  const response = await openai.responses.create({
    model: MODEL,
    input: prompt,
  });

  return response.output_text;
}
