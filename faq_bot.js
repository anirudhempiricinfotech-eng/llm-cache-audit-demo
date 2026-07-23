import OpenAI from "openai";

const client = new OpenAI();

// prompt_name in llm_call_logs: faq_bot
// Fixed system-only fixture: there is no per-user or per-request input.
export const MODEL = "gpt-4.1-mini";
export const FAQ_SYSTEM_PROMPT =
  "Return the standard DemoShop FAQ answer set for the public help center.";

export async function answerFaq() {
  return client.responses.create({
    model: MODEL,
    input: [
      {
        role: "system",
        content: FAQ_SYSTEM_PROMPT,
      },
    ],
  });
}
