/**
 * 2026 Content Quality Gate
 * Enforces Google Helpful Content & E-E-A-T guidelines (§7.3 & §7.4)
 */

export function runQualityGate(post = {}) {
  const content = post.content || '';
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const isToolGuide = post.clusterType === 'tool_guide';
  const minRequiredWords = isToolGuide ? 800 : 1200;

  const checks = {
    minWordCount: {
      passed: wordCount >= minRequiredWords,
      actual: wordCount,
      target: minRequiredWords,
      label: `Word Count (Min ${minRequiredWords} words)`,
    },
    hasFaq: {
      passed: Boolean(
        (Array.isArray(post.faqSchema) && post.faqSchema.length >= 2) ||
        content.toLowerCase().includes('## frequently asked') ||
        content.toLowerCase().includes('## faqs')
      ),
      label: 'Structured FAQ with at least 2 Q&As',
    },
    hasTable: {
      passed: /\|(.+)\|[\r\n]+\|[-:| ]+\|/.test(content),
      label: 'Markdown Comparison Table or Data Breakdown',
    },
    hasInternalToolLink: {
      passed: Boolean(
        post.relatedToolSlug ||
        /\/tools\//.test(content) ||
        /\/(in|us|uk)\/tools\//.test(content)
      ),
      label: 'Internal Anchor Link to Relevant Calculator / Tool',
    },
    hasAuthorAttribution: {
      passed: Boolean(post.author && post.author.trim().length > 2),
      label: 'Author Credibility & E-E-A-T Attribution',
    },
    hasHeadingsHierarchy: {
      passed: (content.match(/## /g) || []).length >= 3,
      label: 'Logical H2/H3 Section Hierarchy',
    },
  };

  // Calculate weighted score out of 100
  let score = 0;
  if (checks.minWordCount.passed) score += 30;
  else if (wordCount >= minRequiredWords * 0.7) score += 15;

  if (checks.hasFaq.passed) score += 20;
  if (checks.hasTable.passed) score += 15;
  if (checks.hasInternalToolLink.passed) score += 15;
  if (checks.hasAuthorAttribution.passed) score += 10;
  if (checks.hasHeadingsHierarchy.passed) score += 10;

  const passedChecksCount = Object.values(checks).filter((c) => c.passed).length;
  const totalChecks = Object.keys(checks).length;

  return {
    score,
    passed: score >= 75,
    status: score >= 85 ? 'excellent' : score >= 75 ? 'passed' : score >= 50 ? 'needs_improvement' : 'rejected',
    passedCount: passedChecksCount,
    totalChecks,
    checks,
  };
}
