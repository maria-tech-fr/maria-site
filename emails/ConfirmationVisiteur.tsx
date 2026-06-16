import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

/**
 * Email de confirmation envoyé au visiteur après soumission du formulaire de contact.
 *
 * Styles en CSS-in-JS inline (pas de classes Tailwind) : Gmail Web / Mobile et Outlook
 * ne supportent pas systématiquement les media queries, les variables CSS, ni les
 * classes utilitaires. L'inline-style produit par @react-email/render est ce que ces
 * clients gèrent le mieux.
 */

type Props = {
  prenom: string
  message: string
  siteUrl?: string
}

// Coordonnées maria — figées ici parce que c'est de la copy email, pas de la
// donnée variable.
const MARIA_TEL_DISPLAY = '+33 1 59 35 34 03'
const MARIA_TEL_RAW = '+33159353403'
const WHATSAPP_NUMBER = '33637415798'

export default function ConfirmationVisiteurEmail({
  prenom,
  message,
  siteUrl = 'https://maria.tech',
}: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>
        On a bien reçu votre message — on revient vers vous sous 24 h ouvrées.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={headerSection}>
            <Img
              src={`${siteUrl}/logo-email.png`}
              alt="maria"
              width="120"
              height="44"
              style={{ display: 'block', border: 0 }}
            />
          </Section>

          <Section style={contentSection}>
            <Heading as="h1" style={h1}>
              Bonjour {prenom},
            </Heading>
            <Text style={lead}>
              Votre message est bien arrivé chez nous. On revient vers vous sous{' '}
              <strong>24 h ouvrées</strong> (hors week-end).
            </Text>

            <Text style={label}>Votre message</Text>
            <Section style={quote}>
              <Text style={quoteText}>{message}</Text>
            </Section>

            <Hr style={hr} />

            <Text style={label}>En attendant</Text>
            <Text style={paragraph}>
              Si votre demande est urgente, vous pouvez nous joindre directement :
            </Text>
            <Text style={contactLine}>
              <Link href={`tel:${MARIA_TEL_RAW}`} style={link}>
                {MARIA_TEL_DISPLAY}
              </Link>
              <span style={separator}> · </span>
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                style={link}
              >
                WhatsApp
              </Link>
            </Text>
          </Section>

          <Section style={signatureSection}>
            <Text style={paragraph}>À très vite,</Text>
            <Text style={signature}>L&apos;équipe maria</Text>
          </Section>

          <Hr style={hrFooter} />

          <Section style={footerSection}>
            <Text style={footnote}>
              MARIA TECH — Agence IA appliquée
              <br />
              173 rue de Courcelles, 75017 Paris
              <br />
              <Link href={siteUrl} style={footerLink}>
                maria.tech
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
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
  padding: '32px 32px 24px 32px',
  borderBottom: '1px solid #F0F0EF',
} as const

const contentSection = {
  padding: '32px 32px 24px 32px',
} as const

const signatureSection = {
  padding: '0 32px 32px 32px',
} as const

const footerSection = {
  padding: '20px 32px 28px 32px',
} as const

const h1 = {
  color: '#212121',
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: '1.25',
  margin: '0 0 16px 0',
  letterSpacing: '-0.02em',
} as const

const lead = {
  color: '#5A5A58',
  fontSize: '16px',
  lineHeight: '1.55',
  margin: '0 0 28px 0',
} as const

const label = {
  color: '#8A8A86',
  fontSize: '11px',
  fontFamily: 'ui-monospace, "SF Mono", Consolas, "Liberation Mono", monospace',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  margin: '0 0 12px 0',
} as const

const paragraph = {
  color: '#3F3F3D',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
} as const

const contactLine = {
  color: '#3F3F3D',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
} as const

const separator = {
  color: '#C8C8C5',
  padding: '0 4px',
} as const

const quote = {
  backgroundColor: '#FAFAF8',
  borderLeft: '3px solid #3FC163',
  padding: '16px 20px',
  margin: '0 0 24px 0',
  borderRadius: '0 4px 4px 0',
} as const

const quoteText = {
  color: '#3F3F3D',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-line' as const,
} as const

const hr = {
  borderTop: '1px solid #F0F0EF',
  borderBottom: 'none',
  margin: '24px 0',
} as const

const hrFooter = {
  borderTop: '1px solid #F0F0EF',
  borderBottom: 'none',
  margin: '0',
} as const

const signature = {
  color: '#212121',
  fontSize: '15px',
  fontWeight: 600,
  margin: '0',
} as const

const link = {
  color: '#3FC163',
  textDecoration: 'underline',
} as const

const footerLink = {
  color: '#8A8A86',
  textDecoration: 'underline',
} as const

const footnote = {
  color: '#8A8A86',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '0',
  textAlign: 'center' as const,
} as const
