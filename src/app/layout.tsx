import type { Metadata } from 'next';
import { Coiny, Dongle, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const coiny = Coiny({ variable: '--font-coiny', weight: '400', subsets: ['latin'] });
const dongle = Dongle({ variable: '--font-dongle', weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ai Integratorz Technologies',
  description: 'Innovate Today, Dominate Tomorrow',
  viewport: 'width=device-width, initial-scale=1, minimum-scale=1, user-scalable=0',
  icons: {
    icon: '/assets/Logo.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${coiny.variable} ${dongle.variable}`}>{children}</body>
    </html>
  );
}
