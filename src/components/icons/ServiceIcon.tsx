import type { ServiceIconName } from '../../lib/accueil'

const SERVICE_ICONS: Record<ServiceIconName, (props: IconProps) => React.JSX.Element> = {
  'outils-internes': OutilsInternesIcon,
  'agents-chatbots': AgentsChatbotsIcon,
  communication: CommunicationIcon,
}

export default function ServiceIcon({
  name,
  className = '',
}: {
  name: ServiceIconName
  className?: string
}) {
  const Component = SERVICE_ICONS[name]
  return <Component className={className} />
}

type IconProps = { className?: string }

function OutilsInternesIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden>
      <rect width="54" height="54" rx="5" fill="#F9F9F9" />
      <g clipPath="url(#clip-outils)">
        <path
          d="M35.1667 17.6666H18.8333C17.5447 17.6666 16.5 18.7113 16.5 20V31.6666C16.5 32.9553 17.5447 34 18.8333 34H35.1667C36.4553 34 37.5 32.9553 37.5 31.6666V20C37.5 18.7113 36.4553 17.6666 35.1667 17.6666Z"
          stroke="#212121"
          strokeWidth="1.63333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 22.3334H37.5"
          stroke="#212121"
          strokeWidth="1.63333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.1666 28.1666H29.3333M21.1666 31.6666H25.8333"
          stroke="#212121"
          strokeWidth="1.63333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip-outils">
          <rect width="28" height="28" fill="white" transform="translate(13 13)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function AgentsChatbotsIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden>
      <rect width="54" height="54" rx="5" fill="#F9F9F9" />
      <path
        d="M27.0001 29.3333C30.2217 29.3333 32.8334 26.7216 32.8334 23.5C32.8334 20.2783 30.2217 17.6666 27.0001 17.6666C23.7784 17.6666 21.1667 20.2783 21.1667 23.5C21.1667 26.7216 23.7784 29.3333 27.0001 29.3333Z"
        stroke="#212121"
        strokeWidth="1.63333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 23.5H30.5M27 20V27"
        stroke="#212121"
        strokeWidth="1.63333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1666 34L18.8333 37.5M32.8333 34L35.1666 37.5M23.4999 32.8334H30.4999"
        stroke="#212121"
        strokeWidth="1.63333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 25.3666C28.0309 25.3666 28.8666 24.5309 28.8666 23.5C28.8666 22.469 28.0309 21.6333 27 21.6333C25.969 21.6333 25.1333 22.469 25.1333 23.5C25.1333 24.5309 25.969 25.3666 27 25.3666Z"
        fill="#3FC163"
        stroke="#3FC163"
        strokeWidth="1.63333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CommunicationIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden>
      <rect width="54" height="54" rx="5" fill="#F9F9F9" />
      <path
        d="M37.5 30.5C37.5 31.7377 37.0083 32.9247 36.1332 33.7998C35.258 34.675 34.071 35.1667 32.8333 35.1667H22.3333L16.5 38.6667V21.1667C16.5 19.929 16.9917 18.742 17.8668 17.8668C18.742 16.9917 19.929 16.5 21.1667 16.5H32.8333C34.071 16.5 35.258 16.9917 36.1332 17.8668C37.0083 18.742 37.5 19.929 37.5 21.1667V30.5Z"
        stroke="#212121"
        strokeWidth="1.63333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.3333 24.6666H31.6666M22.3333 28.1666H28.1666"
        stroke="#212121"
        strokeWidth="1.63333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
