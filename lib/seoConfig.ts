// SEO Analytics and Tracking
// This file contains SEO-related configurations and tracking codes

export const SEOConfig = {
  // Primary Keywords for Welford Lane Capitals
  primaryKeywords: [
    'Welford Lane Capitals',
    'elite investment performance', 
    'alternative investment strategies',
    'institutional portfolio management',
    'top performing assets',
    'fund performance vs S&P 500',
    'technology growth pool',
    'alternative credit',
    'real estate alpha',
    'minimum investment $50',
    'institutional investor hedge fund',
    'alpha generator',
    'high growth tech equities',
    'private credit strategies',
    'commercial real estate investments',
    'performance reports',
    'investor portal',
    'investment pools',
    'compliance risk disclosure',
    'premier hedge fund'
  ],

  // Geographic Keywords
  geographicKeywords: [
    'hedge fund alternatives UK',
    'private investment pools India', 
    'ICT trading strategies London',
    'fixed monthly returns investment Mumbai',
    'high mid low risk investment plans global',
    'Welford Lane Capitals investments New York'
  ],

  // Long-tail Keywords
  longTailKeywords: [
    'elite alternative investment management with proven performance',
    'technology growth pool +42.8% YTD performance',
    'alternative credit +18.5% YTD returns',
    'real estate alpha +26.3% YTD growth',
    'institutional grade investment opportunities minimum $50',
    'UK based private investment group global reach',
    'ICT trading strategies fixed monthly returns',
    'closed circle fund regulatory registration expansion'
  ],

  // Content Clusters
  contentClusters: {
    'Investment Performance': [
      'Technology Growth Pool performance',
      'Alternative Credit returns',
      'Real Estate Alpha growth',
      'Fund vs S&P 500 comparison',
      'YTD performance metrics',
      'Alpha generation strategies'
    ],
    'Investment Services': [
      'Elite investment management',
      'Institutional portfolio services',
      'Alternative investment strategies',
      'Private credit opportunities',
      'Commercial real estate investments',
      'High growth tech equities'
    ],
    'Investor Access': [
      'Minimum investment requirements',
      'Investor portal access',
      'Performance reports',
      'Investment pools overview',
      'Compliance and risk disclosure',
      'Institutional investor benefits'
    ]
  },

  // Meta Descriptions by Page
  metaDescriptions: {
    home: 'Welford Lane Capitals delivers elite alternative investment strategies with proven fund performance vs S&P 500. Technology Growth (+42.8% YTD), Alternative Credit (+18.5% YTD), Real Estate Alpha (+26.3% YTD). Minimum investment: $50.',
    about: 'Meet the Welford Lane Capitals leadership team. Founded in 2025, our UK-based experts deliver institutional-grade alternative investment strategies with proven performance.',
    services: 'Explore investment services: Technology Growth Pool (+42.8% YTD), Alternative Credit (+18.5% YTD), Real Estate Alpha (+26.3% YTD). $50 minimum investment.',
    contact: 'Contact Welford Lane Capitals for exclusive access to elite alternative investment strategies. UK-based with global reach including India and beyond.'
  },

  // Structured Data Templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'Welford Lane Capitals',
      description: 'Elite alternative investment management with proven fund performance',
      url: 'https://www.welfordlc.live',
      logo: 'https://www.welfordlc.live/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB',
        addressLocality: 'London'
      },
      serviceType: 'Investment Management',
      areaServed: ['United Kingdom', 'India', 'Global']
    }
  }
};

export default SEOConfig;
