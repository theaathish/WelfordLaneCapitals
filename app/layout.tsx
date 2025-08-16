import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meridian Capital - Premier Hedge Fund',
  description: 'Elite investment management with proven track record in alternative investments and institutional portfolio management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-lato bg-gray-50 text-navy-dark">{children}</body>
    </html>
  );
}