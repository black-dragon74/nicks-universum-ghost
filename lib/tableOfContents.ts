/* eslint-disable no-param-reassign */
import { Element } from "hast"
import { visit } from "unist-util-visit"

interface NodeProperties {
  id?: string
}

export interface ToCItem {
  id: string
  heading: string
  items?: ToCItem[]
}

export interface ToC {
  id: string
  heading: string
  level: string
  parentIndex: number
  items: ToCItem[] | []
}

const generateTableOfContents = (htmlAst: Element): ToCItem[] => {
  // Heading tags
  const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"]

  // Accepts any arbitrary input, tries to narrow it down to `Node` and compare
  const headings = (node: unknown): node is Element => {
    return headingTags.includes((node as Element).tagName as string)
  }

  // Visit all children (headingTags) recursively and return text contained in them
  // TODO: add proper type notations
  const walk = (children, text = "", depth = 0) => {
    children.forEach(child => {
      if (child.type === "text") {
        text += child.value
      } else if (child.chlidren && depth < 3) {
        depth += 1
        text = walk(child.children as Node[], text, depth)
      }
    })
    return text
  }

  const toc: ToC[] = []
  visit(htmlAst, headings, (node: Element) => {
    const text = walk(node.children as Element[])
    if (text.length > 0) {
      const id = (node.properties as NodeProperties).id || "error-missing-id"
      const level = (node.tagName as string).substr(1, 1) // returns 1 for h1, 2 for h2...
      toc.push({ id, level, heading: text, parentIndex: -1, items: [] })
    }
  })

  const findParent = (_toc: ToC[], parentIndex: number, level: string) => {
    while (parentIndex >= 0 && level < _toc[parentIndex].level) {
      parentIndex = _toc[parentIndex].parentIndex
    }
    return parentIndex >= 0 ? _toc[parentIndex].parentIndex : -1
  }

  // Determine parents
  toc.forEach((node, i) => {
    const prevNode = toc[i > 0 ? i - 1 : 0]

    node.parentIndex =
      node.level > prevNode.level
        ? (node.parentIndex = i - 1)
        : prevNode.parentIndex

    node.parentIndex =
      node.level < prevNode.level
        ? findParent(toc, node.parentIndex, node.level)
        : node.parentIndex
  })

  // Attach child to their parents
  toc.forEach(
    (child: ToC) =>
      child.parentIndex >= 0 &&
      (toc[child.parentIndex].items as ToC[]).push(child)
  )

  // Make final family tree :P
  const tocTree = toc.filter(({ parentIndex }) => parentIndex === -1)

  // Removes everything except heading and ID (for nav)
  const removeProps = ({ id, heading, items }: ToC): ToCItem => {
    return items.length > 0
      ? { id, heading, items: (items as ToC[]).map(item => removeProps(item)) }
      : { id, heading }
  }

  // Return processed htmlAst
  return tocTree.map(node => removeProps(node))
}

export { generateTableOfContents }
