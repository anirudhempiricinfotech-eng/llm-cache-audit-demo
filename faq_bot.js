import OpenAI from "openai";

// Prompt type 1: completely fixed and contains no user data.
export const PROMPT_NAME = "faq_bot";
export const MODEL = "gpt-4.1-mini";
export const PROVIDER = "OpenAI";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const FIXED_SYSTEM_INSTRUCTIONS = [
  "You are the DemoShop public FAQ bot.",
  "Return only the approved standard answer covering shipping, returns, receipts, and account access.",
  "Use the same concise wording every time; do not personalize the answer."
].join(" ");

export const FIXED_INPUT_TEXT =
  "Return the standard DemoShop FAQ answer set for the public help center.";

export async function runFaqBot() {
  const response = await client.responses.create({
    model: MODEL,
    instructions: FIXED_SYSTEM_INSTRUCTIONS,
    input: FIXED_INPUT_TEXT,
    temperature: 0
  });

  return response.output_text;
}
