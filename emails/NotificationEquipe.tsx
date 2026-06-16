import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

/**
 * Email de notification interne envoyé à l'équipe maria à chaque soumission
 * du formulaire de contact. Optimisé pour la lecture rapide en boîte de
 * réception : badge en haut, identité du visiteur, récap des champs, métadonnées
 * en bas. Le Reply-To est branché côté contactActions.ts sur l'email du visiteur
 * pour permettre une réponse directe depuis Gmail.
 */

type Props = {
  prenom: string
  nom: string
  email: string
  telephone?: string
  message: string
  /** ISO 8601 — formaté côté composant en français / Europe/Paris. */
  submittedAt: string
  referer?: string
  userAgent?: string
}

export default function NotificationEquipeEmail({
  prenom,
  nom,
  email,
  telephone,
  message,
  submittedAt,
  referer,
  userAgent,
}: Props) {
  const dateAffichee = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date(submittedAt))

  return (
    <Html lang="fr">
      <Head />
      <Preview>{`Nouveau message de ${prenom} ${nom} via le formulaire de contact`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={headerSection}>
            <Text style={badge}>FORMULAIRE — NOUVEAU MESSAGE</Text>
            <Heading as="h1" style={h1}>
              {prenom} {nom}
            </Heading>
          </Section>

          <Section style={contentSection}>
            <Row
              label="Email"
              value={
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              }
            />
            {telephone && (
              <Row
                label="Téléphone"
                value={
                  <Link
                    href={`tel:${telephone.replace(/\s/g, '')}`}
                    style={link}
                  >
                    {telephone}
                  </Link>
                }
              />
            )}

            <Hr style={hr} />

            <Text style={fieldLabel}>Message</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={hr} />

            <Row label="Reçu le" value={dateAffichee} />
            {referer && <Row label="Source" value={referer} />}
            {userAgent && <Row label="User-Agent" value={userAgent} />}
          </Section>

          <Section style={footerSection}>
            <Text style={footnote}>
              Pour répondre, utilisez « Répondre » : Reply-To pointe sur
              l&apos;email du visiteur.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function Row({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <Section style={row}>
      <Text style={fieldLabel}>{label}</Text>
      <Text style={fieldValue}>{value}</Text>
    </Section>
  )
}

/* ----------------------------- styles ----------------------------- */

const body = {
  backgroundColor: '#F7F7F5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: '32px 16px',
} as const

const container = {
  backgroundColor: '#FFFFFF',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #EEEEEE',
} as const

const headerSection = {
  padding: '28px 32px 24px 32px',
  borderBottom: '1px solid #F0F0EF',
  backgroundColor: '#FAFAF8',
} as const

const contentSection = {
  padding: '24px 32px 28px 32px',
} as const

const footerSection = {
  padding: '0 32px 24px 32px',
} as const

const badge = {
  display: 'inline-block',
  backgroundColor: '#FEC23C',
  color: '#212121',
  fontSize: '10px',
  fontFamily: 'ui-monospace, "SF Mono", Consolas, "Liberation Mono", monospace',
  fontWeight: 600,
  letterSpacing: '0.08em',
  padding: '5px 9px',
  borderRadius: '3px',
  margin: '0 0 12px 0',
} as const

const h1 = {
  color: '#212121',
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '1.25',
  margin: '0',
  letterSpacing: '-0.02em',
} as const

const row = {
  margin: '0 0 14px 0',
} as const

const fieldLabel = {
  color: '#8A8A86',
  fontSize: '11px',
  fontFamily: 'ui-monospace, "SF Mono", Consolas, "Liberation Mono", monospace',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px 0',
} as const

const fieldValue = {
  color: '#212121',
  fontSize: '15px',
  lineHeight: '1.5',
  margin: '0',
} as const

const messageBox = {
  backgroundColor: '#FAFAF8',
  borderLeft: '3px solid #3FC163',
  padding: '16px 20px',
  margin: '8px 0 0 0',
  borderRadius: '0 4px 4px 0',
} as const

const messageText = {
  color: '#3F3F3D',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-line' as const,
} as const

const hr = {
  borderTop: '1px solid #F0F0EF',
  borderBottom: 'none',
  margin: '20px 0',
} as const

const link = {
  color: '#3FC163',
  textDecoration: 'underline',
} as const

const footnote = {
  color: '#8A8A86',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0',
  fontStyle: 'italic' as const,
} as const
