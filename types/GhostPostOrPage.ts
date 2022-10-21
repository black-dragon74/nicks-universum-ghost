import { PostOrPage } from "@tryghost/content-api"
import { NextImage } from "./NextImage"
import { Root } from "hast"
import { ToC } from "@lib/tableOfContents"

export type GhostPostOrPage = PostOrPage & {
  featureImage?: NextImage | null
  htmlAst?: Root | null
  toc?: ToC[] | null
}
