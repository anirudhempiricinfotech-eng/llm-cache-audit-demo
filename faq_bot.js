import OpenAI from "openai";

const client = new OpenAI();
const MODEL = "gpt-4.1-mini";

const FAQ_SYSTEM_PROMPT =
  "You are the Acme FAQ bot. Answer only from the approved FAQ: shipping takes 3–5 business days, returns are accepted within 30 days, and support is available at support@example.com. Keep every answer concise.";

export async function answerFaq() {
  return client.responses.create({
    model: MODEL,
    input: [{ role: "system", content: FAQ_SYSTEM_PROMPT }],
  });
}
