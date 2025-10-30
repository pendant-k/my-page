import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import '98.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pendant-k Personal Website',
  description: 'Pendant-k Desktop',
};

const notoSansKR = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSansKR.className}>
      <body className="bg-white">{children}</body>
    </html>
  );
}
