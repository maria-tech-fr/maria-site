import type { ReassuranceIconName } from '../../lib/accueil'

const REASSURANCE_ICONS: Record<ReassuranceIconName, (props: IconProps) => React.JSX.Element> = {
  securite: SecuriteIcon,
  validation: ValidationIcon,
  livraison: LivraisonIcon,
  donnees: DonneesIcon,
}

export default function ReassuranceIcon({
  name,
  className = '',
}: {
  name: ReassuranceIconName
  className?: string
}) {
  const Component = REASSURANCE_ICONS[name]
  return <Component className={className} />
}

type IconProps = { className?: string }

function SecuriteIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M11 2.75L18.3333 6.41667V11C18.3333 15.5833 15.125 18.3333 11 19.25C6.87496 18.3333 3.66663 15.5833 3.66663 11V6.41667L11 2.75Z"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 11L10.0833 12.8334L13.75 9.16669"
        stroke="#FEC23C"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ValidationIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.25008 11.4584C10.022 11.4584 11.4584 10.0219 11.4584 8.25002C11.4584 6.47811 10.022 5.04169 8.25008 5.04169C6.47817 5.04169 5.04175 6.47811 5.04175 8.25002C5.04175 10.0219 6.47817 11.4584 8.25008 11.4584Z"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 18.3333C3.3 15.2167 5.5 13.75 8.25 13.75C11 13.75 13.2 15.2167 13.75 18.3333"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 11C15.2745 11 15.8574 10.7586 16.2872 10.3288C16.717 9.89904 16.9584 9.31614 16.9584 8.70835C16.9584 8.10057 16.717 7.51767 16.2872 7.0879C15.8574 6.65813 15.2745 6.41669 14.6667 6.41669"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2501 16.5C18.8834 14.6666 17.6917 13.75 16.0417 13.475"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LivraisonIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M11.9167 1.83331L3.66675 12.8333H10.0834L9.16675 20.1666L17.4167 9.16665H11.0001L11.9167 1.83331Z"
        stroke="#FEC23C"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DonneesIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M16.5001 10.0833H5.50008C4.48756 10.0833 3.66675 10.9041 3.66675 11.9166V17.4166C3.66675 18.4292 4.48756 19.25 5.50008 19.25H16.5001C17.5126 19.25 18.3334 18.4292 18.3334 17.4166V11.9166C18.3334 10.9041 17.5126 10.0833 16.5001 10.0833Z"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33325 10.0833V6.41667C7.33325 5.44421 7.71956 4.51158 8.40719 3.82394C9.09483 3.13631 10.0275 2.75 10.9999 2.75C11.9724 2.75 12.905 3.13631 13.5926 3.82394C14.2803 4.51158 14.6666 5.44421 14.6666 6.41667V10.0833"
        stroke="#3FC163"
        strokeWidth="1.28333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
