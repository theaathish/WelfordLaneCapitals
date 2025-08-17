import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Welford Lane Capitals | Elite Investment Management Team',
  description: 'Meet the Welford Lane Capitals leadership team. Founded in 2025, our UK-based experts deliver institutional-grade alternative investment strategies with proven performance across Technology Growth, Alternative Credit, and Real Estate Alpha pools.',
  keywords: 'Welford Lane Capitals team, investment management leadership, UK investment experts, alternative investment professionals, institutional portfolio management, technology growth specialists, alternative credit experts, real estate alpha managers, Viyas founder CEO, Kowshik co-founder portfolio management, Aathish CTO technical officer, Yuvaraj market analyst fund manager, Jeevan market analyst, Nithish financial legal advisor',
  openGraph: {
    title: 'About Welford Lane Capitals | Elite Investment Management Team',
    description: 'Founded in 2025, our UK-based experts deliver institutional-grade alternative investment strategies.',
    url: 'https://www.welfordlc.live/about',
    siteName: 'Welford Lane Capitals',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Welford Lane Capitals team discussing ICT trading strategies in UK office',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Welford Lane Capitals | Elite Investment Management Team',
    description: 'Founded in 2025, our UK-based experts deliver institutional-grade alternative investment strategies.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://www.welfordlc.live/about',
  },
};
