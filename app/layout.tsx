import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Welford Lane Capitals | Elite Alternative Investment Strategies',
  description: 'Welford Lane Capitals delivers elite alternative investment strategies with proven fund performance vs S&P 500. Technology Growth (+42.8% YTD), Alternative Credit (+18.5% YTD), Real Estate Alpha (+26.3% YTD). Minimum investment: $50.',
  keywords: 'Welford Lane Capitals, elite investment performance, alternative investment strategies, institutional portfolio management, top performing assets, fund performance vs S&P 500, technology growth pool, alternative credit, real estate alpha, minimum investment $50, institutional investor hedge fund, alpha generator, high growth tech equities, private credit strategies, commercial real estate investments, performance reports, investor portal, investment pools, compliance risk disclosure, premier hedge fund, hedge fund alternatives UK, private investment pools India, ICT trading strategies London, fixed monthly returns investment Mumbai, high mid low risk investment plans global',
  authors: [{ name: 'Welford Lane Capitals' }],
  creator: 'Welford Lane Capitals',
  publisher: 'Welford Lane Capitals',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Welford Lane Capitals | Elite Alternative Investment Strategies',
    description: 'Elite alternative investment management with proven performance. Technology Growth (+42.8% YTD), Alternative Credit (+18.5% YTD), Real Estate Alpha (+26.3% YTD).',
    url: 'https://www.welfordlc.live',
    siteName: 'Welford Lane Capitals',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Welford Lane Capitals - Elite Alternative Investment Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welford Lane Capitals | Elite Alternative Investment Strategies',
    description: 'Elite alternative investment management with proven performance. Top performing assets with minimum $50 investment.',
    images: ['/logo.png'],
    site: '@welfordlc',
  },
  alternates: {
    canonical: 'https://www.welfordlc.live',
  },
  category: 'finance',
  classification: 'Investment Management',
  other: {
    'geo.region': 'GB',
    'geo.placename': 'London',
    'geo.position': '51.5074;-0.1278',
    'ICBM': '51.5074, -0.1278',
    'business:contact_data:street_address': 'London, UK',
    'business:contact_data:locality': 'London',
    'business:contact_data:region': 'England',
    'business:contact_data:postal_code': 'UK',
    'business:contact_data:country_name': 'United Kingdom',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Welford Lane Capitals",
    "description": "Elite alternative investment management with proven fund performance. Technology Growth, Alternative Credit, and Real Estate Alpha investment pools.",
    "url": "https://www.welfordlc.live",
    "logo": "https://www.welfordlc.live/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "London"
    },
    "serviceType": "Investment Management",
    "areaServed": ["United Kingdom", "India", "Global"],
    "keywords": "elite investment performance, alternative investment strategies, institutional portfolio management, top performing assets, fund performance, technology growth pool, alternative credit, real estate alpha",
    "offers": [
      {
        "@type": "Service",
        "name": "Technology Growth Pool",
        "description": "High growth tech equities with +42.8% YTD performance"
      },
      {
        "@type": "Service", 
        "name": "Alternative Credit",
        "description": "Private credit strategies with +18.5% YTD performance"
      },
      {
        "@type": "Service",
        "name": "Real Estate Alpha", 
        "description": "Commercial real estate investments with +26.3% YTD performance"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Investment Pools",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Elite Investment Performance"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "50",
            "priceCurrency": "USD",
            "description": "Minimum investment amount"
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="google-site-verification" content="" />
        <meta name="msvalidate.01" content="" />
        <link rel="canonical" href="https://www.welfordlc.live" />
      </head>
      <body className="font-lato bg-gray-50 text-navy-dark">
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}