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
 * Email de notification interne envoyé à l'équipe maria à chaque soumission
 * du formulaire de contact. Optimisé scan rapide en boîte de réception :
 * identité du visiteur en tête, message en blockquote, bloc action en pied.
 *
 * Variables injectées :
 *   - {{prenom}}, {{nom}}      → identité visiteur
 *   - {{email}}                → email visiteur (mailto)
 *   - {{telephone}}            → optionnel, format affiché du visiteur
 *   - {{telephone_brut}}       → optionnel, sans espaces ni `+` pour le href tel:
 *   - {{message}}              → conserver les sauts de ligne (white-space:pre-wrap)
 *   - {{date_heure}}           → déjà formaté en français, ex « 16 juin 2026 à 09h47 »
 *
 * Le Reply-To est branché côté contactActions.ts sur l'email du visiteur
 * pour répondre directement depuis Gmail sans copier-coller.
 */

const LOGO_URL = 'https://maria-site-smoky.vercel.app/logo-email.png'

type Props = {
  prenom: string
  nom: string
  email: string
  telephone?: string
  telephoneBrut?: string
  message: string
  /** Déjà formaté, ex « 16 juin 2026 à 09h47 ». */
  dateHeure: string
}

export default function NotificationEquipeEmail({
  prenom,
  nom,
  email,
  telephone,
  telephoneBrut,
  message,
  dateHeure,
}: Props) {
  const hasTel = Boolean(telephone && telephoneBrut)

  return (
    <Html lang="fr">
      <Head>
        <title>Nouveau message du formulaire</title>
      </Head>
      <Preview>{`Reçu le ${dateHeure} · à traiter sous 24h`}</Preview>
      <Body style={body}>
        <Container style={card}>
          {/* En-tête avec logo (réduit, 80px — c'est interne, sobre) */}
          <Section style={headerSection}>
            <Img
              src={LOGO_URL}
              alt="maria"
              width="80"
              height="29"
              style={{ display: 'block', border: 0 }}
            />
          </Section>

          {/* Bloc 1 — Identification du contact */}
          <Section style={blockContact}>
            <Text style={labelMono}>// nouveau contact</Text>

            <Heading as="h1" style={h1}>
              {prenom} {nom}
            </Heading>

            <Text style={contactInfo}>
              <Link href={`mailto:${email}`} style={contactLink}>
                {email}
              </Link>
              {hasTel && (
                <>
                  <br />
                  <Link
                    href={`tel:${telephoneBrut}`}
                    style={contactLink}
                  >
                    {telephone}
                  </Link>
                </>
              )}
            </Text>

            <Text style={receivedAt}>Reçu le {dateHeure}</Text>
          </Section>

          <Section style={hrWrap}>
            <Hr style={hr} />
          </Section>

          {/* Bloc 2 — Le message */}
          <Section style={blockSection}>
            <Text style={labelMono}>// son message</Text>
            <Section style={messageQuote}>
              <Text style={messageQuoteText}>{message}</Text>
            </Section>
          </Section>

          <Section style={hrWrap}>
            <Hr style={hr} />
          </Section>

          {/* Bloc 3 — Action */}
          <Section style={blockAction}>
            <Text style={labelMono}>// à traiter</Text>
            <Text style={actionMain}>
              Réponse attendue sous 24h ouvrées (hors week-end).
            </Text>
            <Text style={actionItalic}>
              Pour répondre, utiliser le bouton «&nbsp;Répondre&nbsp;» de Gmail :
              le destinataire sera directement le visiteur (Reply-To configuré).
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

/* ----------------------------- styles ----------------------------- */

const FONT_SANS = '"Work Sans", Arial, sans-serif'
const FONT_MONO = '"DM Mono", "Courier New", monospace'

const body = {
  margin: 0,
  padding: '32px 20px',
  backgroundColor: '#F9F9F9',
  fontFamily: FONT_SANS,
  color: '#212121',
  lineHeight: '1.55',
} as const

const card = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  overflow: 'hidden',
} as const

const headerSection = {
  padding: '24px 32px 16px 32px',
} as const

const blockContact = {
  padding: '16px 32px 24px 32px',
} as const

const blockSection = {
  padding: '24px 32px',
} as const

const blockAction = {
  padding: '24px 32px 32px 32px',
} as const

const hrWrap = {
  padding: '0 32px',
} as const

const hr = {
  border: 0,
  borderTop: '1px solid #EEEEEE',
  margin: 0,
} as const

const labelMono = {
  margin: '0 0 12px 0',
  fontFamily: FONT_MONO,
  fontSize: '11px',
  color: '#3FC163',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
} as const

const h1 = {
  margin: '0 0 12px 0',
  fontSize: '20px',
  fontWeight: 600,
  color: '#212121',
  lineHeight: '1.3',
  fontFamily: FONT_SANS,
} as const

const contactInfo = {
  margin: 0,
  fontFamily: FONT_MONO,
  fontSize: '13px',
  color: '#383838',
  lineHeight: '1.7',
} as const

const contactLink = {
  color: '#212121',
  textDecoration: 'underline',
} as const

const receivedAt = {
  margin: '12px 0 0 0',
  fontSize: '12px',
  color: '#666666',
  fontFamily: FONT_SANS,
} as const

const messageQuote = {
  margin: 0,
  padding: '16px 20px',
  backgroundColor: '#F9F9F9',
  borderLeft: '3px solid #FEC23C',
} as const

const messageQuoteText = {
  margin: 0,
  fontSize: '15px',
  color: '#383838',
  lineHeight: '1.6',
  fontStyle: 'italic' as const,
  whiteSpace: 'pre-wrap' as const,
  fontFamily: FONT_SANS,
} as const

const actionMain = {
  margin: '0 0 8px 0',
  fontSize: '14px',
  color: '#383838',
  fontFamily: FONT_SANS,
} as const

const actionItalic = {
  margin: 0,
  fontSize: '13px',
  color: '#666666',
  fontStyle: 'italic' as const,
  fontFamily: FONT_SANS,
} as const
