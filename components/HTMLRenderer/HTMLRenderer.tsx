import React, { FC } from "react"
import rehypeReact from "rehype-react"
import Rehype from "rehype"
import unified from "unified"

interface HTMLRendererProps {
  html: string
}

const options = {
  createElement: React.createElement,
  Fragment: React.Fragment,
  passNode: true,
}

// eslint-disable-next-line
const rehype = Rehype().use({
  settings: {
    fragment: true,
    space: `html`,
    emitParseErrors: false,
    verbose: false,
  },
})
const renderer = unified().use(rehypeReact, options)

const HTMLRenderer: FC<HTMLRendererProps> = ({ html }) => {
  const htmlAsNode = rehype.parse(html || "")
  return <>{renderer.stringify(htmlAsNode)}</>
}

export default HTMLRenderer
