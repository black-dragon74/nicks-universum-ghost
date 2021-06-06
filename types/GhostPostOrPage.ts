import { PostOrPage } from "@tryghost/content-api"
import { NextImage } from "./NextImage"
import { Node } from "unist"
import { ToC } from "@lib/tableOfContents"

export type GhostPostOrPage = PostOrPage & {
  featureImage?: NextImage | null
  htmlAst?: Node | null
  toc?: ToC[] | null
}
