/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-reflect */
import { PostOrPage } from "@tryghost/content-api"
import Rehype from "rehype"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import visit from "unist-util-visit"
import { UrlWithStringQuery, parse as urlParse } from "url"
import { Node, Parent } from "unist"
import { cloneDeep } from "lodash"
import ProcessedENV from "./processEnv"
import refractor from "refractor"
import nodeToString from "hast-util-to-string"
import { Dimensions, getImageDimensions } from "./images"

// eslint-disable-next-line
const baseProcessor = Rehype().use({
  settings: {
    fragment: true,
    space: `html`,
    emitParseErrors: false,
    verbose: false,
  },
})

const { prism, images } = ProcessedENV

const normalizePost = async (
  post: PostOrPage,
  cmsURL: UrlWithStringQuery | undefined,
  basePath?: string
): Promise<GhostPostOrPage | null> => {
  if (!cmsURL) throw new Error("Expected cmsURL")

  // Our node will be processed additonally by these processors
  const processors = [
    withRewriteGhostLinks(cmsURL, basePath),
    withRewriteRelativeLinks,
    withSyntaxHighlighting,
    withInlinedImages,
  ]

  // Ah yes, process
  let htmlAst = baseProcessor.parse(post?.html || "")
  for (const processor of processors) {
    htmlAst = await processor(htmlAst)
  }

  // Image meta; Calling getDimensions here is intentional
  // It is not expensive as the value is cached already
  // By calling `withInlinedImages` above
  const url = post.feature_image
  const dimensions = await getImageDimensions(url)

  return {
    ...post,
    htmlAst,
    featureImage: (url && dimensions && { url, dimensions }) || null,
  }
}

// Rewrite absolute links to relative
const withRewriteGhostLinks =
  (cmsURL: UrlWithStringQuery, basePath = "/") =>
  (htmlAst: Node) => {
    visit(htmlAst, { tagName: "a" }, (node: Node) => {
      const href = urlParse((node?.properties as HTMLAnchorElement).href)
      if (href.protocol === cmsURL.protocol && href.host === cmsURL.host) {
        const relURL = basePath + href.pathname?.substring(1)
        // eslint-disable-next-line
        ;(node.properties as HTMLAnchorElement).href = relURL
      }
    })

    return htmlAst
  }

// Rewrite relative links to be used with next/link
const withRewriteRelativeLinks = (htmlAst: Node) => {
  visit(htmlAst, { tagName: "a" }, (node: Node) => {
    const href = (node?.properties as HTMLAnchorElement).href
    if (href && href.startsWith("http")) {
      const copyOfNode = cloneDeep(node)
      delete copyOfNode.properties
      delete copyOfNode.position
      copyOfNode.tagName = "span"
      node.tagName = "Link"
      node.children = [copyOfNode]
    }
  })

  return htmlAst
}

// Syntax highlighting with Prism.js
interface NodeProperties {
  className?: string[]
  style: string | string[]
}

const withSyntaxHighlighting = (htmlAst: Node): Node => {
  // If disabled by config, return node as is
  if (!prism.enable) return htmlAst

  // Reads the classname prefixed with "language-"
  const getLanguage = (node: Node) => {
    const className = (node?.properties as NodeProperties).className || []

    for (const classList of className) {
      if (classList.slice(0, 9) === "language-") {
        return classList.slice(9).toLowerCase()
      }
    }

    return null
  }

  visit(
    htmlAst,
    "element",
    (node: Node, index: number, parent: Parent | undefined) => {
      if (parent.tagName !== "pre" || node.tagName !== "code") {
        return
      }

      const lang = getLanguage(node)
      if (lang === null) return

      let className = (node.properties as NodeProperties).className || []
      let result = undefined
      try {
        className = className.concat("language-" + lang)
        result = refractor.highlight(nodeToString(node), lang)
      } catch (err) {
        // If error is due to unknown language, return
        if (/Unknown Language/.test((err as Error).message)) {
          console.warn(`Unable to highlight unknown langauge: ${lang}`)
          return
        }

        // Else, throw
        throw new Error(err)
      }
      node.children = result as Node[]
    }
  )

  return htmlAst
}

// Rewrite images to be used with next/image
const withInlinedImages = async (htmlAst: Node): Promise<Node> => {
  const nodes: { node: Node; parent: Node | undefined }[] = []

  // Visit the nodes
  visit(
    htmlAst,
    { tagName: "img" },
    (node: Node, index: number, parent: Node | undefined) => {
      if (images.nextInlineImages) node.tagName = "Image"

      const { src } = node.properties as HTMLImageElement
      node.imageDimensions = getImageDimensions(src)
      nodes.push({ node, parent })
    }
  )

  // Resolve all promises
  const dimensions = await Promise.all(
    nodes.map(({ node }) => node.imageDimensions)
  )

  // Attach a proper aspect ratio
  nodes.forEach(({ node, parent }, idx) => {
    node.imageDimensions = dimensions[idx]
    if (dimensions[idx] === null) return

    const { width, height } = dimensions[idx] as Dimensions
    const aspectRatio = width / height
    const flex = `flex: ${aspectRatio} 1 0` // Grow / Shrink / Basis

    if (typeof parent.properties === "undefined") {
      parent.properties = { style: "" }
    }

    if (parent) {
      let parentStyle = (parent.properties as NodeProperties).style || []
      if (typeof parentStyle === "string") {
        parentStyle = [parentStyle]
      }
      // eslint-disable-next-line
      ;(parent.properties as NodeProperties).style = [...parentStyle, flex]
    }
  })

  return htmlAst
}

export { normalizePost }
