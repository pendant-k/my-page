import type { Metadata } from 'next';
import '98.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pendant-k Personal Website',
  description: 'Pendant-k Desktop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
