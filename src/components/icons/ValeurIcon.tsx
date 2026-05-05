import type { ValeurIconName } from '../../lib/agence'

const VALEUR_ICONS: Record<ValeurIconName, (props: IconProps) => React.JSX.Element> = {
  maitrise: MaitriseIcon,
  transparence: TransparenceIcon,
  securite: SecuriteIcon,
  humanite: HumaniteIcon,
}

export default function ValeurIcon({
  name,
  className = '',
}: {
  name: ValeurIconName
  className?: string
}) {
  const Component = VALEUR_ICONS[name]
  return <Component className={className} />
}

type IconProps = { className?: string }

function MaitriseIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="5" fill="white" fillOpacity="0.06" />
      <g clipPath="url(#clip-maitrise)">
        <path
          d="M24 33.75C29.3848 33.75 33.75 29.3848 33.75 24C33.75 18.6152 29.3848 14.25 24 14.25C18.6152 14.25 14.25 18.6152 14.25 24C14.25 29.3848 18.6152 33.75 24 33.75Z"
          stroke="#FEC23C"
          strokeWidth="1.51667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 29.4167C26.9915 29.4167 29.4166 26.9916 29.4166 24C29.4166 21.0085 26.9915 18.5834 24 18.5834C21.0084 18.5834 18.5833 21.0085 18.5833 24C18.5833 26.9916 21.0084 29.4167 24 29.4167Z"
          stroke="#FEC23C"
          strokeWidth="1.51667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 25.625C24.8975 25.625 25.625 24.8975 25.625 24C25.625 23.1025 24.8975 22.375 24 22.375C23.1025 22.375 22.375 23.1025 22.375 24C22.375 24.8975 23.1025 25.625 24 25.625Z"
          fill="#3FC163"
          stroke="#3FC163"
          strokeWidth="1.51667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 12.0834V15.3334M24 32.6667V35.9167M12.0833 24H15.3333M32.6666 24H35.9166"
          stroke="#FEC23C"
          strokeWidth="1.51667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip-maitrise">
          <rect width="26" height="26" fill="white" transform="translate(11 11)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function TransparenceIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="5" fill="white" fillOpacity="0.06" />
      <path
        d="M13.1667 24C13.1667 24 16.9584 16.4166 24.0001 16.4166C31.0417 16.4166 34.8334 24 34.8334 24C34.8334 24 31.0417 31.5833 24.0001 31.5833C16.9584 31.5833 13.1667 24 13.1667 24Z"
        stroke="#3FC163"
        strokeWidth="1.51667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 27.25C25.7949 27.25 27.25 25.7949 27.25 24C27.25 22.2051 25.7949 20.75 24 20.75C22.2051 20.75 20.75 22.2051 20.75 24C20.75 25.7949 22.2051 27.25 24 27.25Z"
        fill="#3FC163"
        fillOpacity="0.25"
        stroke="#3FC163"
        strokeWidth="1.51667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SecuriteIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="5" fill="white" fillOpacity="0.06" />
      <path
        d="M24 14.25L32.6667 18.5833V24C32.6667 29.4167 28.8751 32.6667 24 33.75C19.125 32.6667 15.3333 29.4167 15.3333 24V18.5833L24 14.25Z"
        stroke="#3FC163"
        strokeWidth="1.51667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.75 24L22.9167 26.1667L27.25 21.8334"
        stroke="#FEC23C"
        strokeWidth="1.51667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HumaniteIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="5" fill="white" fillOpacity="0.06" />
      <path
        d="M24 24C26.3933 24 28.3334 22.0599 28.3334 19.6667C28.3334 17.2735 26.3933 15.3334 24 15.3334C21.6068 15.3334 19.6667 17.2735 19.6667 19.6667C19.6667 22.0599 21.6068 24 24 24Z"
        stroke="#FEC23C"
        strokeWidth="1.51667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3334 33.75C15.9834 29.4167 19.2334 27.25 24 27.25C28.7667 27.25 32.0167 29.4167 32.6667 33.75"
        stroke="#FEC23C"
        strokeWidth="1.51667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
