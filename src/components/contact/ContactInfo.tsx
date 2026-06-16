import Link from 'next/link'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import type { ContactInfos } from '../../lib/contact'

/*
  Convertit un numéro de téléphone affiché en français (« 01 59 35 34 03 »)
  au format E.164 international pour le `href` du lien `tel:` — ex.
  +33159353403. Marche pour les numéros déjà internationaux (« +33… »,
  « 33… ») qu'on renvoie tels quels après nettoyage des espaces.
  Indispensable pour que le clic mobile fonctionne quand l'utilisateur
  est en roaming, ou pour les apps qui dialent en international par
  défaut (FaceTime, Skype, etc.).
*/
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('33')) return `+${digits}`
  if (digits.startsWith('0') && digits.length === 10) return `+33${digits.slice(1)}`
  return `+${digits}`
}

type ContactInfoProps = {
  surTitre: string
  titre: string
  infos: ContactInfos
}

export default function ContactInfo({ surTitre, titre, infos }: ContactInfoProps) {
  if (!infos) return null
  return (
    <section
      id="infos-pratiques"
      className="relative overflow-hidden bg-[#FFFBEE] px-6 py-16 lg:px-30.5 lg:py-22.5"
    >
      <HaloField
        halos={[
          { color: '#FEC23C', alpha: 0.30, x: '8%', y: '12%', size: 600, blur: 40, duration: 38 },
          { color: '#3FC163', alpha: 0.22, x: '92%', y: '78%', size: 600, blur: 40, duration: 42 },
        ]}
      />

      <div className="relative flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {titre}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {infos.telephone && (
            <Reveal delay={120}>
              <InfoCard
                surTitre="// téléphone"
                titre={
                  <a
                    href={`tel:${toE164(infos.telephone)}`}
                    className="hover:text-success transition-colors"
                  >
                    {infos.telephone}
                  </a>
                }
                ligne1={infos.horaires?.plage}
                ligne2={infos.horaires?.mention}
                icon={<PhoneIcon />}
              />
            </Reveal>
          )}
          {infos.adresse && (infos.adresse.rue || infos.adresse.codePostalVille) && (
            <Reveal delay={180}>
              <InfoCard
                surTitre="// adresse"
                titre={
                  <span className="whitespace-pre-line">
                    {[infos.adresse.rue, infos.adresse.codePostalVille].filter(Boolean).join('\n')}
                  </span>
                }
                ligne1={infos.adresse.mention}
                icon={<MapIcon />}
              />
            </Reveal>
          )}
          {infos.email && (
            <Reveal delay={240}>
              <InfoCard
                surTitre="// email"
                titre={
                  <a
                    href={`mailto:${infos.email}`}
                    className="hover:text-success transition-colors"
                  >
                    {infos.email}
                  </a>
                }
                bottom={
                  infos.linkedinUrl ? (
                    <Link
                      href={infos.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start border-b border-success pb-0.5 font-medium text-[14px] leading-5 text-ink transition-colors hover:text-success"
                    >
                      Suivre maria sur LinkedIn
                      <ArrowExternal />
                    </Link>
                  ) : null
                }
                icon={<MailIcon />}
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  surTitre,
  titre,
  ligne1,
  ligne2,
  bottom,
  icon,
}: {
  surTitre: string
  titre: React.ReactNode
  ligne1?: string | null
  ligne2?: string | null
  bottom?: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-[5px] border border-[#F0E9D0] bg-paper p-8">
      <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-[5px] bg-[#FFFBEE]">
        {icon}
      </span>
      <p className="pt-3 font-mono text-[11px] leading-4 lowercase tracking-[0.08em] text-ink-soft">
        {surTitre}
      </p>
      <h3 className="font-display text-[20px] font-semibold leading-7 tracking-[-0.015em] text-ink lg:text-[22px] lg:leading-[27.5px]">
        {titre}
      </h3>
      {ligne1 && <p className="text-[14px] leading-[21px] text-ink-soft">{ligne1}</p>}
      {ligne2 && (
        <p className="font-mono text-[11px] uppercase leading-4 tracking-[0.06em] text-[#999]">
          {ligne2}
        </p>
      )}
      {bottom && <div className="pt-2">{bottom}</div>}
    </article>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 4.5h4l1.5 3.5-2 1.5a11 11 0 0 0 4.5 4.5l1.5-2 3.5 1.5v4c0 1-.5 1.5-1.5 1.5C12 19 5 12 5 7c0-1 .5-1.5 1.5-1.5z"
        stroke="#FEC23C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"
        stroke="#FEC23C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="#FEC23C" strokeWidth="1.5" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="#FEC23C" strokeWidth="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke="#FEC23C" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowExternal() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5 9l5-5M5 4h5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
