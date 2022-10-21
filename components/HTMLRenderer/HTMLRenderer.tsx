/* eslint-disable react/display-name */
import React, { FC } from "react"
import rehypeReact from "rehype-react"
import { unified } from "unified"
import { Root } from "hast"
import NextLink from "@components/NextLink/NextLink"
import NextImage from "@components/NextImage/NextImage"

interface HTMLRendererProps {
  node?: Root
}

const options = {
  createElement: React.createElement,
  Fragment: React.Fragment,
  passNode: true,
  components: {
    img: ({ node }: any) => {
      return <NextImage {...node} />
    },
    a: ({ node }: any) => {
      return <NextLink {...node} />
    },
  },
}

const renderer = unified().use(rehypeReact, options)

const HTMLRenderer: FC<HTMLRendererProps> = ({ node }) => {
  return <>{renderer.stringify(node)}</>
}

export default HTMLRenderer
