import Link from "next/link"
import { HTMLAttributeAnchorTarget } from "react"

// HOC that adds an a tag with URL to the component
interface WithLinkToURLProps {
  href: string
  as?: string
  target?: HTMLAttributeAnchorTarget
  passHref?: boolean
  className?: string
}

const withLinkToURL = <P extends WithLinkToURLProps>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent: React.FC<P> = ({
    href,
    as,
    passHref = false,
    className,
    ...props
  }) => {
    return (
      <Link href={href} as={as} passHref={passHref}>
        <a
          className={`hover:text-gray-400 ease-in-out transition-colors duration-300 ${
            className ?? ""
          }`}
          target={props?.target}
        >
          <Component {...(props as P)} />
        </a>
      </Link>
    )
  }

  return WrappedComponent
}

export default withLinkToURL
