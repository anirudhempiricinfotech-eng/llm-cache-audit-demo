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
`public.llm_call_logs` with the requested six columns and inserts 96 records
spread across the previous seven days:

- 42 `faq_bot` calls sharing one exact input.
- 35 `product_description_generator` calls cycling through five exact inputs.
- 28 `personalized_recommendation` calls with 28 distinct fake profiles.

The last query in the SQL file returns the repeat distribution and total token
usage for verification.
