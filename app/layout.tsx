import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const description =
  'Software engineer in Cebu. Builder of the PSITS platform used by 3,000+ students and Lessora, a lesson planner for teachers.';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.ajgenabio.me'),
  title: 'Anton James Genabio | Software Engineer',
  description,
  openGraph: {
    title: 'Anton James Genabio | Software Engineer',
    description,
    type: 'website',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anton James Genabio',
  url: 'https://portfolio.ajgenabio.me',
  jobTitle: 'Software Engineer',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect rx='12' width='100' height='100' fill='%231a1d22'/%3E%3Ctext x='50' y='70' text-anchor='middle' font-family='Arial' font-size='62' font-weight='800' fill='%23e6e8ec'%3EA%3C/text%3E%3C/svg%3E"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
