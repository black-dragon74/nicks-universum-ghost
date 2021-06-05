/* eslint-disable react/display-name */
import React, { FC } from "react"
import rehypeReact, {
  ComponentProps,
  ComponentPropsWithNode,
} from "rehype-react"
import unified from "unified"
import { Node } from "unist"
import NextLink from "@components/NextLink/NextLink"
import NextImage from "@components/NextImage/NextImage"

interface HTMLRendererProps {
  node?: Node
}

const options = {
  createElement: React.createElement,
  Fragment: React.Fragment,
  passNode: true,
  components: {
    Link: (props: ComponentProps) => (
      <NextLink {...(props as ComponentPropsWithNode)} />
    ),
    Image: (props: ComponentProps) => (
      <NextImage {...(props as ComponentPropsWithNode)} />
    ),
  },
}

const renderer = unified().use(rehypeReact, options)

const HTMLRenderer: FC<HTMLRendererProps> = ({ node }) => {
  return <>{renderer.stringify(node)}</>
}

export default HTMLRenderer
