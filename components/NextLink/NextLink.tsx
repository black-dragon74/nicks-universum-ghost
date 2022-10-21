import Link from "next/link"
import React from "react"
import { Element, Root } from "hast"
import HTMLRenderer from "../HTMLRenderer/HTMLRenderer"

interface NextLinkProps {
  href?: string
}

const NextLink = (node: Element) => {
  const { href } = node.properties as NextLinkProps

  let root: Root = {
    type: "root",
    children: node.children,
  }

  return (
    <>
      {!!href && (
        <Link href={href}>
          <a>
            <HTMLRenderer node={root} />
          </a>
        </Link>
      )}
    </>
  )
}

export default NextLink
