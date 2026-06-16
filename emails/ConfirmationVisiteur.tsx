import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

/**
 * Email de confirmation visiteur — fidèle au HTML maquetté.
 *
 * Variables injectées :
 *   - {{prenom}}                   → `prenom`
 *   - {{message}}                  → `message`
 *   - {{telephone}}                → numéro maria au format affiché, ex « +33 1 59 35 34 03 »
 *   - {{telephone_brut}}           → idem sans + ni espaces, ex « 33159353403 » (le href ajoute « + »)
 *   - {{numero_whatsapp_sans_plus}}→ numéro WhatsApp Mathieu, ex « 33637415798 »
 *
 * Le logo est servi en absolu depuis la prod maria.tech (les clients email ne
 * résolvent pas les chemins relatifs).
 */

const LOGO_URL = 'https://maria.tech/logo-email.png'

type Props = {
  prenom: string
  message: string
  telephone?: string
  telephoneBrut?: string
  numeroWhatsappSansPlus?: string
}

export default function ConfirmationVisiteurEmail({
  prenom,
  message,
  telephone = '+33 1 59 35 34 03',
  telephoneBrut = '33159353403',
  numeroWhatsappSansPlus = '33637415798',
}: Props) {
  return (
    <Html lang="fr">
      <Head>
        <title>Votre message est bien arrivé chez maria</title>
      </Head>
      <Preview>
        On vous répond personnellement sous 24h. Pas un bot, pas un formulaire.
      </Preview>
      <Body style={body}>
        <Container style={card}>
          {/* En-tête avec logo */}
          <Section style={headerSection}>
            <Img
              src={LOGO_URL}
              alt="maria"
              width="120"
              height="44"
              style={{ display: 'block', border: 0 }}
            />
          </Section>

          {/* Salutation + intro */}
          <Section style={introSection}>
            <Heading as="h1" style={h1}>
              Bonjour {prenom},
            </Heading>
            <Text style={paragraph}>
              Votre message est bien arrivé. Quelqu&apos;un de l&apos;équipe le
              lira personnellement et vous répondra <strong>sous 24h ouvrées</strong>.
            </Text>
            <Text style={paragraphLast}>
              Pas un mail automatique pour vous dire qu&apos;on a tout lu, pas un
              formulaire qui rebondit. Une vraie réponse, par un humain.
            </Text>
          </Section>

          <Section style={hrWrap}>
            <Hr style={hr} />
          </Section>

          {/* Récap du message */}
          <Section style={blockSection}>
            <Text style={labelMono}>// votre message</Text>
            <Section style={messageQuote}>
              <Text style={messageQuoteText}>{message}</Text>
            </Section>
          </Section>

          <Section style={hrWrap}>
            <Hr style={hr} />
          </Section>

          {/* Ce qui se passe maintenant */}
          <Section style={blockSection}>
            <Text style={labelMono}>// ce qui se passe maintenant</Text>

            <Etape
              numero="01 |"
              titre="On vous lit"
              texte="Aujourd'hui ou demain matin au plus tard. On comprend votre contexte avant de répondre."
            />
            <Etape
              numero="02 |"
              titre="On vous répond"
              texte="Sous 24h ouvrées (lundi au vendredi). Si votre demande est claire, on propose un créneau pour échanger. Si elle l'est moins, on vous pose les bonnes questions."
            />
            <Etape
              numero="03 |"
              titre="On échange"
              texte="30 minutes par téléphone ou en visio. Pour comprendre votre besoin, donner un premier avis, et voir si on est faits pour travailler ensemble. Sans engagement, sans frais."
              last
            />
          </Section>

          <Section style={hrWrap}>
            <Hr style={hr} />
          </Section>

          {/* Lectures suggérées */}
          <Section style={blockSection}>
            <Text style={labelMono}>// en attendant</Text>
            <Text style={paragraphSmall}>
              Quelques lectures qui vous seront peut-être utiles :
            </Text>

            <Text style={lectureItem}>
              →{' '}
              <Link href="https://maria.tech/charte-ia" style={lectureLink}>
                Notre charte de gouvernance IA
              </Link>
              <br />
              <span style={lectureSub}>
                Ce qu&apos;on s&apos;engage à faire (et à ne jamais faire) sur
                chaque projet.
              </span>
            </Text>

            <Text style={lectureItemLast}>
              →{' '}
              <Link href="https://maria.tech/blog" style={lectureLink}>
                Le journal
              </Link>
              <br />
              <span style={lectureSub}>
                Nos points de vue sur l&apos;IA en entreprise. Sans jargon, sans
                hype.
              </span>
            </Text>
          </Section>

          <Section style={hrWrap}>
            <Hr style={hr} />
          </Section>

          {/* Si urgent */}
          <Section style={blockSection}>
            <Text style={labelMono}>// si c&apos;est vraiment urgent</Text>
            <Text style={paragraphSmall}>
              Vous pouvez nous joindre directement :
            </Text>
            <Text style={urgentLine}>
              <strong>Par téléphone</strong> :{' '}
              <Link href={`tel:+${telephoneBrut}`} style={urgentLink}>
                {telephone}
              </Link>{' '}
              <span style={urgentMeta}>(du lundi au vendredi, 9h-19h)</span>
            </Text>
            <Text style={urgentLine}>
              <strong>Par WhatsApp</strong> :{' '}
              <Link
                href={`https://wa.me/${numeroWhatsappSansPlus}`}
                style={urgentLinkUnderline}
              >
                Ouvrir une conversation
              </Link>
            </Text>
            <Text style={urgentItalic}>
              Sinon, on revient vers vous sous 24h, sans faute.
            </Text>
          </Section>

          {/* Pied — fond noir */}
          <Section style={footerDark}>
            <Text style={footerSignature}>L&apos;équipe maria</Text>
            <Text style={footerSlogan}>
              L&apos;IA utile, à l&apos;intérieur de votre entreprise.
            </Text>
          </Section>
        </Container>

        {/* Mention RGPD — discrète, hors de la carte */}
        <Container style={rgpdContainer}>
          <Section>
            <Text style={rgpdText}>
              Cet email vous a été envoyé suite à votre demande de contact sur{' '}
              <Link href="https://maria.tech" style={rgpdLink}>
                maria.tech
              </Link>
              . Conformément au RGPD, vos données sont uniquement utilisées pour
              répondre à votre demande. Vous pouvez à tout moment demander leur
              suppression à{' '}
              <Link href="mailto:contact@maria.tech" style={rgpdLink}>
                contact@maria.tech
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function Etape({
  numero,
  titre,
  texte,
  last = false,
}: {
  numero: string
  titre: string
  texte: string
  last?: boolean
}) {
  return (
    <Row style={last ? etapeRowLast : etapeRow}>
      <Column style={etapeNumeroCol} valign="top">
        <Text style={etapeNumero}>{numero}</Text>
      </Column>
      <Column valign="top">
        <Text style={etapeTitre}>{titre}</Text>
        <Text style={etapeTexte}>{texte}</Text>
      </Column>
    </Row>
  )
}

/* ----------------------------- styles ----------------------------- */

const FONT_SANS =
  '"Work Sans", Arial, sans-serif'
const FONT_MONO =
  '"DM Mono", "Courier New", monospace'

const body = {
  margin: 0,
  padding: '40px 20px',
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
  padding: '40px 40px 24px 40px',
} as const

const introSection = {
  padding: '0 40px 24px 40px',
} as const

const blockSection = {
  padding: '24px 40px',
} as const

const hrWrap = {
  padding: '0 40px',
} as const

const hr = {
  border: 0,
  borderTop: '1px solid #EEEEEE',
  margin: 0,
} as const

const h1 = {
  margin: '0 0 16px 0',
  fontSize: '22px',
  fontWeight: 600,
  color: '#212121',
  lineHeight: '1.3',
  fontFamily: FONT_SANS,
} as const

const paragraph = {
  margin: '0 0 16px 0',
  fontSize: '16px',
  color: '#383838',
  lineHeight: '1.6',
  fontFamily: FONT_SANS,
} as const

const paragraphLast = {
  ...paragraph,
  margin: 0,
} as const

const paragraphSmall = {
  margin: '0 0 16px 0',
  fontSize: '15px',
  color: '#383838',
  fontFamily: FONT_SANS,
} as const

const labelMono = {
  margin: '0 0 12px 0',
  fontFamily: FONT_MONO,
  fontSize: '11px',
  color: '#3FC163',
  letterSpacing: '0.08em',
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

const etapeRow = {
  marginBottom: '16px',
} as const

const etapeRowLast = {
  marginBottom: 0,
} as const

const etapeNumeroCol = {
  width: '64px',
  paddingRight: '12px',
} as const

const etapeNumero = {
  margin: 0,
  fontFamily: FONT_MONO,
  fontSize: '14px',
  color: '#FEC23C',
  fontWeight: 600,
} as const

const etapeTitre = {
  margin: '0 0 4px 0',
  fontSize: '15px',
  fontWeight: 600,
  color: '#212121',
  fontFamily: FONT_SANS,
} as const

const etapeTexte = {
  margin: 0,
  fontSize: '14px',
  color: '#383838',
  lineHeight: '1.55',
  fontFamily: FONT_SANS,
} as const

const lectureItem = {
  margin: '0 0 10px 0',
  fontSize: '15px',
  color: '#383838',
  fontFamily: FONT_SANS,
} as const

const lectureItemLast = {
  ...lectureItem,
  margin: 0,
} as const

const lectureLink = {
  color: '#212121',
  fontWeight: 600,
  textDecoration: 'underline',
} as const

const lectureSub = {
  fontSize: '14px',
  color: '#666666',
} as const

const urgentLine = {
  margin: '0 0 8px 0',
  fontSize: '14px',
  color: '#383838',
  fontFamily: FONT_SANS,
} as const

const urgentLink = {
  color: '#212121',
  textDecoration: 'none',
} as const

const urgentLinkUnderline = {
  color: '#212121',
  textDecoration: 'underline',
} as const

const urgentMeta = {
  color: '#666666',
} as const

const urgentItalic = {
  margin: '12px 0 0 0',
  fontSize: '13px',
  color: '#666666',
  fontStyle: 'italic' as const,
  fontFamily: FONT_SANS,
} as const

const footerDark = {
  padding: '32px 40px 40px 40px',
  backgroundColor: '#212121',
  color: '#FFFFFF',
} as const

const footerSignature = {
  margin: '0 0 6px 0',
  fontSize: '15px',
  fontWeight: 600,
  color: '#FFFFFF',
  fontFamily: FONT_SANS,
} as const

const footerSlogan = {
  margin: 0,
  fontSize: '13px',
  color: '#9A9A9A',
  fontStyle: 'italic' as const,
  fontFamily: FONT_SANS,
} as const

const rgpdContainer = {
  maxWidth: '600px',
  margin: '0 auto',
} as const

const rgpdText = {
  margin: 0,
  padding: '20px 40px',
  fontSize: '12px',
  color: '#999999',
  lineHeight: '1.5',
  fontFamily: FONT_SANS,
} as const

const rgpdLink = {
  color: '#999999',
} as const
