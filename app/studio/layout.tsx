import { metadata, viewport } from 'next-sanity/studio'

export { metadata, viewport }

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
