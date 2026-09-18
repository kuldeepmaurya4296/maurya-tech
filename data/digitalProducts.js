export const digitalProducts = [
  {
    sku: 'resume-pack-2026',
    title: '2026 ATS-Optimized Tech Resume & Salary Negotiation Kit',
    tagline: 'Get 3x more interview callbacks with recruiters at top tech firms.',
    badge: 'Best Seller',
    prices: {
      IN: { amount: 199, currency: 'INR', display: '₹199' },
      US: { amount: 4.99, currency: 'USD', display: '$4.99' },
      UK: { amount: 3.99, currency: 'GBP', display: '£3.99' },
    },
    features: [
      '5 battle-tested ATS-compliant Resume Templates (Word, PDF & LaTeX format)',
      '50+ High-impact bullet point formulas for Software, QA, and Mobile devs',
      'Salary negotiation cheat sheet & email counter-offer scripts',
      'Tech recruiter checklist: exact keywords parsed by Workday & Greenhouse',
      'Instant digital download with free lifetime updates',
    ],
    downloadUrl: '/downloads/samples/maurya-tech-resume-kit-preview.pdf',
  },
  {
    sku: 'career-guide-1on1',
    title: '1-on-1 Tech Career Advisory & Resume Deep-Dive (45 Mins)',
    tagline: 'Private video session with engineering leadership at Maurya Technologies.',
    badge: 'High Impact',
    prices: {
      IN: { amount: 999, currency: 'INR', display: '₹999' },
      US: { amount: 29.99, currency: 'USD', display: '$29.99' },
      UK: { amount: 24.99, currency: 'GBP', display: '£24.99' },
    },
    features: [
      '45-minute live 1-on-1 strategy call with a Lead Tech Architect',
      'Thorough line-by-line review of your resume and GitHub profile',
      'Targeted career roadmap for Full-Stack, Flutter, DevOps, or QA roles',
      'Live mock interview questions and structured feedback',
      'Recorded session link and written action plan delivered within 24 hours',
    ],
    downloadUrl: null,
  },
];

export function getProductBySku(sku) {
  return digitalProducts.find((p) => p.sku === sku) || null;
}
