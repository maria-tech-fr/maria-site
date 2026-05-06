import { metadata as sanityMetadata, viewport } from 'next-sanity/studio'

export const metadata = {
  ...sanityMetadata,
  title: 'machine · maria',
  icons: {
    icon: [{ url: '/favicon-machine.svg', type: 'image/svg+xml' }],
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
