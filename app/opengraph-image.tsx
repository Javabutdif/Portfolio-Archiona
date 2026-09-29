import { ImageResponse } from 'next/og';

export const alt = 'Anton James Genabio, Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const HEADLINE = 'I build web apps end to end, from the database to the screen.';

async function loadArchivo(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,800&text=${encodeURIComponent(text)}`
    ).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    return await fetch(src[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const archivo = await loadArchivo(
    `AAnton James Genabio${HEADLINE}Software Engineer, Cebuportfolio.ajgenabio.me`
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#121417',
          color: '#e6e8ec',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 6,
              background: '#8fa5ff',
              color: '#121417',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontFamily: 'Archivo',
            }}
          >
            A
          </div>
          <div style={{ fontSize: 30, fontFamily: 'Archivo' }}>
            Anton James Genabio
          </div>
        </div>

        <div
          style={{
            fontSize: 68,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            fontFamily: 'Archivo',
            maxWidth: 1000,
            textWrap: 'balance',
          }}
        >
          {HEADLINE}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#9aa1ad',
            fontFamily: 'Archivo',
            borderTop: '2px solid #2a2e35',
            paddingTop: 28,
          }}
        >
          <span>Software Engineer, Cebu</span>
          <span style={{ color: '#8fa5ff' }}>portfolio.ajgenabio.me</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: archivo
        ? [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }]
        : [],
    }
  );
}
