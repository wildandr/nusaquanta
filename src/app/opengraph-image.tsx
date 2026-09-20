import { ImageResponse } from 'next/og'

export const alt = 'PT Nusa Quanta Indonesia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#050505',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(184,233,48,0.18) 0%, rgba(184,233,48,0) 45%), radial-gradient(circle at 10% 90%, rgba(96,31,235,0.22) 0%, rgba(96,31,235,0) 50%)',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 28,
          }}
        >
          {/* Logo mark: NQ dalam kotak */}
          <div
            style={{
              width: 96,
              height: 96,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#B8E930',
              borderRadius: 24,
              fontSize: 56,
              fontWeight: 700,
              color: '#050505',
            }}
          >
            NQ
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#ffffff' }}>
            Nusa Quanta
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          AI, Quantitative Analysis & Data Engineering
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: 'rgba(255,255,255,0.65)',
            marginTop: 28,
          }}
        >
          PT Nusa Quanta Indonesia — nusaquanta.tech
        </div>
      </div>
    ),
    { ...size }
  )
}
