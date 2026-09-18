export const defaultTools = [
  {
    slug: 'ctc-calculator',
    name: 'CTC to In-Hand Salary Calculator',
    category: 'salary',
    countries: ['IN', 'UK'],
    scope: 'LOCALIZED',
    computeConfig: {
      IN: {
        standardDeduction: 75000, // 2026 New Tax Regime standard deduction
        basicSalaryPercentage: 50,
        hraPercentage: 20,
        epfRate: 12,
        maxEpfWageCeiling: 15000, // optional ₹1800/mo cap
        professionalTaxAnnual: 2400,
        rebate87aLimit: 700000, // Zero tax if taxable income <= 7 Lakhs
        taxSlabsNewRegime: [
          { min: 0, max: 300000, rate: 0 },
          { min: 300000, max: 700000, rate: 0.05 },
          { min: 700000, max: 1000000, rate: 0.1 },
          { min: 1000000, max: 1200000, rate: 0.15 },
          { min: 1200000, max: 1500000, rate: 0.2 },
          { min: 1500000, max: Infinity, rate: 0.3 },
        ],
        cessRate: 0.04,
      },
      UK: {
        personalAllowance: 12570,
        basicRateLimit: 50270,
        basicRate: 0.2,
        higherRate: 0.4,
        additionalRateLimit: 125140,
        additionalRate: 0.45,
        nationalInsuranceRate: 0.08, // 8% between £12,570 and £50,270
      },
    },
    seo: {
      title: 'CTC to In-Hand Salary Calculator 2026 | Maurya Technologies',
      description: 'Calculate your exact monthly in-hand take-home pay from annual CTC under the 2026 New Tax Regime with EPF, HRA, and standard deduction.',
      primaryKeyword: 'ctc to in hand salary calculator',
      faqSchema: [
        {
          question: 'What is the standard deduction in the 2026 New Tax Regime in India?',
          answer: 'The standard deduction for salaried employees under the New Tax Regime is ₹75,000 per financial year.',
        },
        {
          question: 'How is in-hand salary calculated from annual CTC?',
          answer: 'Monthly in-hand salary is calculated as: (Gross Monthly Salary - Employee EPF Contribution - Professional Tax - Monthly Income Tax TDS).',
        },
      ],
    },
    status: 'published',
    enabled: true,
  },
  {
    slug: 'hourly-to-annual-salary',
    name: 'Hourly to Annual Salary & Tax Calculator',
    category: 'salary',
    countries: ['US', 'UK'],
    scope: 'LOCALIZED',
    computeConfig: {
      US: {
        standardHoursPerYear: 2080, // 40 hours/week * 52 weeks
        standardDeductionSingle: 14600,
        ficaRateW2: 0.0765, // 6.2% Social Security + 1.45% Medicare
        ficaRate1099: 0.153, // Self-employment tax
        federalBracketsSingle: [
          { min: 0, max: 11600, rate: 0.1 },
          { min: 11600, max: 47150, rate: 0.12 },
          { min: 47150, max: 100525, rate: 0.22 },
          { min: 100525, max: 191950, rate: 0.24 },
          { min: 191950, max: 243725, rate: 0.32 },
          { min: 243725, max: 609350, rate: 0.35 },
          { min: 609350, max: Infinity, rate: 0.37 },
        ],
        defaultStateTaxRate: 0.045, // Average state tax estimate
      },
      UK: {
        standardHoursPerYear: 1950, // 37.5 hours/week * 52 weeks
        personalAllowance: 12570,
        basicRate: 0.2,
        higherRate: 0.4,
      },
    },
    seo: {
      title: 'Hourly to Annual Salary Calculator with Taxes (2026) | Maurya Technologies',
      description: 'Convert your hourly wage to weekly, monthly, and annual gross pay. Estimate federal tax, FICA, and take-home pay for W-2 and 1099 contractors.',
      primaryKeyword: 'hourly to annual salary calculator',
      faqSchema: [
        {
          question: 'How many work hours are in a year for a 40-hour work week?',
          answer: 'There are 2,080 work hours in a standard year (40 hours per week multiplied by 52 weeks).',
        },
        {
          question: 'What is the difference between W-2 and 1099 take-home pay?',
          answer: 'W-2 employees share FICA taxes (7.65% paid by employee, 7.65% by employer). 1099 independent contractors pay the full 15.3% self-employment tax.',
        },
      ],
    },
    status: 'published',
    enabled: true,
  },
  {
    slug: 'emi-calculator',
    name: 'Home & Personal Loan EMI Calculator',
    category: 'finance',
    countries: ['IN'],
    scope: 'COUNTRY_EXCLUSIVE',
    computeConfig: {
      IN: {
        defaultPrincipal: 2500000,
        defaultInterestRate: 8.5,
        defaultTenureYears: 20,
      },
    },
    seo: {
      title: 'Home & Loan EMI Calculator India | Maurya Technologies',
      description: 'Calculate monthly loan EMI for home, personal, and auto loans. View total interest payable and loan amortization visual breakdown.',
      primaryKeyword: 'emi calculator india',
      faqSchema: [
        {
          question: 'What is the formula used to calculate EMI?',
          answer: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months.',
        },
      ],
    },
    status: 'published',
    enabled: true,
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage & Discount Calculator',
    category: 'general',
    countries: ['IN', 'US', 'UK'],
    scope: 'GLOBAL',
    computeConfig: {
      defaultMode: 'percentage_of',
    },
    seo: {
      title: 'Free Online Percentage & Discount Calculator | Maurya Technologies',
      description: 'Quickly calculate percentage of a number, percentage increase/decrease, markups, discounts, and exam score percentages instantly.',
      primaryKeyword: 'percentage calculator',
      faqSchema: [
        {
          question: 'How do you calculate percentage increase?',
          answer: 'Percentage Increase = [(New Value - Original Value) / Original Value] x 100.',
        },
      ],
    },
    status: 'published',
    enabled: true,
  },
  {
    slug: 'age-calculator',
    name: 'Exact Age & Date Difference Calculator',
    category: 'general',
    countries: ['IN', 'US', 'UK'],
    scope: 'GLOBAL',
    computeConfig: {
      calculateTimeUnits: true,
    },
    seo: {
      title: 'Exact Age Calculator: Years, Months, Days & Birthday Countdown',
      description: 'Calculate your exact age today in years, months, days, hours, and minutes. See how many days remain until your next birthday.',
      primaryKeyword: 'age calculator online',
      faqSchema: [
        {
          question: 'How accurate is this online age calculator?',
          answer: 'This age calculator runs exact Gregorian calendar math in your browser, precisely accounting for leap years and different month lengths.',
        },
      ],
    },
    status: 'published',
    enabled: true,
  },
  {
    slug: 'ats-resume-checker',
    name: 'Free ATS Resume Checker & Parser 2026',
    category: 'salary',
    countries: ['IN', 'US', 'UK'],
    scope: 'GLOBAL',
    computeConfig: {},
    seo: {
      title: 'Free ATS Resume Checker & Parser 2026 | Maurya Technologies',
      description: 'Check your resume ATS compatibility score instantly. Real-time scoring for action verbs, tech keywords, and measurable impact metrics. 100% private in-browser scanner.',
      primaryKeyword: 'ats resume checker free',
      faqSchema: [
        {
          question: 'What is an ATS and why does my score matter?',
          answer: 'Applicant Tracking Systems (ATS) like Workday and Greenhouse screen out 75%+ of resumes before recruiters read them. Scoring 80+ ensures your application passes keyword filtering.',
        },
        {
          question: 'Does this ATS checker save my resume data?',
          answer: 'No. All parsing runs 100% client-side in your web browser. Your resume text is never transmitted or saved to any database.',
        },
      ],
    },
    status: 'published',
    enabled: true,
  },
];
