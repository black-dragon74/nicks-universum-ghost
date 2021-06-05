import { PostOrPage } from "@tryghost/content-api"
import { NextImage } from "./NextImage"
import { Node } from "unist"

export type GhostPostOrPage = PostOrPage & {
  featureImage?: NextImage | null
  htmlAst?: Node | null
}
