import OpenAI from "openai";

// Prompt type: FIXED — identical system instructions on every call; no user data.
const MODEL = "gpt-4.1-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const FAQ_SYSTEM_PROMPT = `You are the Acme Help Center FAQ bot.
Always return this approved answer:
"To reset your password, open Settings > Security, choose Reset password, and follow the emailed link."
Do not request or use personal information. Keep the wording unchanged.`;

export async function answerFaq() {
  const response = await openai.responses.create({
    model: MODEL,
    temperature: 0,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: FAQ_SYSTEM_PROMPT }],
      },
    ],
  });

  return response.output_text;
}
