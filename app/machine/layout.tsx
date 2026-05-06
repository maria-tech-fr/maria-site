import { metadata as sanityMetadata, viewport } from 'next-sanity/studio'

export const metadata = {
  ...sanityMetadata,
  title: 'machine · maria',
  icons: {
    icon: [{ url: '/favicon-machine.png', type: 'image/png' }],
  },
}

export { viewport }

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
