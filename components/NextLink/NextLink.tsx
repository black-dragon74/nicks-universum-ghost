import Link from "next/link"
import React from "react"
import { Node } from "unist"
import { ComponentPropsWithNode } from "rehype-react"
import HTMLRenderer from "../HTMLRenderer/HTMLRenderer"

interface NextLinkProps {
  href?: string
}

const NextLink = (props: ComponentPropsWithNode) => {
  const { node } = props
  const { href } = node?.properties as NextLinkProps
  const [child] = node?.children as Node[]

  return (
    <>
      {!!href && (
        <Link href={href}>
          <a aria-label="Test test">
            {child.type === "text" ? (
              <span>{child?.value}</span>
            ) : (
              <HTMLRenderer node={child} />
            )}
          </a>
        </Link>
      )}
    </>
  )
}

export default NextLink
