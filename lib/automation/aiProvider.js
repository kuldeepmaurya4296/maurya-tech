/**
 * Pluggable AI Provider Adapter
 * Provider-agnostic interface (§8.2) supporting Groq free tier, Gemini, or local fallback.
 */

export async function generateContentDraft({
  topic,
  country = 'IN',
  category = 'Technology',
  targetKeyword = '',
  clusterType = 'spoke',
  relatedToolSlug = '',
}) {
  const provider = (process.env.AI_PROVIDER || 'none').toLowerCase();
  const countryName = country === 'IN' ? 'India' : country === 'US' ? 'United States' : 'United Kingdom';
  const currencySymbol = country === 'IN' ? '₹' : country === 'US' ? '$' : '£';

  // System prompt enforcing Google Helpful Content & E-E-A-T
  const systemPrompt = `You are a Senior Technical and Financial Architecture Writer at Maurya Technologies.
Generate an authoritative, detailed technical guide tailored for ${countryName}.
Must include:
1. Clear section headings (## and ###).
2. A markdown comparison table with actual data.
3. Country-specific terminology (Currency ${currencySymbol}, local regulations).
4. An actionable FAQ section with 3 realistic Q&As.
5. Natural mention of the companion tool "${relatedToolSlug || 'calculator'}".
Tone: Professional, authoritative, zero fluff, high signal-to-noise ratio.`;

  // 1. Groq Free Tier (Llama 3.3 70B)
  if (provider === 'groq' && process.env.GROQ_API_KEY) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Write a comprehensive guide on: "${topic}". Primary keyword: "${targetKeyword || topic}".` },
          ],
          temperature: 0.4,
          max_tokens: 3500,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content || '';
        return parseGeneratedOutput(topic, rawContent, country, category, clusterType, relatedToolSlug);
      }
    } catch (err) {
      console.warn('Groq AI draft generation failed, falling back to structured template:', err.message);
    }
  }

  // 2. Default Zero-Cost Fallback: Structured Markdown Template
  return generateStructuredTemplate(topic, country, category, clusterType, relatedToolSlug, targetKeyword);
}

function parseGeneratedOutput(topic, content, country, category, clusterType, relatedToolSlug) {
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const lines = content.split('\n').filter((l) => l.trim().length > 0);
  const firstH1 = lines.find((l) => l.startsWith('# '));
  const title = firstH1 ? firstH1.replace('# ', '').trim() : topic;

  // Extract first paragraph for excerpt
  const firstParagraph = lines.find((l) => !l.startsWith('#') && !l.startsWith('|') && l.length > 50) || topic;
  const excerpt = firstParagraph.slice(0, 180) + '...';

  // Basic FAQ parser
  const faqSchema = [];
  const faqMatches = content.match(/###\s*(.+?)\n([\s\S]+?)(?=###|##|$)/g);
  if (faqMatches) {
    for (const match of faqMatches.slice(0, 4)) {
      const parts = match.split('\n');
      const question = parts[0].replace(/###\s*/, '').trim();
      const answer = parts.slice(1).join(' ').trim();
      if (question && answer) {
        faqSchema.push({ question, answer });
      }
    }
  }

  return {
    title,
    slug,
    excerpt,
    content,
    faqSchema,
    category,
    clusterType,
    canonicalCountry: country,
    language: country === 'IN' ? 'en-IN' : country === 'US' ? 'en-US' : 'en-GB',
    relatedToolSlug,
  };
}

function generateStructuredTemplate(topic, country, category, clusterType, relatedToolSlug, targetKeyword) {
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const countryName = country === 'IN' ? 'India' : country === 'US' ? 'the United States' : 'the United Kingdom';
  const currencySymbol = country === 'IN' ? '₹' : country === 'US' ? '$' : '£';

  const content = `## Executive Overview: ${topic}

For professionals and businesses operating in ${countryName}, understanding the exact regulatory and technical nuances of **${topic}** is critical in 2026. 

This guide delivers an engineer-curated analysis covering core benchmarks, tax/compensation formulas, and strategic execution steps.

---

## Technical & Quantitative Comparison

| Metric / Parameter | Standard Baseline | 2026 Optimized Benchmark |
|---|---|---|
| Regulatory Standard | Previous FY Baseline | **2026 Current Code Compliance** |
| Average Financial Impact | Standard deduction / withholding | **${currencySymbol} Maximized Net Savings** |
| Execution Latency | Manual spreadsheet estimation | **Instant Automated Client-Side Math** |

---

## Key Analysis & Practical Implementation

### 1. Structural Requirements
- Ensure full alignment with 2026 statutory provisions and banking guidelines.
- Audit all deductions and employer-matching contributions prior to filing.

### 2. High-Impact Optimization Tips
- Benchmark compensation figures using localized tools rather than national aggregates.
- Retain complete documentation for all claimed deductions and technical expenditures.

---

## Interactive Companion Calculation

To test your specific figures with verified 2026 formulas, run the numbers directly in your browser:

👉 **[Launch the Related Calculator Engine](/${country.toLowerCase()}/tools/${relatedToolSlug || 'ctc-calculator'})**

---

## Frequently Asked Questions

### What are the main changes introduced in 2026 for this area?
The 2026 updates introduced enhanced standard deduction limits and revised threshold bands to account for inflation and modern workforce realities in ${countryName}.

### How can I verify my exact figures?
You can use our free browser-based tools which run 100% client-side with zero data transmission to external servers.
`;

  return {
    title: topic,
    slug,
    excerpt: `Complete 2026 guide to ${topic} for professionals in ${countryName}. Key formulas, comparison tables, and FAQ analysis.`,
    content,
    faqSchema: [
      {
        question: `What are the key regulations for ${topic}?`,
        answer: `Statutory guidelines in ${countryName} require strict adherence to 2026 compliance codes and accurate calculation of all base components.`,
      },
      {
        question: 'Where can I calculate my numbers?',
        answer: `You can use the companion calculator on Maurya Technologies for instant 0ms verification.`,
      },
    ],
    category,
    clusterType,
    canonicalCountry: country,
    language: country === 'IN' ? 'en-IN' : country === 'US' ? 'en-US' : 'en-GB',
    relatedToolSlug,
  };
}
