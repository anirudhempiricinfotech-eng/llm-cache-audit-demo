# LLM Cache Audit Demo

Synthetic fixtures for testing an LLM cost and prompt-repeat auditing automation.
All names and account details in the database seed are fake.

## Prompt patterns

| File | Prompt behavior | Expected audit signal |
| --- | --- | --- |
| `faq_bot.js` | Completely fixed system instructions and fixed input; no user data | High repeat/cache opportunity |
| `product_description_generator.js` | Varies only across five catalog-category dropdown choices | Medium repeat/cache opportunity |
| `personalized_recommendation.js` | Built from a unique fake customer and account profile on every call | Near-zero repeat/cache opportunity |

Each JavaScript file makes an explicit OpenAI Responses API call with model
`gpt-4.1-mini`. The examples read `OPENAI_API_KEY` from the environment and are
source fixtures only; the setup does not execute billable API calls.

## Supabase fixture

The `llm-cache-audit` Supabase project contains `public.llm_call_logs` with:

`id`, `prompt_name`, `input_text`, `output_text`, `input_tokens`,
`output_tokens`, `model`, `provider`, and `created_at`.

`supabase_setup.sql` resets that dedicated table and inserts 180 records across
the preceding seven days:

- 70 `faq_bot` calls with one exact input/output pair.
- 65 `product_description_generator` calls over five inputs; about one-third
  use a meaningfully different output for the same category.
- 45 `personalized_recommendation` calls with 45 distinct fake profiles.

Every record uses `gpt-4.1-mini`, provider `OpenAI`, 200–600 input tokens, and
100–400 output tokens. The final SQL query verifies counts, repeat patterns,
token ranges, models/providers, and timestamp coverage.

