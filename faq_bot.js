// HIGH REPEAT RATE: every invocation sends the same fixed instructions and input.
// No user-supplied or personal data is included in this LLM call.

const FAQ_SYSTEM_INSTRUCTIONS = `You are the fixed FAQ assistant for DemoShop.
Always return the same concise help-center summary covering shipping, returns,
billing, and account access. Do not ask for, infer, or include user data.`;

const FIXED_FAQ_INPUT =
  "Return the standard DemoShop FAQ answer set for the public help center.";

export async function runFaqBot() {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      instructions: FAQ_SYSTEM_INSTRUCTIONS,
      input: FIXED_FAQ_INPUT,
      max_output_tokens: 220,
    }),
  });

  if (!response.ok) {
    throw new Error(`FAQ LLM request failed: ${response.status}`);
  }

  return response.json();
}
