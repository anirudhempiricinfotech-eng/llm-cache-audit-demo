// NEAR-ZERO REPEAT RATE: each prompt is assembled from a unique fake user profile.

export async function generatePersonalizedRecommendation(profile) {
  const { name, accountId, accountTier, recentPurchases, rewardBalance } = profile;

  const personalizedInput = [
    `Customer name: ${name}`,
    `Demo account: ${accountId}`,
    `Tier: ${accountTier}`,
    `Recent purchases: ${recentPurchases.join(", ")}`,
    `Reward balance: ${rewardBalance} points`,
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      instructions:
        "Create two personalized DemoShop recommendations from the supplied fake customer profile.",
      input: personalizedInput,
      max_output_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`Recommendation LLM request failed: ${response.status}`);
  }

  return response.json();
}

