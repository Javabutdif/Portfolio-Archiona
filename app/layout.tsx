import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anton James Genabio | Fullstack Developer',
  description:
    'Anton James Genabio builds production-grade web applications with React, Node.js, and modern tooling. Portfolio showcasing real-world fullstack projects.',
  openGraph: {
    title: 'Anton James Genabio | Fullstack Developer',
    description:
      'Production-grade fullstack web developer focused on React, Node.js, and modern interfaces.',
    type: 'website',
    images: ['/og-image.svg'],
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Anton James Genabio',
      jobTitle: 'Full-Stack Developer',
      sameAs: [
        'https://github.com/Javabutdif',
        'https://www.linkedin.com/in/jgenabs/',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cebu',
        addressCountry: 'PH',
      },
      email: 'jamesgenabio31@gmail.com',
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect rx='20' width='100' height='100' fill='%23ffffff'/%3E%3Ctext x='50' y='68' text-anchor='middle' font-size='60' font-weight='700' fill='%23000000'%3EA%3C/svg%3E"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
