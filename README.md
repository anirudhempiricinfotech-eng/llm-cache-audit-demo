# LLM Cache Audit Demo

Synthetic fixtures for testing an LLM cost and prompt-repeat auditing automation.
All names and account details in the database seed are fake.

## Prompt patterns

| File | Prompt behavior | Expected audit signal |
| --- | --- | --- |
| `faq_bot.js` | Completely fixed system instructions and fixed input; no user data | High cache/repeat opportunity |
| `product_description_generator.js` | Varies only across five catalog-category dropdown choices | Medium cache/repeat opportunity |
| `personalized_recommendation.js` | Built from a unique fake customer and account profile on each call | Near-zero repeat opportunity |

Each JavaScript file makes an explicit request to the OpenAI Responses API and
reads `OPENAI_API_KEY` from the environment. The examples are not executed by
the setup; they are source fixtures for the auditor.

## Supabase fixture

Run `supabase_setup.sql` once in a new project named `llm-cache-audit`. It creates
`public.llm_call_logs` with all eight requested columns and inserts 180 records
spread across the previous seven days. Every record uses `gpt-4.1-mini`, provider
`OpenAI`, and a realistic `tokens_used` value between 300 and 900:

- 70 `faq_bot` calls sharing one exact input.
- 65 `product_description_generator` calls cycling through five exact inputs.
- 45 `personalized_recommendation` calls with 45 distinct fake profiles.

The last query in the SQL file returns the repeat distribution and total token
usage for verification.
