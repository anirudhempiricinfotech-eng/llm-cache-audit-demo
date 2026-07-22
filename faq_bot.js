import OpenAI from "openai";

const client = new OpenAI();
export const MODEL = "gpt-4.1-mini";

const FAQ_SYSTEM_PROMPT = `
You are the Acme Store FAQ assistant.
Answer only from these fixed policies:
- Shipping takes 3-5 business days.
- Returns are accepted within 30 days with a receipt.
- Support is available Monday-Friday, 09:00-17:00 UTC.
Keep the answer concise and do not request or use personal user data.
`.trim();

export async function generateFaqAnswer() {
  const response = await client.responses.create({
    model: MODEL,
    input: [{ role: "system", content: FAQ_SYSTEM_PROMPT }],
  });

  return response.output_text;
}
